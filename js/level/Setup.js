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

var setupInput = function(level) {
    const keyboard = level.game.input.keyboard;

    level.cursors = keyboard.addKeys({
        up: Phaser.KeyCode.W,
        down: Phaser.KeyCode.S,
        left: Phaser.KeyCode.A,
        right: Phaser.KeyCode.D
    });

    level.game.input.onDown.add(function(event) {
        if (level.game.paused) {
            handleClickPaused(level,event.clientX + level.game.camera.x, event.clientY + level.game.camera.y);
        } else {
            attack(level,event.clientX + level.game.camera.x, event.clientY + level.game.camera.y);
        }
    }, level);

    level.jKey = keyboard.addKey(Phaser.KeyCode.J);
    level.esc = keyboard.addKey(Phaser.KeyCode.ESC);
    level.one = keyboard.addKey(Phaser.KeyCode.ONE);
    level.two = keyboard.addKey(Phaser.KeyCode.TWO);
    level.three = keyboard.addKey(Phaser.KeyCode.THREE);
    level.four = keyboard.addKey(Phaser.KeyCode.FOUR);
    level.iKey = keyboard.addKey(Phaser.KeyCode.I);
    level.pKey = keyboard.addKey(Phaser.KeyCode.P);

    level.esc.onDown.add(function() {
        if (!level.game.paused) {
            pause(level);
        } else {
            unpause(level);
        }
    }, level);

    level.one.onDown.add(function() {
        level.currentSkill=0;
        level.skillFrame.cameraOffset.setTo(window.innerWidth/2-128,window.innerHeight*8/10)}, level);
    level.two.onDown.add(function() {
        level.currentSkill=1;
        level.skillFrame.cameraOffset.setTo(window.innerWidth/2-64,window.innerHeight*8/10)}, level);
    level.three.onDown.add(function() {
        level.currentSkill=2;
        level.skillFrame.cameraOffset.setTo(window.innerWidth/2,window.innerHeight*8/10)}, level);
    level.four.onDown.add(function() {
        level.currentSkill=3;
        level.skillFrame.cameraOffset.setTo(window.innerWidth/2+64,window.innerHeight*8/10)},level);
    level.iKey.onDown.add(function() {
        level.player.invincible = !level.player.invincible;
    }, level);
    level.jKey.onDown.add(function() {
        level.player.weapon.fire();
    }, level);
    level.pKey.onDown.add(function() {
        killAll(level);
    }, level);
};

var pause = function(level) {
    level.game.paused = true;
    level.pauseMenu = level.game.add.sprite(level.game.camera.x + window.innerWidth / 2,
        level.game.camera.y + window.innerHeight / 2, 'pauseMenu');
    level.pauseMenu.anchor.setTo(0.5);
    level.settingBtn = level.game.add.button(level.pauseMenu.x, level.pauseMenu.y-75, 'settingBtn');
    level.titleBtn = level.game.add.button(level.pauseMenu.x, level.pauseMenu.y+75, 'titleBtn');
    level.settingBtn.anchor.setTo(0.5);
    level.titleBtn.anchor.setTo(0.5);
};

var unpause = function(level) {
    level.game.paused = false;
    level.pauseMenu.destroy();
    level.settingBtn.destroy();
    level.titleBtn.destroy();
};

var handleClickPaused = function(level, x, y) {
    let menu = level.pauseMenu;
    let btn1 = level.settingBtn;
    let btn2 = level.titleBtn;

    if (x < menu.x - menu.width / 2 || x > menu.x + menu.width / 2 ||
        y < menu.y - menu.height || y > menu.y + menu.height / 2) {
        if (level.tempSetting === null && level.game.paused) {
            unpause(level);
        } else {
            level.tempSetting.destroy();
            level.tempSetting = null;
        }
    } else if (x < btn1.x + btn1.width / 2 && x > btn1.x - btn1.width / 2 &&
        y < btn1.y + btn1.height / 2 && y > btn1.y - btn1.height / 2) {
        if (level.tempSetting === null) {
            level.tempSetting = level.game.add.image(menu.x, menu.y, 'Control');
            level.tempSetting.anchor.setTo(0.5);
        }
    } else if (x < btn2.x + btn2.width / 2 && x > btn2.x - btn2.width / 2 &&
        y < btn2.y + btn2.height / 2 && y > btn2.y - btn2.height / 2) {
        if (level.tempSetting === null && level.game.paused) {
            level.game.paused = false;
            // noinspection JSUnresolvedVariable
            level.state.start("MainMenu");
        } else {
            level.tempSetting.destroy();
            level.tempSetting = null;
        }
    }
};

var attack = function(level, x, y) {
    let sprite = level.findSpritesByCoordinates(x, y)[0];

    if(sprite !== undefined && sprite !== level.player &&
        Math.abs(level.player.x - sprite.x) <= 64 &&
        Math.abs(level.player.y - sprite.y) <= 64) {

        level.player.attack(sprite);
    }
};

var killAll = function(level) {
    level.monsters.forEach(function(mon) {
        mon.healthBar.kill();
        mon.animations.play("death", 5, false, true);
    });
};
