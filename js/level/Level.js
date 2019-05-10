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
        // checkGameStatus(this);
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

    /*addIcon(x, y, ability) {
        let icon = this.game.add.sprite(x, y, ability.name);
        this.game.physics.arcade.enable(icon);
        icon.anchor.setTo(0.5,0.5);
        icon.ability = ability;

        this.icons.push(icon);
    }*/

    addAbility(ability) {
        let player = this.player;
        let abilities = player.abilities;
        // noinspection JSUnresolvedVariable
        let abilityIcons = this.skillIcons;

        if (abilities.includes(ability)) {
            return;
        }

        // TODO figure out what to do if player has four abilities
        abilities.push(ability);
        /*abilities.splice(3, 1);
        abilities.splice(0, 0, ability);


        if (player.activeAbility !== attack) {
            if (player.activeAbilityIndex === 3) {
                player.activeAbilityIndex = 0;
                this.skillFrame.cameraOffset.setTo(window.innerWidth / 2 - 128,
                                                   window.innerHeight * 8 / 10)
            } else {
                player.activeAbilityIndex += 1;
                this.skillFrame.x += 64;
            }
        }*/
        let index = player.activeAbilityIndex;  // reset selected ability
        player.activeAbilityIndex = -1;
        this.selectAbility(index);


        /*if (abilityIcons[3]) {
            abilityIcons[3].destroy();
        }
        abilityIcons.splice(3, 1);
        abilityIcons.forEach(function(icon) {
            icon.x += 64;
        });*/

        let icon = this.game.add.image(window.innerWidth/2 + (-128 + 64 * abilityIcons.length),
                                       window.innerHeight * 8/10,
                                       'abilities', ability.name);
        icon.fixedToCamera = true;
        icon.moveDown();
        // abilityIcons.splice(0, 0, icon);
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
            player.weapon.bullets.forEach(function(bullet) {
                bullet.frameName = player.activeAbility.bullet;
            }, this);

            this.skillFrame.cameraOffset.setTo(window.innerWidth / 2 + (-128 + 64 * num),
                window.innerHeight * 8/10);
            this.skillFrame.visible = true;
        }
    }
}
