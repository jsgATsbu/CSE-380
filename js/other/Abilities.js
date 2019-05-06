"use strict";

// The level must be passed as context to all of these

let attack = function() {
    let player = this.player;
    let xReach, yReach;
    switch(player.weapon.fireAngle) {
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

    let sprite = this.findSpritesByCoordinates(player.x + xReach, player.y + yReach)[0];
    if (sprite !== undefined) {
        player.attack(sprite);
    }
};

let breakRock = function() {
    let player = this.player;
    let xReach, yReach;
    switch(player.weapon.fireAngle) {
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

    let tile = this.map.getTileWorldXY(player.x + xReach, player.y + yReach,
                                       64, 64, this.blockedLayer);
    if (tile !== null && tile.index === 112) {  // if the tile is a rock
        this.map.removeTileWorldXY(player.x + xReach, player.y + yReach,
                                   64, 64, this.blockedLayer);
    }
};

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

let feather = function() {
    this.player.weapon.fire();
};
feather.bullet = 'feather';

let freeze = function() {
    this.player.weapon.fire();
};
freeze.bullet = 'ice';

let lifeDrain = function() {
    // TODO melee or ranged?
};

let poison = function() {
    // TODO
};
