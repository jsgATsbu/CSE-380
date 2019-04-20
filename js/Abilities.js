"use strict";

// The level must be passed as context to all of these

let breakRock = function(creature) {
    let xReach, yReach;
    switch(creature.direction) {
        case 'left':
            xReach = -64;
            yReach = 0;
            break;
        case 'right':
            xReach = 64;
            yReach = 0;
            break;
        case 'back':
            xReach = 0;
            yReach = -64;
            break;
        case 'front':
        default:
            xReach = 0;
            yReach = 64;
    }

    let tile = this.map.getTileWorldXY(creature.x + xReach, creature.y + yReach,
        64, 64, 'blockedLayer');
    if (tile !== null && tile.index === 112) {  // if the tile is a rock
        console.log(tile);
        this.map.removeTileWorldXY(creature.x + xReach, creature.y + yReach,
            64, 64, 'blockedLayer');
    }
};