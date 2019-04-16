'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Game = function() {};

TheLegendOfMeta.Game.prototype = {
    create: function() {
        this.createMap();
        this.game.sprites = [];
        this.createPlayer();

        this.game.camera.follow(this.player);
        this.setupInput();
        this.tempSetting = null;
    },

    createMap() {
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tiles', 'gameTiles');

        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        this.backgroundlayer.resizeWorld();

        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
    },

    createPlayer() {
        let playerObj = this.findObjectsByType('playerStart', this.map, 'objectsLayer')[0];
        this.player = this.game.add.sprite(playerObj.x, playerObj.y, 'player');
        this.game.sprites.push(this.player);

        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5,0.5);
        this.playerSpeed = 400;

        this.player.setHealth(100);
        this.attackDamage = 10;
        this.player.attack = function(sprite) {
            sprite.damage(this.attackDamage);
        };
        this.player.abilities = [];
        this.player.abilities.push(breakRock);
        this.player.activeAbility = function() {};

        this.player.animations.add('walkFront',[0,4,5,6,7], 5,true);
        this.player.animations.add('walkLeft',[1,8,9,10,11], 5,true);
        this.player.animations.add('walkRight',[2,12,13,14,15], 5,true);
        this.player.animations.add('walkBack',[3,16,17,18,19], 5,true);
    },

    findObjectsByType: function(type, map, layer) {
        let result = [];
        map.objects[layer].forEach(function(element) {
            element.properties.forEach(function(property) {
                if (property.name === "type" && property.value === type) {
                    //Phaser uses top left, Tiled bottom left so we have to adjust
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
        });
        return result;
    },

    setupInput: function() {
        const keyboard = this.game.input.keyboard;

        this.cursors = keyboard.createCursorKeys();
        this.altCursors = keyboard.addKeys({
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S,
            left: Phaser.KeyCode.A,
            right: Phaser.KeyCode.D
        });

        this.game.input.onDown.add(function(event) {
            if (this.game.paused) {
                let x = event.clientX + this.game.camera.x;
                let y = event.clientY + this.game.camera.y;
                let menu = this.pauseMenu;
                let btn1 = this.settingBtn;
                let btn2 = this.titleBtn;
                if (x < menu.x - menu.width / 2 || x > menu.x + menu.width / 2 || y < menu.y - menu.height || y > menu.y + menu.height / 2) {
                    if (this.tempSetting === null && this.game.paused) {
                        this.game.paused = false;
                        this.pauseMenu.destroy();
                        this.settingBtn.destroy();
                        this.titleBtn.destroy();
                    } else {
                        this.tempSetting.destroy();
                        this.tempSetting = null;
                    }
                } else if (x < btn1.x + btn1.width / 2 && x > btn1.x - btn1.width / 2 && y < btn1.y + btn1.height / 2 && y > btn1.y - btn1.height / 2) {
                    if (this.tempSetting === null) {
                        this.tempSetting = this.game.add.image(menu.x, menu.y, 'Control');
                        this.tempSetting.anchor.setTo(0.5);
                    }
                } else if (x < btn2.x + btn2.width / 2 && x > btn2.x - btn2.width / 2 && y < btn2.y + btn2.height / 2 && y > btn2.y - btn2.height / 2) {
                    ///// This needs to be edited, don't know how to go back to previous state (MainMenu). Instead it goes back to the game for now.
                    if (this.tempSetting === null && this.game.paused) {
                        this.game.paused = false;
                        this.pauseMenu.destroy();
                        this.settingBtn.destroy();
                        this.titleBtn.destroy();
                    } else {
                        this.tempSetting.destroy();
                        this.tempSetting = null;
                    }
                }
            } else {
                let sprite = this.findSpritesByCoordinates(event.clientX+this.game.camera.x,event.clientY+this.game.camera.y)[0];
                console.log(sprite);
                if(sprite !== undefined && sprite !== this.player &&
                    Math.abs(this.player.x - sprite.x) <= 128 &&
                    Math.abs(this.player.y - sprite.y) <= 128) {

                    this.player.attack(sprite);
                }
            }
        },this);

        this.space = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.esc = keyboard.addKey(Phaser.KeyCode.ESC);
        this.one = keyboard.addKey(Phaser.KeyCode.ONE);
        this.two = keyboard.addKey(Phaser.KeyCode.TWO);
        this.three = keyboard.addKey(Phaser.KeyCode.THREE);
        this.four = keyboard.addKey(Phaser.KeyCode.FOUR);

        this.space.onDown.add(this.useAbility, this);
        this.esc.onDown.add(function() {
            if(!this.game.paused) {
                this.game.paused = true;
                this.pauseMenu = this.game.add.sprite(this.game.camera.x + window.innerWidth / 2, this.game.camera.y + window.innerHeight / 2, 'pauseMenu');
                this.pauseMenu.anchor.setTo(0.5);
                this.settingBtn = this.game.add.button(this.pauseMenu.x, this.pauseMenu.y-75, 'settingBtn');
                this.titleBtn = this.game.add.button(this.pauseMenu.x, this.pauseMenu.y+75, 'titleBtn');
                this.settingBtn.anchor.setTo(0.5);
                this.titleBtn.anchor.setTo(0.5);
            }
        },this);
        this.one.onDown.add(function() {
            this.player.activeAbility = this.player.abilities[0];
        },this);
        this.two.onDown.add(function() {
            this.player.activeAbility = this.player.abilities[1];
        },this);
        this.three.onDown.add(function() {
            this.player.activeAbility = this.player.abilities[2];
        },this);
        this.four.onDown.add(function() {
            this.player.activeAbility = this.player.abilities[3];
        },this);
    },

    useAbility() {
        this.player.activeAbility.call(this, this.player);
    },

    findSpritesByCoordinates: function(x, y) {
        let result = [];
        this.game.sprites.forEach(function (sprite) {
            if (x > sprite.left && x < sprite.right &&
                y > sprite.top  && y < sprite.bottom) {
                result.push(sprite);
            }
        });

        return result;
    },

    update: function() {
        this.game.physics.arcade.collide(this.player, this.blockedLayer);

        if(this.player.body.velocity.x > 0) {
            this.player.animations.play('walkRight');
        }
        else if(this.player.body.velocity.x < 0){
            this.player.animations.play('walkLeft');
        }
        else if(this.player.body.velocity.y > 0){
            this.player.animations.play('walkFront');
        }
        else if(this.player.body.velocity.y < 0){
            this.player.animations.play('walkBack');
        }
        else{
            this.player.animations.stop(null,true);
        }

        let cursors = this.cursors;
        let altCursors = this.altCursors;

        let up = cursors.up.isDown || altCursors.up.isDown;
        let down = cursors.down.isDown || altCursors.down.isDown;
        if (up && down) {
            up = false;
            down = false;
        }

        let left = cursors.left.isDown || altCursors.left.isDown;
        let right = cursors.right.isDown || altCursors.right.isDown;
        if (left && right) {
            left = false;
            right = false;
        }

        let playerSpeed = this.playerSpeed;
        if (up) {
            this.player.body.velocity.y = -playerSpeed;
        } else if (down) {
            this.player.body.velocity.y = playerSpeed;
        } else {
            this.player.body.velocity.y = 0;
        }

        if (left) {
            this.player.body.velocity.x = -playerSpeed;
        } else if (right) {
            this.player.body.velocity.x = playerSpeed;
        } else {
            this.player.body.velocity.x = 0;
        }
    }
};
