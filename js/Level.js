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
        this.createSkillSlot();

        this.game.camera.follow(this.player);
        this.setupInput();
        this.tempSetting = null;

        this.currentSkill = 1;

        this.openList = [];
        this.closedList = [];
        this.tileList = [];
        for(let i=0;i<50;i++) {
            this.tileList[i] = [];
            for (let j = 0; j < 50; j++) {
                let temp = {};
                temp.x = i;
                temp.y = j;
                temp.G = 0;
                temp.H = 0;
                temp.isBlocked = this.map.getTile(i, j, 'blockedLayer') !== null;
                temp.isNotBlocked = this.map.getTile(i, j, 'blockedLayer') === null;
                temp.name = " (" + temp.x + "," + temp.y + ") ";
                temp.parent = [];
                temp.reset = function () {
                    this.G = 0;
                    this.H = 0;
                    this.parent.length = 0;
                };
                this.tileList[i][j] = temp;
            }
        }
    }

    createSkillSlot(){
        this.skillSlot = this.game.add.image(this.game.camera.x+window.innerWidth/2,this.game.camera.y+window.innerHeight*8/10, 'SkillSlot');
        this.skillFrame = this.game.add.image(this.game.camera.x+window.innerWidth/2,this.game.camera.y+window.innerHeight*8/10, 'SkillFrame');
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

        var weapon = this.game.add.weapon(10, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 600;
        weapon.fireRate = 100;
        weapon.trackSprite(this.player);
        this.player.weapon = weapon;
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
        // sprite.origXY = {x: sprite.body.x, y: sprite.body.y};

        Object.keys(mon.animations).forEach(function (anim) {
            sprite.animations.add(anim, mon.animations[anim].frames, mon.animations[anim].frameRate, mon.animations[anim].loop);
        });
        sprite.animations.stop('walkFront', true);  // otherwise currentAnim will be the last one added

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

        sprite.attack = function(enemy) {
            let diffX = enemy.x - sprite.x;
            let diffY = enemy.y - sprite.y;
            console.log(diffX, diffY);

            let last = sprite.animations.currentAnim;
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
            sprite.animations.currentAnim.onComplete.addOnce(function() {
                sprite.animations.play(last);
            }, this);

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
        this.iKey = keyboard.addKey(Phaser.KeyCode.I);

        this.esc.onDown.add(function() {
            if (!this.game.paused) {
                this.pause();
            } else {
                this.unpause();
            }
        }, this);

        this.one.onDown.add(function() {
            this.currentSkill=0;}, this);
        this.two.onDown.add(function() {
            this.currentSkill=1;}, this);
        this.three.onDown.add(function() {
            this.currentSkill=2;}, this);
        this.four.onDown.add(function() {
            this.currentSkill=3;}, this);
        this.iKey.onDown.add(function() {
            this.player.invincible = !this.player.invincible;
        }, this);
        this.jKey.onDown.add(function() {
            this.player.weapon.fire();
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
        this.skillSlot.position.set(this.game.camera.x + window.innerWidth*5/12, this.game.camera.y + window.innerHeight*8/10);
        this.skillFrame.position.set(this.skillSlot.position.x+this.currentSkill*64, this.skillSlot.position.y);
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
                // if (this.findSpritesByCoordinates(mon.x + 64, mon.y) === this.player ||
                //     this.findSpritesByCoordinates(mon.x - 64, mon.y) === this.player ||
                //     this.findSpritesByCoordinates(mon.x, mon.y + 64) === this.player ||
                //     this.findSpritesByCoordinates(mon.x , mon.y - 64) === this.player) {
                //
                //     mon.attack(this.player);
                // }
                //
                // if (mon.body.velocity.x === 0) {
                //     if (mon.body.x > mon.origXY.x) {
                //         mon.body.velocity.x = -150;
                //     } else {
                //         mon.body.velocity.x = 150;
                //     }
                // } else {
                //     mon.body.velocity.x = 0;
                // }
                //
                // if (mon.body.velocity.y === 0) {
                //     if (mon.body.y > mon.origXY.y) {
                //         mon.body.velocity.y = -150;
                //     } else {
                //         mon.body.velocity.y = 150;
                //     }
                // } else {
                //     mon.body.velocity.y = 0;
                // }
            }, this);
    }

    updateMonsterMovement() {
        if(this.countDown === 0) {
            this.simpleAI();
            this.countDown = 150;
        } else {
            this.countDown--;
        }

        this.monsters.forEach(function(mon) {
            this.animateSprite(mon);
        }, this);
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
            this.player.body.velocity.y = -playerSpeed;
            this.player.body.velocity.x = 0;
            this.player.weapon.fireAngle = 270;
            this.player.weapon.trackOffset.set(0,-32);
        } else if (down) {
            this.player.body.velocity.y = playerSpeed;
            this.player.body.velocity.x = 0;
            this.player.weapon.fireAngle = 90;
            this.player.weapon.trackOffset.set(0,32);
        } else if (left) {
            this.player.body.velocity.x = -playerSpeed;
            this.player.body.velocity.y = 0;
            this.player.weapon.fireAngle = 180;
            this.player.weapon.trackOffset.set(-32,0);
        } else if (right) {
            this.player.body.velocity.x = playerSpeed;
            this.player.body.velocity.y = 0;
            this.player.weapon.fireAngle = 0;
            this.player.weapon.trackOffset.set(32,0);
        } else {
            this.player.body.immovable = true;
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        this.animateSprite(this.player);
    }

    animateSprite(sprite) {
        let currentAnim = sprite.animations.currentAnim;
        // don't interrupt attacking or death
        if (currentAnim.name === 'attackLeft' || currentAnim.name === 'attackRight' ||
             currentAnim.name === 'attackFront' || currentAnim.name === 'attackBack' ||
             currentAnim.name === 'death') {

            if (currentAnim.isPlaying) {
                return;
            }
        }

        let velocity = sprite.body.velocity;
        if (velocity.x > 0) {  // don't restart an already playing animation
            sprite.animations.play('walkRight');
        } else if (velocity.x < 0) {
            sprite.animations.play('walkLeft');
        } else if (velocity.y > 0) {
            sprite.animations.play('walkFront');
        } else if (velocity.y < 0) {
            sprite.animations.play('walkBack');
        } else {
            sprite.animations.stop(sprite.animations.currentAnim.name, true);
        }
    }

    aStar(head, end) {

        this.closedList = [];
        this.openList = [];
        head.reset();
        end.reset();

        let start =head;
        start.G = 0;
        start.H = this.getDist(start,end);
        start.F = start.G + start.H;
        start.parent = [];

        this.openList.push(start);

        while(this.openList.length > 0) {
            let min = this.openList[0];

            for(let i=0;i<this.openList.length;i++){
                if(this.openList[i].F < min.F){
                    min = this.openList[i];
                }
            }

            this.openList.splice(this.openList.indexOf(min),1);

            let nb = this.getNeighbors(min);

            for(let i=0;i<nb.length;i++){
                if(!this.openList.includes(nb[i])){
                    nb[i].G = this.getDist(nb[i],min) + min.G;
                    nb[i].H = this.getDist(nb[i],end);
                    nb[i].F = nb[i].G + nb[i].H;
                    nb[i].parent = min.parent.concat(nb[i]);
                    this.openList.push(nb[i]);
                }

                if(nb[i] === end){
                    return nb[i].parent;
                }
            }
            this.closedList.push(min);
        }
        return [];
    }

    gotoXY(x,y, sprite){

        let speed = sprite.stats.spd;
        let y2 = y-sprite.body.y;
        let x2 = x-sprite.body.x;

        if(y2 % (speed / 60) !== 0){
            sprite.body.y += y2 % (speed/60);
        }
        if(x2 % (speed / 60) !== 0){
            sprite.body.x += x2 % (speed/60);
        }

        if(x === sprite.body.x) {
            sprite.body.velocity.x = 0;
        }
        else{
            sprite.body.velocity.x = (x > sprite.body.x)?speed:-1*speed;
        }
        if(y === sprite.body.y) {
            sprite.body.velocity.y = 0;
        }
        else{
            sprite.body.velocity.y = (y > sprite.body.y)?speed:-1*speed;
        }
    }

    getDist(tile1,tile2){
        let x = Math.abs(tile1.x - tile2.x);
        let y = Math.abs(tile1.y - tile2.y);
        return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    }

    getNeighbors(tile){
        let list = [];
        if(this.tileList[tile.x-1][tile.y-1].isNotBlocked && this.tileList[tile.x][tile.y-1].isNotBlocked && this.tileList[tile.x-1][tile.y].isNotBlocked
        ){
            list.push(this.tileList[tile.x-1][tile.y-1]);
        }
        if(this.tileList[tile.x+1][tile.y-1].isNotBlocked && this.tileList[tile.x][tile.y-1].isNotBlocked && this.tileList[tile.x+1][tile.y].isNotBlocked
        ){
            list.push(this.tileList[tile.x+1][tile.y-1]);
        }
        if(this.tileList[tile.x-1][tile.y+1].isNotBlocked && this.tileList[tile.x][tile.y+1].isNotBlocked && this.tileList[tile.x-1][tile.y].isNotBlocked
        ){
            list.push(this.tileList[tile.x-1][tile.y+1]);
        }
        if(this.tileList[tile.x+1][tile.y+1].isNotBlocked && this.tileList[tile.x][tile.y+1].isNotBlocked && this.tileList[tile.x+1][tile.y].isNotBlocked
        ){
            list.push(this.tileList[tile.x+1][tile.y+1]);
        }
        if(this.tileList[tile.x-1][tile.y].isNotBlocked){
            list.push(this.tileList[tile.x-1][tile.y]);
        }
        if(this.tileList[tile.x+1][tile.y].isNotBlocked){
            list.push(this.tileList[tile.x+1][tile.y]);
        }
        if(this.tileList[tile.x][tile.y-1].isNotBlocked){
            list.push(this.tileList[tile.x][tile.y-1]);
        }
        if(this.tileList[tile.x][tile.y+1].isNotBlocked){
            list.push(this.tileList[tile.x][tile.y+1]);
        }

        list = list.filter(function(ele){
            return !this.closedList.includes(ele);
        }.bind(this));

        return list;
    }
}
