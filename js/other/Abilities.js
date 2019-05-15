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

    return new Phaser.Point(xReach, yReach);
};

let getReachRange = function(sprite, angle) {
    let xMin, xMax, yMin, yMax;
    // note: 10 pixels is considered melee range to make melee combat smoother
    switch(angle) {
        case 0:
            xMin = sprite.right;
            xMax = sprite.right + 10;
            yMin = sprite.top;
            yMax = sprite.bottom;
            break;
        case 90:
            xMin = sprite.left;
            xMax = sprite.right;
            yMin = sprite.bottom;
            yMax = sprite.bottom + 10;
            break;
        case 180:
            xMin = sprite.left - 10;
            xMax = sprite.left;
            yMin = sprite.top;
            yMax = sprite.bottom;
            break;
        case 270:
        default:
            xMin = sprite.left;
            xMax = sprite.right;
            yMin = sprite.top - 10;
            yMax = sprite.top;
    }

    return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
};

let attack = function() {
    let player = this.player;
    let reach = getReachRange(player, player.weapon.fireAngle);

    let sprite = this.findSpritesByCoordinateRange(reach)[0];
    if (sprite !== undefined) {
        player.attack(sprite);
    }
};

attack.tooltip = "Basic Attack";

let breakRock = function() {
    let player = this.player;
    let reach = getReach(player.weapon.fireAngle);

    let tile = this.map.getTileWorldXY(player.x + reach.x, player.y + reach.y,
                                       64, 64, this.blockedLayer);
    if (tile !== null && (tile.index === 48)) {  // if the tile is a rock; note that tiles are indexed from 1
        this.map.removeTileWorldXY(player.x + reach.x, player.y + reach.y,
                                   64, 64, this.blockedLayer);
        return true;
    } else {
        return false;
    }
};
breakRock.charges = 3;
breakRock.tooltip = "Break Rock Obstacle (No damage to enemy)";

let invisibility = function() {
    if (!this.player.invisible) {
        this.player.alpha = 0.5;
        this.player.invisible = true;

        this.game.time.events.add(10000, function() {
            this.player.alpha = 1.0;
            this.player.invisible = false;
        }, this);

        return true;
    } else {
        return false;
    }
};
invisibility.charges = 1;
invisibility.tooltip = "Can make user invisible and free from attack for a short period of time";

let strength = function() {
    if (!this.player.strengthened) {
        this.player.stats.atk *= 2;
        this.player.strengthened = true;

        this.game.time.events.add(10000, function() {
            this.player.stats.atk /= 2;
            this.player.strengthened = false;
        }, this);

        return true;
    } else {
        return false;
    }
};
strength.charges = 1;
strength.tooltip = "Increase player attack";

let feather = function() {
    this.player.weapon.fire();
};
feather.bullet = 'feather';
feather.charges = 5;
feather.tooltip = "Attack with feather";

let freeze = function() {
    this.player.weapon.fire();
};
freeze.bullet = 'ice';
freeze.charges = 3;
freeze.tooltip = "Freeze enemy";

let lifeDrain = function() {
    let player = this.player;
    let reach = getReachRange(player, player.weapon.fireAngle);

    let sprite = this.findSpritesByCoordinateRange(reach)[0];
    if (sprite !== undefined) {
        player.attack(sprite);
        if (this.player.stats.maxHealth - this.player.stats.currentHealth >= 50) {
            this.player.stats.currentHealth += 50;
        } else {
            this.player.stats.currentHealth = this.player.stats.maxHealth;
        }

        return true;
    } else {
        return false;
    }
};
lifeDrain.charges = 1;
lifeDrain.tooltip = "Drain Life from enemy";

let poison = function() {
    let player = this.player;
    let reach = getReachRange(player, player.weapon.fireAngle);

    let sprite = this.findSpritesByCoordinateRange(reach)[0];
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

        return true;
    } else {
        return false;
    }
};
poison.charges = 3;
poison.tooltip = "Poison enemy";

let fireball = function() {
    this.player.weapon.fire();
};
fireball.bullet = 'fireball';
fireball.charges = 3;
fireball.tooltip = "Cast fireball";

let fly = function() {
    let player = this.player;
    if (!player.flying) {
        player.flying = true;

        this.game.time.events.add(10000, function() {
            player.flying = false;

            let tile = this.map.getTileWorldXY(player.x, player.y, 64, 64, this.bulletLayer);
            if (tile !== null) {
                this.playerDeath();
            }
        }, this);

        return true;
    } else {
        return false;
    }
};
fly.charges = 2;
fly.tooltip = "Allow flying over unwalkable region";

let waterWalk = function() {
    if (!this.player.float) {

        this.player.float = true;

        this.game.time.events.add(10000, function() {
            this.player.float = false;

            let tile = this.map.getTileWorldXY(player.x, player.y, 64, 64, this.bulletLayer);
            let water = this.map.getTileWorldXY(player.x, player.y, 64, 64, this.backgroundLayer);
            if (tile !== null || water.index === 27) {
                this.playerDeath();
            }
        }, this);

        return true;
    } else {
        return false;
    }
};

waterWalk.charges = 1;
waterWalk.tooltip = "Able to walk on water";

let strength_def = function() {
    if (!this.player.strengthened) {
        this.player.stats.def *= 2;
        this.player.strengthened = true;

        this.game.time.events.add(10000, function() {
            this.player.stats.def /= 2;
            this.player.strengthened = false;
        }, this);

        return true;
    } else {
        return false;
    }
};
strength_def.charges = 2;
strength_def.tooltip = "Increase player defense";