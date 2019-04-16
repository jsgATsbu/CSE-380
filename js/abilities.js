"use strict";

// "Game" must be passed as context to all of these

let breakRock = function(creature) {
    let rock = this.findSpritesByCoordinates(creature.x + 64, creature.y + 64)[0];  // TODO placeholder
    if (rock !== undefined && rock.key === 'rock') {  // if the rock is in fact a rock
        rock.destroy();
    }
};