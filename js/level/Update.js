'use strict';

var updateBullets = function(level){


    level.game.physics.arcade.collide(level.player.weapon.bullets, level.blockedLayer, function(bullet, tile) {
        bullet.kill();
        if (bullet.frameName === 'fireball') {
            // if the tile is a tree; note that tiles are indexed from 1
            if (tile.index === 61 || tile.index === 62 || tile.index === 63 || tile.index === 117) {
                this.map.removeTile(tile.x, tile.y, this.blockedLayer);
            }
        }
    }, null, level);

    level.game.physics.arcade.overlap(level.player.weapon.bullets, level.monsters, function(enemy, bullet) {
        bullet.kill();
        switch (bullet.frameName) {
            case 'feather':
                enemy.stats.currentHealth -= 20;
                enemy.healthBar.setPercent(enemy.stats.currentHealth*100 / enemy.stats.maxHealth);
                break;

            case 'ice':
                enemy.stats.currentHealth -= 10;
                enemy.healthBar.setPercent(enemy.stats.currentHealth*100 / enemy.stats.maxHealth);

                if (!enemy.frozen) {
                    enemy.frozen = true;
                    let ice = this.game.add.sprite(enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, 'ice');
                    this.game.time.events.add(10000, function () {
                        enemy.frozen = false;
                        ice.destroy();
                    }, this);
                }
                break;

            case 'lifeDrain':
                enemy.stats.currentHealth -= 10;
                enemy.healthBar.setPercent(enemy.stats.currentHealth*100 / enemy.stats.maxHealth);

                this.player.stats.currentHealth -= 10;
                this.player.healthBar.setPercent(this.player.stats.currentHealth*100 / this.player.stats.maxHealth);
                break;

            case 'fireball':
                if (enemy.type === icegiant) {
                    enemy.stats.currentHealth -= 20;
                } else {
                    enemy.stats.currentHealth -= 10;
                }
                enemy.healthBar.setPercent(enemy.stats.currentHealth*100 / enemy.stats.maxHealth);

                if (!enemy.onFire) {
                    enemy.onFire = true;
                    this.game.time.events.repeat(1000, 9, function () {
                        if (enemy.type === icegiant) {
                            enemy.stats.currentHealth -= 10;
                        } else {
                            enemy.stats.currentHealth -= 5;
                        }
                    }, this);

                    this.game.time.events.add(10000, function () {
                        enemy.onFire = false;
                    }, this);
                }
                break;
        }

    }, null, level);
};

var updateSprites = function(level) {
    level.game.physics.arcade.collide(level.player, [level.blockedLayer,level.bulletLayer]);

    //// Update the HP bar position and the percentage every frame
    level.player.healthBar.setPosition(level.player.body.x + 32, level.player.body.y - 20);
    level.player.healthBar.setPercent(level.player.stats.currentHealth*100 / level.player.stats.maxHealth);

    level.monsters.forEach(function(mon){
        level.game.physics.arcade.collide(mon, [level.blockedLayer,level.bulletLayer]);

        mon.healthBar.setPosition(mon.body.x + 32,mon.body.y - 20);
        mon.healthBar.setPercent(mon.stats.currentHealth*100 / mon.stats.maxHealth);

        if (level.game.physics.arcade.collide(level.player, mon)) {
            mon.body.moves = false;
            mon.body.velocity.x = 0;
            mon.body.velocity.y = 0;
            mon.body.immovable = true;
        } else {
            mon.body.moves = true;
            mon.body.immovable = false;
        }

        level.game.physics.arcade.collide(level.player, mon);
    }, level);
};

var updateMonsterMovement = function(level) {
    if(level.monsterProperties === undefined){
        return;
    }
    level.monsters.forEach(function(mon) {
        mon.ai.update();
        animateSprite(mon);
    }, level);

    level.monsters = level.monsters.filter(function(mon) {
        return mon.stats.currentHealth > 0;
    });
};

var updatePlayerMovement = function(level) {

    if(level.player.stats.currentHealth <= 0){
        level.player.body.velocity.x = 0;
        level.player.body.velocity.y = 0;
        level.player.animations.play('death',3,false,true);
        return;
    }

    let cursors = level.cursors;

    let up = cursors.up.isDown;
    let down = cursors.down.isDown;
    let left = cursors.left.isDown;
    let right = cursors.right.isDown;

    level.player.body.immovable = false;

    let playerSpeed = level.player.stats.spd;
    if (up) {
        level.player.body.velocity.y = -playerSpeed;
        level.player.weapon.fireAngle = 270;
        level.player.weapon.trackOffset.set(0,-32);
    } else if (down) {
        level.player.body.velocity.y = playerSpeed;
        level.player.weapon.fireAngle = 90;
        level.player.weapon.trackOffset.set(0,32);
    } else {
        level.player.body.velocity.y=0;
    } 
    
    if (left) {
        level.player.body.velocity.x = -playerSpeed;
        level.player.weapon.fireAngle = 180;
        level.player.weapon.trackOffset.set(-32,0);
    } else if (right) {
        level.player.body.velocity.x = playerSpeed;
        level.player.weapon.fireAngle = 0;
        level.player.weapon.trackOffset.set(32,0);
    } else {
        level.player.body.velocity.x = 0;
    }

    if(level.player.body.velocity.x === 0 && level.player.body.velocity.y === 0) {
        level.player.body.immovable = true;
    }

    animateSprite(level.player);
};

var animateSprite = function(sprite) {
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
};

var checkGameStatus = function(level){
    if(level.player.alive === false){
        level.input.enabled = true;
        level.state.start("ResultScreen",true,false,'lose',level.lvl);
        return;
    }

    let allMonsterDead = true;
    level.monsters.forEach(function(mon){
        if(mon.alive)
            allMonsterDead = false
    },this);

    if(allMonsterDead){
        if(level.mapKey === 'level6'){
            level.state.start("ResultScreen",true,false,'final', level.lvl);
        }
        else {
            level.state.start("ResultScreen",true,false,'win', level.lvl);
        }
    }
};