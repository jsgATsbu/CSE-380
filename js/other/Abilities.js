"use strict";

// The level must be passed as context to all of these

let breakRock = function() {
    let player = this.player;
    let xReach, yReach;
    switch(player.weapon.fireAngle) {
        case 180:
            xReach = -64;
            yReach = 0;
            break;
        case 0:
            xReach = 64;
            yReach = 0;
            break;
        case 270:
            xReach = 0;
            yReach = -64;
            break;
        case 90:
        default:
            xReach = 0;
            yReach = 64;
    }

    let tile = this.map.getTileWorldXY(player.x + xReach, player.y + yReach,
                                       64, 64, this.blockedLayer);
    if (tile !== null && tile.index === 112) {  // if the tile is a rock
        this.map.removeTileWorldXY(player.x + xReach, player.y + yReach,
                                   64, 64, this.blockedLayer);
    }
};

let invisibility = function() {
    // TODO
};