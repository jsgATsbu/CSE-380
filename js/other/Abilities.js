"use strict";

// The level must be passed as context to all of these

let getReach = function(angle) {
    let xReach, yReach;
    switch(angle) {
        case 0:
            xReach = 64;
            yReach = 0;
            break;
        case 90:
            xReach = 0;
            yReach = 64;
            break;
        case 180:
            xReach = -64;
            yReach = 0;
            break;
        case 270:
        default:
            xReach = 0;
            yReach = -64;
    }

    return [xReach, yReach];
};

let attack = function() {
    let player = this.player;
    let reach = getReach(player.weapon.fireAngle);

    let sprite = this.findSpritesByCoordinates(player.x + reach[0], player.y + reach[1])[0];
    if (sprite !== undefined) {
        player.attack(sprite);
    }
};

let breakRock = function() {
    let player = this.player;
    let reach = getReach(player.weapon.fireAngle);

    let tile = this.map.getTileWorldXY(player.x + reach[0], player.y + reach[1],
                                       64, 64, this.blockedLayer);
    if (tile !== null && (tile.index === 48)) {  // if the tile is a rock; note that tiles are indexed from 1
        this.map.removeTileWorldXY(player.x + reach[0], player.y + reach[1],
                                   64, 64, this.blockedLayer);
    }
};
breakRock.charges = 3;

let invisibility = function() {
    if (!this.player.invisible) {
        this.player.alpha = 0.5;
        this.player.invisible = true;

        this.game.time.events.add(10000, function() {
            this.player.alpha = 1.0;
            this.player.invisible = false;
        }, this);
    }
};
invisibility.charges = 1;

let strength = function() {
    if (!this.player.strengthened) {
        this.player.stats.atk *= 2;
        this.player.strengthened = true;

        this.game.time.events.add(10000, function() {
            this.player.stats.atk /= 2;
            this.player.strengthened = false;
        }, this);
    }
};
strength.charges = 1;

let feather = function() {
    this.player.weapon.fire();
};
feather.bullet = 'feather';
feather.charges = 5;

let freeze = function() {
    this.player.weapon.fire();
};
freeze.bullet = 'ice';
freeze.charges = 3;

let lifeDrain = function() {
    // TODO melee or ranged?
};
lifeDrain.charges = 3;

let poison = function() {
    let player = this.player;
    let reach = getReach(player.weapon.fireAngle);

    let sprite = this.findSpritesByCoordinates(player.x + reach[0], player.y + reach[1])[0];
    if (sprite !== undefined && !sprite.poisoned) {
        sprite.stats.currentHealth -= 10;
        sprite.healthBar.setPercent(sprite.stats.currentHealth*100 / sprite.stats.maxHealth);

        sprite.poisoned = true;
        this.game.time.events.repeat(1000, 9, function () {
            sprite.stats.currentHealth -= 10;
        }, this);

        this.game.time.events.add(10000, function() {
            sprite.poisoned = false;
        }, this);
    }
};
poison.charges = 3;

let fireball = function() {
    this.player.weapon.fire();
};
fireball.bullet = 'fireball';
fireball.charges = 3;

let fly = function() {
    let player = this.player;
    if (!player.flying) {
        player.flying = true;

        this.game.time.events.add(10000, function() {
            player.flying = false;
        }, this);
    }
};
fly.charges = 2;
