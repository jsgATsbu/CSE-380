"use strict";

class Level {
    // subclasses should define mapKey, playerProperties, and monsterProperties
    constructor() {
        this.game = undefined;

        this.mapKey = undefined;  // should be string with name of map
        this.playerProperties = undefined;  // should be object with properties of player
        this.monsterProperties = undefined;  // should be array of objects with properties of each monster

        this.player = undefined;  // defined in createPlayer(); included here to avoid IDE warning
        this.skillFrame = undefined;  // defined in createSkillSlot(); included here to avoid IDE warning
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
        checkGameStatus(this);  // subclasses should define checkWinCondition()
    }

    findObjectsByType(type, map, layer) {
        let result = [];
        map.objects[layer].forEach(function(element) {
            if (element.type === type) {
                result.push(element);
            }
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

    addAbility(ability) {
        let player = this.player;
        let abilities = player.abilities;
        // noinspection JSUnresolvedVariable
        let abilityIcons = this.skillIcons;

        if (abilities.includes(ability)) {
            return;
        }

        abilities.push(ability);
        let index = player.activeAbilityIndex;  // reset selected ability
        player.activeAbilityIndex = -1;
        this.selectAbility(index);

        let icon = this.game.add.image(window.innerWidth/2 + (-128 + 64 * abilityIcons.length),
                                       window.innerHeight * 8/10,
                                       'abilities', ability.name);
        icon.fixedToCamera = true;
        icon.moveDown();
        abilityIcons.push(icon);
    }

    selectAbility(num) {
        let player = this.player;

        if (player.activeAbilityIndex === num) {
            player.activeAbilityIndex = -1;
            player.activeAbility = attack;

            this.skillFrame.visible = false;
        } else {
            player.activeAbilityIndex = num;
            player.activeAbility = player.abilities[num] || attack;

            player.weapon.bulletFrame = player.activeAbility.bullet;

            this.skillFrame.cameraOffset.setTo(window.innerWidth / 2 + (-128 + 64 * num),
                window.innerHeight * 8/10);
            this.skillFrame.visible = true;
        }
    }
}
