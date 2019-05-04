'use strict';

var initializeStats = function(sprite, atk, def, health, spd){
    let stats = {};
    stats.atk = atk;
    stats.def = def;
    stats.currentHealth = health;
    stats.maxHealth = health;
    stats.spd = spd;
    sprite.stats = stats;

    sprite.attack = function(enemy) {
        let diffX = enemy.x - sprite.x;
        let diffY = enemy.y - sprite.y;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                sprite.animations.play('attackRight');
            } else {
                sprite.animations.play('attackLeft');
            }
        } else {
            if (diffY > 0) {
                sprite.animations.play('attackFront');
            } else {
                sprite.animations.play('attackBack');
            }
        }

        let last = sprite.animations.currentAnim;
        sprite.animations.currentAnim.onComplete.addOnce(function() {
            sprite.animations.play(last);
        },this);

        let dmg = sprite.stats.atk - enemy.stats.def;
        if(enemy.stats.currentHealth > 0 && !enemy.invincible){
            enemy.stats.currentHealth -= dmg;
        }
    };
};

var setupInput = function(obj) {
    const keyboard = obj.game.input.keyboard;

    obj.cursors = keyboard.addKeys({
        up: Phaser.KeyCode.W,
        down: Phaser.KeyCode.S,
        left: Phaser.KeyCode.A,
        right: Phaser.KeyCode.D
    });

    obj.game.input.onDown.add(function(event) {
        if (obj.game.paused) {
            handleClickPaused(obj,event.clientX + obj.game.camera.x, event.clientY + obj.game.camera.y);
        } else if (obj.player.stats.currentHealth > 0) {
            obj.player.activeAbility.call(obj);
         }
    }, obj);

    obj.esc = keyboard.addKey(Phaser.KeyCode.ESC);
    obj.one = keyboard.addKey(Phaser.KeyCode.ONE);
    obj.two = keyboard.addKey(Phaser.KeyCode.TWO);
    obj.three = keyboard.addKey(Phaser.KeyCode.THREE);
    obj.four = keyboard.addKey(Phaser.KeyCode.FOUR);
    obj.iKey = keyboard.addKey(Phaser.KeyCode.I);
    obj.pKey = keyboard.addKey(Phaser.KeyCode.P);

    obj.esc.onDown.add(function() {
        if (!obj.game.paused) {
            pause(obj);
        } else {
            unpause(obj);
        }
    }, obj);

    obj.one.onDown.add(selectAbility, obj, 0, 0);
    obj.two.onDown.add(selectAbility, obj, 0, 1);
    obj.three.onDown.add(selectAbility, obj, 0, 2);
    obj.four.onDown.add(selectAbility, obj, 0, 3);

    obj.iKey.onDown.add(function() {
        obj.player.invincible = !obj.player.invincible;
    }, obj);
    obj.pKey.onDown.add(killAll, obj, 0);
};

var pause = function(obj) {
    obj.game.paused = true;
    obj.pauseMenu = obj.game.add.sprite(obj.game.camera.x + window.innerWidth / 2,
        obj.game.camera.y + window.innerHeight / 2, 'pauseMenu');
    obj.pauseMenu.anchor.setTo(0.5);
    obj.settingBtn = obj.game.add.button(obj.pauseMenu.x, obj.pauseMenu.y-75, 'settingBtn');
    obj.titleBtn = obj.game.add.button(obj.pauseMenu.x, obj.pauseMenu.y+75, 'titleBtn');
    obj.settingBtn.anchor.setTo(0.5);
    obj.titleBtn.anchor.setTo(0.5);
};

var unpause = function(obj) {
    obj.game.paused = false;
    obj.pauseMenu.destroy();
    obj.settingBtn.destroy();
    obj.titleBtn.destroy();
};

var handleClickPaused = function(obj, x, y) {
    let menu = obj.pauseMenu;
    let btn1 = obj.settingBtn;
    let btn2 = obj.titleBtn;

    if (x < menu.x - menu.width / 2 || x > menu.x + menu.width / 2 ||
        y < menu.y - menu.height || y > menu.y + menu.height / 2) {
        if (obj.tempSetting === null && obj.game.paused) {
            unpause(obj);
        } else {
            obj.tempSetting.destroy();
            obj.tempSetting = null;
        }
    } else if (x < btn1.x + btn1.width / 2 && x > btn1.x - btn1.width / 2 &&
        y < btn1.y + btn1.height / 2 && y > btn1.y - btn1.height / 2) {
        if (obj.tempSetting === null) {
            obj.tempSetting = obj.game.add.image(menu.x, menu.y, 'Control');
            obj.tempSetting.anchor.setTo(0.5);
        }
    } else if (x < btn2.x + btn2.width / 2 && x > btn2.x - btn2.width / 2 &&
        y < btn2.y + btn2.height / 2 && y > btn2.y - btn2.height / 2) {
        if (obj.tempSetting === null && obj.game.paused) {
            obj.game.paused = false;
            // noinspection JSUnresolvedVariable
            obj.state.start("MainMenu");
        } else {
            obj.tempSetting.destroy();
            obj.tempSetting = null;
        }
    }
};

var selectAbility = function(obj, num) {  // obj is automatically passed as the first argument
    if (this.player.activeAbilityIndex === num) {
        this.player.activeAbilityIndex = -1;
        this.player.activeAbility = attack;
        this.skillFrame.visible = false;
    } else {
        this.player.activeAbilityIndex = num;
        this.player.activeAbility = this.player.abilities[num];
        this.skillFrame.cameraOffset.setTo(window.innerWidth / 2 + (-128 + 64 * num),
                                           window.innerHeight * 8/10);
        this.skillFrame.visible = true;
    }
};

var killAll = function() {
    this.monsters.forEach(function(mon) {
        mon.healthBar.kill();
        mon.stats.currentHealth = 0;
        mon.animations.play("death", 2, false, true);
    });
};
