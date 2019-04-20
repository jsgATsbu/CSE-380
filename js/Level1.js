'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level1 = function() {};

TheLegendOfMeta.Level1.prototype = {
    create: function() {
        ///for Simple AI, temporary
        this.countDown = 0;

        this.monsters = [];
        this.createMap();
        this.game.sprites = [];
        this.createPlayer();
        this.createMonsters();

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
        this.player = this.createSprite('player', 30, 15, 100, 400);
        this.addSpriteAnimations(this.player, ['walkFront', 'walkLeft', 'walkRight', 'walkBack'],
                                [[0, 4, 5, 6, 7], [1, 8, 9, 10, 11], [2, 12, 13, 14, 15], [3, 16, 17, 18, 19]]);

        this.player.abilities = [breakRock];
        this.player.activeAbility = function() {};
    },

    createMonsters: function(){
        let alien = this.createSprite('alien', 40, 5, 60, 400);
        this.addSpriteAnimations(alien, ['walkFront', 'walkLeft', 'walkRight', 'walkBack'],
                                [[0, 4, 5, 6, 7], [1, 8, 9, 10, 11], [2, 12, 13, 14, 15], [3, 16, 17, 18, 19]]);

        let dreadFace = this.createSprite('dreadFace', 20, 20, 120, 200);
        this.addSpriteAnimations(dreadFace, ['walkFront', 'walkLeft', 'walkRight', 'walkBack'],
                                [[0, 1], [2, 3], [4, 5],[6, 7]]);
    },

    createSprite(type, atk, def, health, spd) {
        let obj = this.findObjectsByType(type, this.map, 'objectsLayer')[0];
        let sprite = this.game.add.sprite(obj.x + 32, obj.y + 32, type);
        this.initializeStats(sprite, atk, def, health, spd);
        this.game.sprites.push(sprite);
        if (type !== 'player') {
            this.monsters.push(sprite);
        }

        this.game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5,0.5);
        let barConfig = {width: 64, height: 8,
                         bar:{color: '#46EF6E'}, bg:{color: 'black'},
                         x: sprite.body.x,
                         y: (sprite.body.y - sprite.body.height * 2/3)};
        sprite.healthBar = new HealthBar(this.game, barConfig);
        sprite.healthBar.setAnchor(0.5,0.5);

        //// For Simple AI, temporary
        sprite.origXY = {x: sprite.body.x, y: sprite.body.y};

        return sprite;
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

    initializeStats: function(sprite, atk, def, health, spd){
        let stats = {};
        stats.atk = atk;
        stats.def = def;
        stats.currentHealth = health;
        stats.maxHealth = health;
        stats.spd = spd;
        sprite.stats = stats;

        sprite.attack = function(enemy){
            let dmg = sprite.stats.atk - enemy.stats.def;
            if(enemy.stats.currentHealth > 0){
                enemy.stats.currentHealth -= dmg;
            }
        }
    },

    addSpriteAnimations(sprite, states, frames) {
        for (let i = 0; i < states.length; i++) {
            sprite.animations.add(states[i], frames[i], 5, true);
        }
        sprite.direction = 'front';
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
                if(sprite !== undefined && sprite !== this.player &&
                    Math.abs(this.player.x - sprite.x) <= 64 &&
                    Math.abs(this.player.y - sprite.y) <= 64) {
                    this.player.attack(sprite, this.player.stats.atk);
                }
            }
        },this);

        this.space = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.esc = keyboard.addKey(Phaser.KeyCode.ESC);
        this.one = keyboard.addKey(Phaser.KeyCode.ONE);
        this.two = keyboard.addKey(Phaser.KeyCode.TWO);
        this.three = keyboard.addKey(Phaser.KeyCode.THREE);
        this.four = keyboard.addKey(Phaser.KeyCode.FOUR);

        this.space.onDown.add(function() {
            this.player.activeAbility.call(this, this.player);
        }, this);

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
        this.updateSprites();
        this.updatePlayerMovement();
    },

    updateSprites() {
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.player, this.game.sprites);

        //// Update the HP bar position and the percentage every frame
        this.player.healthBar.setPosition(this.player.body.x+32, this.player.body.y-20);
        this.player.healthBar.setPercent(this.player.stats.currentHealth*100/this.player.stats.maxHealth);

        this.animateSprite(this.player);

        this.monsters.forEach(function(mon){
            this.game.physics.arcade.collide(mon, this.blockedLayer);
            this.game.physics.arcade.collide(mon, this.game.sprites);

            mon.healthBar.setPosition(mon.body.x + 32,mon.body.y - 20);
            mon.healthBar.setPercent(mon.stats.currentHealth*100 / mon.stats.maxHealth);

            if (mon.stats.currentHealth <= 0) {
                mon.healthBar.kill();
                mon.kill();
            }

            this.animateSprite(mon);
        }, this);

        if(this.countDown === 0) {
            this.monsters.forEach(this.simpleAI, this);
            this.countDown = 150;
        } else {
            this.countDown--;
        }
    },

    animateSprite(sprite) {
        if(sprite.body.velocity.x > 0){
            sprite.animations.play('walkRight');
            sprite.direction = 'right';
        } else if(sprite.body.velocity.x < 0){
            sprite.animations.play('walkLeft');
            sprite.direction = 'left';
        } else if(sprite.body.velocity.y > 0){
            sprite.animations.play('walkFront');
            sprite.direction = 'front';
        } else if(sprite.body.velocity.y < 0){
            sprite.animations.play('walkBack');
            sprite.direction = 'back';
        } else{
            sprite.animations.stop();
            sprite.frame = 0;
        }
    },

    simpleAI(mon) {
        if (mon.body.velocity.x === 0) {
            if(mon.body.x > mon.origXY.x){
                mon.body.velocity.x = -150;
            } else{
                mon.body.velocity.x = 150;
            }
        } else {
            mon.body.velocity.x = 0;
        }

        if (mon.body.velocity.y === 0) {
            if(mon.body.y > mon.origXY.y){
                mon.body.velocity.y = -150;
            } else{
                mon.body.velocity.y = 150;
            }
        } else {
            mon.body.velocity.y = 0;
        }
    },

    updatePlayerMovement() {
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

        let playerSpeed = this.player.stats.spd;
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
