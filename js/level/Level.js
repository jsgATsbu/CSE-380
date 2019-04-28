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
        createFields(this);
        createMap(this);
        createPlayer(this);
        createMonsters(this);
        createSkillSlot(this);
        setupInput(this);
    }

    update() {
        updateBullets(this);
        updateSprites(this);
        updatePlayerMovement(this);
        updateMonsterMovement(this);
        checkGameStatus(this);
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
}
