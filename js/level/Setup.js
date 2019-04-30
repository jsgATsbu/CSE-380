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
        } else {
            attack(obj,event.clientX + obj.game.camera.x, event.clientY + obj.game.camera.y);
        }
    }, obj);

    obj.jKey = keyboard.addKey(Phaser.KeyCode.J);
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

    obj.one.onDown.add(function() {
        obj.player.activeAbility = obj.player.abilities[0];
        obj.skillFrame.cameraOffset.setTo(window.innerWidth/2-128,window.innerHeight*8/10)}, obj);
    obj.two.onDown.add(function() {
        obj.player.activeAbility = obj.player.abilities[1];
        obj.skillFrame.cameraOffset.setTo(window.innerWidth/2-64,window.innerHeight*8/10)}, obj);
    obj.three.onDown.add(function() {
        obj.player.activeAbility = obj.player.abilities[2];
        obj.skillFrame.cameraOffset.setTo(window.innerWidth/2,window.innerHeight*8/10)}, obj);
    obj.four.onDown.add(function() {
        obj.player.activeAbility = obj.player.abilities[3];
        obj.skillFrame.cameraOffset.setTo(window.innerWidth/2+64,window.innerHeight*8/10)},obj);
    obj.iKey.onDown.add(function() {
        obj.player.invincible = !obj.player.invincible;
    }, obj);
    obj.jKey.onDown.add(function() {
        obj.player.weapon.fire();
        // obj.player.activeAbility.call(obj, obj.player);
        // console.log(obj.player.activeAbility);
    }, obj);
    obj.pKey.onDown.add(function() {
        killAll(obj);
    }, obj);
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

var attack = function(obj, x, y) {
    let sprite = obj.findSpritesByCoordinates(x, y)[0];

    if(sprite !== undefined && sprite !== obj.player &&
        Math.abs(obj.player.x - sprite.x) <= 64 &&
        Math.abs(obj.player.y - sprite.y) <= 64) {

        obj.player.attack(sprite);
    }
};

var killAll = function(obj) {
    obj.monsters.forEach(function(mon) {
        mon.healthBar.kill();
        mon.stats.currentHealth = 0;
        mon.animations.play("death", 2, false, true);
    });
};
