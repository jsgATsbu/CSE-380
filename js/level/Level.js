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
        createSound(this);
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

    /*addIcon(x, y, ability) {
        let icon = this.game.add.sprite(x, y, ability.name);
        this.game.physics.arcade.enable(icon);
        icon.anchor.setTo(0.5,0.5);
        icon.ability = ability;

        this.icons.push(icon);
    }*/

    addAbility(ability) {
        // noinspection JSUnresolvedVariable
        let player = this.player;
        let abilities = player.abilities;
        let abilityIcons = this.skillIcons;

        abilities.splice(3, 1);
        abilities.splice(0, 0, ability);

        if (player.activeAbilityIndex === 0) {
            player.activeAbilityIndex = 3;
        } else {
            player.activeAbilityIndex -= 1;
        }
        player.activeAbility = abilities[player.activeAbilityIndex];


        if (abilityIcons[3]) {
            abilityIcons[3].destroy();
        }
        abilityIcons.splice(3, 1);
        abilityIcons.forEach(function (icon) {
            icon.x -= 64;
        });

        let icon = this.game.add.image(window.innerWidth/2 - 128, window.innerHeight * 8/10, ability.name);
        icon.fixedToCamera = true;
        icon.moveDown();
        abilityIcons.splice(0, 0, icon);
    }
}
