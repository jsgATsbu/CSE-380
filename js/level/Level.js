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
        createCollectable(this);
        createPlayer(this);
        createMonsters(this);
        createSkillSlot(this);
        setupInput(this);
        createText(this);
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
        // noinspection JSUnresolvedVariable
        let abilityIcons = this.skillIcons;

        if (player.abilities.includes(ability)) {
            return;
        }

        let index = player.abilities.indexOf(null);

        player.abilities[index] = ability;
        player.charges[index] = ability.charges;
        this.selectAbility(player.activeAbilityIndex);

        let icon = this.game.add.image(window.innerWidth/2 + (-128 + 61 * index) + 5,  // 61 not 64 because of the way the frame is designed
                                       window.innerHeight * 8/10 + 5,
                                       'abilities', ability.name);
        icon.fixedToCamera = true;
        icon.moveDown();
        abilityIcons[index] = icon;
    }

    removeAbility(ability) {
        let index = this.player.abilities.indexOf(ability);
        // noinspection JSUnresolvedVariable
        let icons = this.skillIcons;

        this.player.abilities[index] = null;
        this.player.charges[index] = null;

        this.selectAbility(this.player.activeAbilityIndex);

        icons[index].destroy();
        icons[index] = null;
    }

    selectAbility(num) {
        this.skillSlot = this.skillSlot || {};
        this.skillSlot.loadTexture("SkillSlot"+(num+1));

        this.player.activeAbility = this.player.abilities[num] || attack;
        this.player.activeAbilityIndex = num;
        this.player.weapon.bulletFrame = this.player.activeAbility.bullet;

        // let player = this.player;
        //
        // if (player.activeAbilityIndex === num) {
        //     player.activeAbilityIndex = -1;
        //     player.activeAbility = attack;
        //
        //     this.skillFrame.visible = false;
        // } else {
        //     player.activeAbilityIndex = num;
        //     player.activeAbility = player.abilities[num] || attack;
        //
        //     player.weapon.bulletFrame = player.activeAbility.bullet;
        //
        //     this.skillFrame.cameraOffset.setTo(window.innerWidth / 2 + (-128 + 64 * num),
        //         window.innerHeight * 8/10);
        //     this.skillFrame.visible = true;
        // }
    }
    
    playerDeath() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.play('death',3,false,true);
    }
}
