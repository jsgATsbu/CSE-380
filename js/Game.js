'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Game = function() {};

TheLegendOfMeta.Game.prototype = {
    create: function() {
        ///for Simple AI, temporary
        this.countDown = 0;

        this.monsters = [];
        this.createMap();
        this.game.sprites = [];
        this.createPlayer();
        this.createMonster();

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
        this.player = this.game.add.sprite(playerObj.x+32, playerObj.y+32, 'player');
        this.initiateStat(this.player,30,15,100, 400);
        this.game.sprites.push(this.player);

        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5,0.5);

        // this.player.attack = function(sprite, atk) {
        //     sprite.damage(atk);
        // };
        this.player.abilities = [breakRock];
        this.player.activeAbility = function() {};

        var barConfig = {width: 64, height: 8, bar:{color: '#46EF6E'}, bg:{color: 'black'}, x: this.player.body.x, y: (this.player.body.y-this.player.body.height*2/3)};
        this.player.healthBar = new HealthBar(this.game, barConfig);
        this.player.healthBar.setAnchor(0.5,0.5);

        this.player.direction = 'front';
        this.player.animations.add('walkFront',[0,4,5,6,7], 5,true);
        this.player.animations.add('walkLeft',[1,8,9,10,11], 5,true);
        this.player.animations.add('walkRight',[2,12,13,14,15], 5,true);
        this.player.animations.add('walkBack',[3,16,17,18,19], 5,true);
    },
    createMonster: function(){
        let alienObj = this.findObjectsByType('alien',this.map,'objectsLayer')[0];
        let alien = this.game.add.sprite(alienObj.x+32, alienObj.y+32, 'alien');
        this.initiateStat(alien, 40,5,60,400);
        this.game.sprites.push(alien);
        this.monsters.push(alien);

        this.game.physics.arcade.enable(alien);
        alien.anchor.setTo(0.5,0.5);
        var barConfig = {width: 64, height: 8, bar:{color: '#46EF6E'}, bg:{color: 'black'}, x: alien.body.x, y: (alien.body.y-alien.body.height*2/3)};
        alien.healthBar = new HealthBar(this.game, barConfig);
        alien.healthBar.setAnchor(0.5,0.5);

        alien.animations.add('walkFront',[0,4,5,6,7], 5,true);
        alien.animations.add('walkLeft',[1,8,9,10,11], 5,true);
        alien.animations.add('walkRight',[2,12,13,14,15], 5,true);
        alien.animations.add('walkBack',[3,16,17,18,19], 5,true);

        let dreadFaceObj = this.findObjectsByType('dreadFace',this.map,'objectsLayer')[0];
        let dreadFace = this.game.add.sprite(dreadFaceObj.x+32, dreadFaceObj.y+32, 'dreadFace');
        this.initiateStat(dreadFace, 20,20,120,200);
        this.game.sprites.push(dreadFace);
        this.monsters.push(dreadFace);

        this.game.physics.arcade.enable(dreadFace);
        dreadFace.anchor.setTo(0.5,0.5);
        var barConfig2 = {width: 64, height: 8, bar:{color: '#46EF6E'}, bg:{color: 'black'}, x: dreadFace.body.x, y: (dreadFace.body.y-dreadFace.body.height*2/3)};
        dreadFace.healthBar = new HealthBar(this.game, barConfig2);
        dreadFace.healthBar.setAnchor(0.5,0.5);

        dreadFace.animations.add('walkFront',[0,1], 5,true);
        dreadFace.animations.add('walkLeft',[2,3], 5,true);
        dreadFace.animations.add('walkRight',[4,5], 5,true);
        dreadFace.animations.add('walkBack',[6,7], 5,true);

        //// For Simple AI, temporary
        alien.origXY = {x:alien.body.x,y:alien.body.y};
        dreadFace.origXY = {x:dreadFace.x,y:dreadFace.y};
    },
    initiateStat: function(sprite, atk, def, health, spd){
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
        this.game.physics.arcade.collide(this.player, this.game.sprites);

        //// Update the HP bar position and the percentage every frame
        this.player.healthBar.setPosition(this.player.body.x+32, this.player.body.y-20);
        this.player.healthBar.setPercent(this.player.stats.currentHealth*100/this.player.stats.maxHealth);
        this.monsters.forEach(function(mon){
            this.game.physics.arcade.collide(mon, this.blockedLayer);
            this.game.physics.arcade.collide(mon, this.game.sprites);
            mon.healthBar.setPosition(mon.body.x+32,mon.body.y-20);
            mon.healthBar.setPercent(mon.stats.currentHealth*100/mon.stats.maxHealth);
        },this);
        //// SimpleAI: Monsters[0] is the alien, Monsters[1] is dreadFace, we only have 2 monsters right now
        let alien = this.monsters[0];
        let dreadFace = this.monsters[1];

        if(alien.stats.currentHealth <= 0){
            alien.healthBar.kill();
            alien.kill();
        }
        if(dreadFace.stats.currentHealth <= 0){
            dreadFace.healthBar.kill();
            dreadFace.kill();
        }

        if(alien.body.velocity.x > 0){
            alien.animations.play('walkRight');
        }
        else if(alien.body.velocity.x < 0){
            alien.animations.play('walkLeft');
        }
        else{
            alien.animations.stop();
            alien.frame = 0;
        }

        if(dreadFace.body.velocity.y > 0){
            dreadFace.animations.play('walkFront');
        }
        else if(dreadFace.body.velocity.y <0){
            dreadFace.animations.play('walkBack');
        }
        else{
            dreadFace.animations.stop();
        }

        if(this.countDown === 0) {
            if (alien.body.velocity.x === 0) {
                if(alien.body.x > alien.origXY.x){
                    alien.body.velocity.x = -150;
                }
                else{
                    alien.body.velocity.x = 150;
                }
            }
            else{
                alien.body.velocity.x = 0;
            }
            if (dreadFace.body.velocity.y === 0) {
                if(dreadFace.body.y > dreadFace.origXY.y){
                    dreadFace.body.velocity.y = -100;
                }
                else{
                    dreadFace.body.velocity.y = 100;
                }
            }
            else{
                dreadFace.body.velocity.x = 0;
            }
            this.countDown = 150;
        }
        else{
            this.countDown--;
        }


        if(this.player.body.velocity.x > 0) {
            this.player.animations.play('walkRight');
            this.player.direction = 'right';
        }
        else if(this.player.body.velocity.x < 0){
            this.player.animations.play('walkLeft');
            this.player.direction = 'left';
        }
        else if(this.player.body.velocity.y > 0){
            this.player.animations.play('walkFront');
            this.player.direction = 'front';
        }
        else if(this.player.body.velocity.y < 0){
            this.player.animations.play('walkBack');
            this.player.direction = 'back';
        }
        else{
            this.player.animations.stop();
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
