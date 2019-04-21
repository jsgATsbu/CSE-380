"use strict";

class Level {
    // subclasses should define mapKey, playerProperties, and monsterProperties
    constructor() {
        this.game = undefined;

        this.mapKey = undefined;  // should be string with name of map
        this.playerProperties = undefined;  // should be object with properties of player
        this.monsterProperties = undefined;  //should be array of objects with properties of each monster
    }

    create() {
        ///for Simple AI, temporary
        this.countDown = 0;

        this.monsters = [];
        this.createMap();
        this.game.sprites = [];
        this.createPlayer();
        this.createMonsters(this.monsterProperties);

        this.game.camera.follow(this.player);
        this.setupInput();
        this.tempSetting = null;

        var weapon = this.game.add.weapon(10, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 600;
        weapon.fireRate = 100;
        weapon.trackSprite(this.player);
        this.player.weapon = weapon;
    }

    createMap() {
        this.map = this.game.add.tilemap(this.mapKey);
        this.map.addTilesetImage('tiles', 'gameTiles');

        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        this.backgroundlayer.resizeWorld();

        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
    }

    createPlayer() {
        this.player = this.createSprite(this.playerProperties);
        this.player.abilities = [breakRock];
        this.player.activeAbility = function() {};
    }

    createMonsters(monsters) {
        monsters.forEach(function (mon) {
            this.monsters.push(this.createSprite(mon));
        }, this);
    }

    createSprite(mon) {
        let obj = this.findObjectsByType(mon.name, this.map, 'objectsLayer')[0];
        let sprite = this.game.add.sprite(obj.x + 32, obj.y + 32, mon.name);
        this.initializeStats(sprite, mon.atk, mon.def, mon.health, mon.spd);
        this.game.sprites.push(sprite);

        this.game.physics.arcade.enable(sprite);
        sprite.anchor.setTo(0.5,0.5);
        let barConfig = {width: 64, height: 8,
            bar:{color: '#46EF6E'}, bg:{color: 'black'},
            x: sprite.body.x,
            y: sprite.body.y - sprite.body.height * 2 / 3};
        sprite.healthBar = new HealthBar(this.game, barConfig);
        sprite.healthBar.setAnchor(0.5,0.5);

        //// For Simple AI, temporary
        sprite.origXY = {x: sprite.body.x, y: sprite.body.y};

        Object.keys(mon.animations).forEach(function (anim) {
            sprite.animations.add(anim, mon.animations[anim].frames, mon.animations[anim].frameRate, mon.animations[anim].loop);
        });
        sprite.direction = 'front';

        sprite.body.immovable = true;

        return sprite;
    }

    findObjectsByType(type, map, layer) {
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
    }

    initializeStats(sprite, atk, def, health, spd){
        let stats = {};
        stats.atk = atk;
        stats.def = def;
        stats.currentHealth = health;
        stats.maxHealth = health;
        stats.spd = spd;
        sprite.stats = stats;

        sprite.attack = function(enemy){
            let diffX = enemy.x - sprite.x;
            let diffY = enemy.y - sprite.y;

            if (diffX > diffY) {
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

            let dmg = sprite.stats.atk - enemy.stats.def;
            if(enemy.stats.currentHealth > 0 && !enemy.invincible){
                enemy.stats.currentHealth -= dmg;
            }
        };
    }

    setupInput() {
        const keyboard = this.game.input.keyboard;

        this.cursors = keyboard.addKeys({
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S,
            left: Phaser.KeyCode.A,
            right: Phaser.KeyCode.D
        });

        this.game.input.onDown.add(function(event) {
            if (this.game.paused) {
                this.handleClickPaused(event.clientX + this.game.camera.x, event.clientY + this.game.camera.y);
            } else {
                this.attack(event.clientX + this.game.camera.x, event.clientY + this.game.camera.y);
            }
        }, this);

        this.jKey = keyboard.addKey(Phaser.KeyCode.J);
        this.esc = keyboard.addKey(Phaser.KeyCode.ESC);
        this.one = keyboard.addKey(Phaser.KeyCode.ONE);
        this.two = keyboard.addKey(Phaser.KeyCode.TWO);
        this.three = keyboard.addKey(Phaser.KeyCode.THREE);
        this.four = keyboard.addKey(Phaser.KeyCode.FOUR);
        this.i = keyboard.addKey(Phaser.KeyCode.I);

        this.esc.onDown.add(function() {
            if (!this.game.paused) {
                this.pause();
            } else {
                this.unpause();
            }
        }, this);

        this.space.onDown.add(function() { this.player.activeAbility.call(this, this.player); }, this);
        this.one.onDown.add(function() { this.player.activeAbility = this.player.abilities[0]; }, this);
        this.two.onDown.add(function() { this.player.activeAbility = this.player.abilities[1]; }, this);
        this.three.onDown.add(function() { this.player.activeAbility = this.player.abilities[2]; }, this);
        this.four.onDown.add(function() { this.player.activeAbility = this.player.abilities[3]; }, this);
        this.jKey.onDown.add(function() {
            let weapon = this.player.weapon;
            // if(this.player.direction === 'front') {
            //     weapon.fireAngle = 90;
            // }
            // else if(this.player.direction === 'back'){
            //     weapon.fireAngle = 270;
            // }
            // else if(this.player.direction === 'left'){
            //     weapon.fireAngle = 180;
            // }
            // else{
            //     weapon.fireAngle = 0;
            // }
            weapon.fire();
        }, this);
    }

    pause() {
        this.game.paused = true;
        this.pauseMenu = this.game.add.sprite(this.game.camera.x + window.innerWidth / 2,
                                              this.game.camera.y + window.innerHeight / 2, 'pauseMenu');
        this.pauseMenu.anchor.setTo(0.5);
        this.settingBtn = this.game.add.button(this.pauseMenu.x, this.pauseMenu.y-75, 'settingBtn');
        this.titleBtn = this.game.add.button(this.pauseMenu.x, this.pauseMenu.y+75, 'titleBtn');
        this.settingBtn.anchor.setTo(0.5);
        this.titleBtn.anchor.setTo(0.5);
    }

    unpause() {
        this.game.paused = false;
        this.pauseMenu.destroy();
        this.settingBtn.destroy();
        this.titleBtn.destroy();
    }

    handleClickPaused(x, y) {
        let menu = this.pauseMenu;
        let btn1 = this.settingBtn;
        let btn2 = this.titleBtn;

        if (x < menu.x - menu.width / 2 || x > menu.x + menu.width / 2 ||
            y < menu.y - menu.height || y > menu.y + menu.height / 2) {
            if (this.tempSetting === null && this.game.paused) {
                this.unpause();
            } else {
                this.tempSetting.destroy();
                this.tempSetting = null;
            }
        } else if (x < btn1.x + btn1.width / 2 && x > btn1.x - btn1.width / 2 &&
            y < btn1.y + btn1.height / 2 && y > btn1.y - btn1.height / 2) {
            if (this.tempSetting === null) {
                this.tempSetting = this.game.add.image(menu.x, menu.y, 'Control');
                this.tempSetting.anchor.setTo(0.5);
            }
        } else if (x < btn2.x + btn2.width / 2 && x > btn2.x - btn2.width / 2 &&
            y < btn2.y + btn2.height / 2 && y > btn2.y - btn2.height / 2) {
            if (this.tempSetting === null && this.game.paused) {
                this.game.paused = false;
                // noinspection JSUnresolvedVariable
                this.state.start("MainMenu");
            } else {
                this.tempSetting.destroy();
                this.tempSetting = null;
            }
        }
    }

    attack(x, y) {
        let sprite = this.findSpritesByCoordinates(x, y)[0];

        if(sprite !== undefined && sprite !== this.player &&
            Math.abs(this.player.x - sprite.x) <= 64 &&
            Math.abs(this.player.y - sprite.y) <= 64) {

            this.player.attack(sprite);
        }
    }

    findSpritesByCoordinates(x, y) {
        let result = [];
        this.game.sprites.forEach(function (sprite) {
            if (x > sprite.left && x < sprite.right &&
                y > sprite.top  && y < sprite.bottom) {
                result.push(sprite);
            }
        });
        return result;
    }

    update() {
        this.updateBullets();
        this.updateSprites();
        this.updatePlayerMovement();
        this.updateMonsterMovement();
    }

    updateBullets(){
        this.game.physics.arcade.overlap(this.player.weapon.bullets,this.monsters,function(enemy,bullet){
            bullet.kill();
            enemy.stats.currentHealth -= 5;
        },null,this);
    }

    updateSprites() {
        this.game.physics.arcade.collide(this.player, this.blockedLayer);

        //// Update the HP bar position and the percentage every frame
        this.player.healthBar.setPosition(this.player.body.x+32, this.player.body.y-20);
        this.player.healthBar.setPercent(this.player.stats.currentHealth*100 / this.player.stats.maxHealth);

        this.monsters.forEach(function(mon){
            this.game.physics.arcade.collide(mon, this.blockedLayer);

            mon.healthBar.setPosition(mon.body.x + 32,mon.body.y - 20);
            mon.healthBar.setPercent(mon.stats.currentHealth*100 / mon.stats.maxHealth);

            if (this.game.physics.arcade.collide(this.player, mon)) {
                mon.body.moves = false;
                mon.body.velocity.x = 0;
                mon.body.velocity.y = 0;
                mon.body.immovable = true;
            } else {
                mon.body.moves = true;
                mon.body.immovable = false;
            }

            this.game.physics.arcade.collide(this.player, mon);

            if (mon.stats.currentHealth <= 0) {
                mon.healthBar.kill();
                mon.animations.play("death", 5, false, true);
            }
        }, this);
    }

    simpleAI() {
        this.monsters.forEach(function (mon) {
                if (this.findSpritesByCoordinates(mon.x + 64, mon.y) === this.player ||
                    this.findSpritesByCoordinates(mon.x - 64, mon.y) === this.player ||
                    this.findSpritesByCoordinates(mon.x, mon.y + 64) === this.player ||
                    this.findSpritesByCoordinates(mon.x , mon.y - 64) === this.player) {

                    mon.attack(this.player);
                }

                if (mon.body.velocity.x === 0) {
                    if (mon.body.x > mon.origXY.x) {
                        mon.body.velocity.x = -150;
                    } else {
                        mon.body.velocity.x = 150;
                    }
                } else {
                    mon.body.velocity.x = 0;
                }

                if (mon.body.velocity.y === 0) {
                    if (mon.body.y > mon.origXY.y) {
                        mon.body.velocity.y = -150;
                    } else {
                        mon.body.velocity.y = 150;
                    }
                } else {
                    mon.body.velocity.y = 0;
                }
            }, this);
    }

    updateMonsterMovement() {
        if(this.countDown === 0) {
            this.simpleAI();
            this.countDown = 150;
        } else {
            this.countDown--;
        }
        this.monsters.forEach(function(mon){
            let spd = mon.body.velocity;
            if(spd.x > 0){
                mon.animations.play('walkRight');
            }
            else if(spd.x < 0){
                mon.animations.play('walkLeft');
            }
            else if(spd.y > 0){
                mon.animations.play('walkFront');
            }
            else if(spd.y < 0){
                mon.animations.play('walkBack');
            }
            else{
                mon.animations.stop();
            }
        });
    }

    updatePlayerMovement() {
        let cursors = this.cursors;

        // this.player.weapon.bulletKillDistance = 300;
        // this.player.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;

        let up = cursors.up.isDown;
        let down = cursors.down.isDown;
        let left = cursors.left.isDown;
        let right = cursors.right.isDown;

        this.player.body.immovable = false;

        let playerSpeed = this.player.stats.spd;
        if (up) {
            this.player.animations.play('walkBack');
            this.player.body.velocity.y = -playerSpeed;
            this.player.body.velocity.x = 0;
            this.player.weapon.fireAngle = 270;
            this.player.weapon.trackOffset.set(0,-32);
        } else if (down) {
            this.player.animations.play('walkFront');
            this.player.body.velocity.y = playerSpeed;
            this.player.body.velocity.x = 0;
            this.player.weapon.fireAngle = 90;
            this.player.weapon.trackOffset.set(0,32);
        } else if (left) {
            this.player.animations.play('walkLeft');
            this.player.body.velocity.x = -playerSpeed;
            this.player.body.velocity.y = 0;
            this.player.weapon.fireAngle = 180;
            this.player.weapon.trackOffset.set(-32,0);
        } else if (right) {
            this.player.animations.play('walkRight');
            this.player.body.velocity.x = playerSpeed;
            this.player.body.velocity.y = 0;
            this.player.weapon.fireAngle = 0;
            this.player.weapon.trackOffset.set(32,0);
        } else {
            this.player.body.immovable = true;
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }
    }
}
