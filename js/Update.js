'use strict';

var updateBullets = function(obj){
    obj.game.physics.arcade.collide(obj.player.weapon.bullets,obj.blockedLayer,function(bullet){
        bullet.kill();
    },null,obj);
    obj.game.physics.arcade.overlap(obj.player.weapon.bullets,obj.monsters,function(enemy,bullet){
        bullet.kill();
        enemy.stats.currentHealth -= 5;
        enemy.healthBar.setPercent(enemy.stats.currentHealth*100/enemy.stats.maxHealth);
    },null,obj);
};

var updateSprites = function(obj) {
    obj.game.physics.arcade.collide(obj.player, [obj.blockedLayer,obj.bulletLayer]);

    //// Update the HP bar position and the percentage every frame
    obj.player.healthBar.setPosition(obj.player.body.x+32, obj.player.body.y-20);
    obj.player.healthBar.setPercent(obj.player.stats.currentHealth*100 / obj.player.stats.maxHealth);

    obj.monsters.forEach(function(mon){
        obj.game.physics.arcade.collide(mon, [obj.blockedLayer,obj.bulletLayer]);

        mon.healthBar.setPosition(mon.body.x+32,mon.body.y-20);

        if (obj.game.physics.arcade.collide(obj.player, mon)) {
            mon.body.moves = false;
            mon.body.velocity.x = 0;
            mon.body.velocity.y = 0;
            mon.body.immovable = true;
        } else {
            mon.body.moves = true;
            mon.body.immovable = false;
        }

        obj.game.physics.arcade.collide(obj.player, mon);

        if (mon.stats.currentHealth <= 0) {
            mon.healthBar.kill();
            mon.animations.play("death", 5, false, true);
        }
    }, obj);
};

var updateMonsterMovement = function(obj) {
    if(obj.countDown === 0) {
        obj.countDown = 150;
    } else {
        obj.countDown--;
    }

    obj.monsters.forEach(function(mon) {
        animateSprite(mon);
    }, obj);
};

var updatePlayerMovement = function(obj) {
    let cursors = obj.cursors;

    // obj.player.weapon.bulletKillDistance = 300;
    // obj.player.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;

    let up = cursors.up.isDown;
    let down = cursors.down.isDown;
    let left = cursors.left.isDown;
    let right = cursors.right.isDown;

    obj.player.body.immovable = false;

    let playerSpeed = obj.player.stats.spd;
    if (up) {
        obj.player.body.velocity.y = -playerSpeed;
        obj.player.body.velocity.x = 0;
        obj.player.weapon.fireAngle = 270;
        obj.player.weapon.trackOffset.set(0,-32);
    } else if (down) {
        obj.player.body.velocity.y = playerSpeed;
        obj.player.body.velocity.x = 0;
        obj.player.weapon.fireAngle = 90;
        obj.player.weapon.trackOffset.set(0,32);
    } else if (left) {
        obj.player.body.velocity.x = -playerSpeed;
        obj.player.body.velocity.y = 0;
        obj.player.weapon.fireAngle = 180;
        obj.player.weapon.trackOffset.set(-32,0);
    } else if (right) {
        obj.player.body.velocity.x = playerSpeed;
        obj.player.body.velocity.y = 0;
        obj.player.weapon.fireAngle = 0;
        obj.player.weapon.trackOffset.set(32,0);
    } else {
        obj.player.body.immovable = true;
        obj.player.body.velocity.x = 0;
        obj.player.body.velocity.y = 0;
    }

    animateSprite(obj.player);
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
}