"use strict";

class Level {
    // subclasses should define mapKey, playerProperties, monsterProperties, and abilities
    constructor() {
        this.game = undefined;

        this.mapKey = undefined;  // should be string with name of map
        this.playerProperties = undefined;  // should be object with properties of player
        this.monsterProperties = undefined;  // should be array of objects with properties of each monster
        this.defaultAbilities = undefined;  // should be array of default abilities

        this.player = undefined;  // defined in createPlayer(); included here to avoid IDE warning
    }

    create() {
        createSound(this);
        createFields(this);
        createMap(this);
        createCollectable(this);
        createPlayer(this);
        createMonsters(this);
        setupAbilities(this);
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

    findSpritesByCoordinateRange(range) {
        let result = [];
        this.game.sprites.forEach(function (sprite) {
            if (range.xMin < sprite.right && range.xMax > sprite.left &&
                range.yMin < sprite.bottom && range.yMax > sprite.top) {
                result.push(sprite);
            }
        });
        return result;
    }

    addAbility(ability) {
        if(ability === undefined){
            return;
        }
        let player = this.player;

        let currentIndex = player.abilities.indexOf(ability);
        if (currentIndex !== -1) {
            player.charges[currentIndex] += ability.charges;
            // noinspection JSUnresolvedVariable
            this.chargesText[currentIndex].setText(player.charges[currentIndex]);
            return;
        }

        let nextIndex = player.abilities.indexOf(null);
        if (nextIndex === -1) {  // abilities are full
            return;
        }

        player.abilities[nextIndex] = ability;
        player.charges[nextIndex] = ability.charges;
        this.selectAbility(player.activeAbilityIndex);

        let icon = this.game.add.image(window.innerWidth/2 + (-128 + 61 * nextIndex) + 5,  // 61 not 64 because of the way the frame is designed
                                       window.innerHeight * 8/10 + 5,
                                       'abilities', ability.name);
        icon.fixedToCamera = true;
        icon.moveDown();
        for (let i = 0; i < nextIndex; i++) icon.moveDown();  // icons overlap, so have to keep moving down
        // noinspection JSUnresolvedVariable
        this.skillIcons[nextIndex] = icon;

        let text = this.game.add.text(window.innerWidth/2 + (-128 + 61 * nextIndex) + 66,
                                      window.innerHeight * 8/10 + 66,
                                      ability.charges, { font: '8pt Courier New', fill: 'white' });
        text.fixedToCamera = true;
        text.anchor.setTo(1, 1);
        // noinspection JSUnresolvedVariable
        this.chargesText[nextIndex] = text;
    }

    removeAbility(ability) {
        let index = this.player.abilities.indexOf(ability);
        // noinspection JSUnresolvedVariable
        let icons = this.skillIcons;
        // noinspection JSUnresolvedVariable
        let chargesText = this.chargesText;

        this.player.abilities.splice(index, 1);
        this.player.abilities.push(null);
        this.player.charges.splice(index, 1);
        this.player.charges.push(null);

        if (this.player.abilities[this.player.activeAbilityIndex] === null) {
            this.player.activeAbilityIndex--;
        }
        this.selectAbility(this.player.activeAbilityIndex);

        icons[index].destroy();
        chargesText[index].destroy();
        icons.splice(index, 1);
        chargesText.splice(index, 1);
        icons.push(null);
        chargesText.push(null);
        for(let i = index; i < icons.length; i++) {
            if (icons[i] !== null) {
                icons[i].cameraOffset.x -= 61;
                chargesText[i].cameraOffset.x -= 61;
            }
        }
    }

    selectAbility(num) {
        if (this.player.abilities[num] === null) {
            return;
        }

        this.skillSlot = this.skillSlot || {};
        this.skillSlot.loadTexture("SkillSlot"+(num+1));

        this.player.activeAbility = this.player.abilities[num];
        this.player.activeAbilityIndex = num;
        this.player.weapon.bulletFrame = this.player.activeAbility.bullet;
    }
    
    playerDeath() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.play('death',3,false,true);
    }
}
