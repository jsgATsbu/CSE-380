'use strict';

var setupInput = function(obj) {
    const keyboard = obj.game.input.keyboard;

    obj.cursors = keyboard.addKeys({
        up: Phaser.KeyCode.W,
        down: Phaser.KeyCode.S,
        left: Phaser.KeyCode.A,
        right: Phaser.KeyCode.D
    });

    obj.game.input.onDown.add(function(event) {
        let player = obj.player;

        if (obj.game.paused) {
            handleClickPaused(obj, event.clientX + obj.game.camera.x, event.clientY + obj.game.camera.y);
        } else if (player.stats.currentHealth > 0) {
            player.activeAbility.call(obj);

            let index = player.activeAbilityIndex;
            if (!obj.defaultAbilities.includes(player.activeAbility)) {
                player.charges[index] -= 1;
                obj.chargesText[index].setText(player.charges[index]);
            }
            if (player.charges[index] <= 0) {
                obj.removeAbility(player.activeAbility);
            }
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

    obj.one.onDown.add(selectAbilityWrapper, obj, 0, 0);
    obj.two.onDown.add(selectAbilityWrapper, obj, 0, 1);
    obj.three.onDown.add(selectAbilityWrapper, obj, 0, 2);
    obj.four.onDown.add(selectAbilityWrapper, obj, 0, 3);

    obj.iKey.onDown.add(function() {
        obj.player.invincible = !obj.player.invincible;
    }, obj);
    obj.pKey.onDown.add(killAll, obj);
};

var pause = function(obj) {
    obj.game.paused = true;
    obj.pauseMenu = obj.game.add.sprite(obj.game.camera.x + window.innerWidth / 2,
                    obj.game.camera.y + window.innerHeight / 2,
                    'pauseMenu');
    obj.pauseMenu.anchor.setTo(0.5);
    obj.settingBtn = obj.game.add.button(obj.pauseMenu.x, obj.pauseMenu.y - 75, 'controlsBtn');
    obj.titleBtn = obj.game.add.button(obj.pauseMenu.x, obj.pauseMenu.y + 75, 'mainmenuBtn');
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

var selectAbilityWrapper = function(obj, num) {  // obj is automatically passed as the first argument
    this.selectAbility(num);
};

var killAll = function() {
    this.monsters.forEach(function(mon) {
        mon.healthBar.kill();
        mon.stats.currentHealth = 0;
        mon.animations.play("death", 2, false, true);
    });
};
