'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level4 = function() {
    this.mapKey = 'level4';
    this.lvl = 4;

    this.music = 'bgm4';

    this.playerProperties = {
        name: 'player',
        atk: 30,
        def: 15,
        health: 100,
        spd: 400,
        animations: {
            walkFront: {frames: [0, 1], frameRate: 5, loop: true},
            walkLeft: {frames: [2,3], frameRate: 5, loop: true},
            walkRight: {frames: [4,5], frameRate: 5, loop: true},
            walkBack: {frames: [6,7], frameRate: 5, loop: true},
            attackFront: {frames: [8,9,10,11], frameRate: 5, loop: false},
            attackLeft: {frames: [12,13,14,15], frameRate: 5, loop: false},
            attackRight: {frames: [16,17,18,19], frameRate: 5, loop: false},
            attackBack: {frames: [20,21,22,23], frameRate: 5, loop: false},
            death: {frames: [24,25,26,27], frameRate: 3, loop: false},
            abilityFront: {frames: [28,29,30,31], frameRate: 5, loop: false},
            abilityLeft: {frames: [32,33,34,35], frameRate: 5, loop: false},
            abilityRight: {frames: [36,37,38,39], frameRate: 5, loop: false},
            abilityBack: {frames: [40,41,42,43], frameRate: 5, loop: false},
            buffWalkFront: {frames: [44,45], frameRate: 5, loop: true},
            buffWalkLeft: {frames: [46,47], frameRate: 5, loop: true},
            buffWalkRight: {frames: [48,49], frameRate: 5, loop: true},
            buffWalkBack: {frames: [50,51], frameRate: 5, loop: true},
            buffAttackFront: {frames: [52,53,54,55], frameRate: 5, loop: false},
            buffAttackLeft: {frames: [56,57,58,59], frameRate: 5, loop: false},
            buffAttackRight: {frames: [60,61,62,63], frameRate: 5, loop: false},
            buffAttackBack: {frames: [64,65,66,67], frameRate: 5, loop: false},
            buffAbilityFront: {frames: [68,69,70,71], frameRate: 5, loop: false},
            buffAbilityLeft: {frames: [72,73,74,75], frameRate: 5, loop: false},
            buffAbilityRight: {frames: [76,77,78,79], frameRate: 5, loop: false},
            buffAbilityBack: {frames: [80,81,82,83], frameRate: 5, loop: false}
        }
    };

    this.monsterProperties = [
        {
            name: 'icegiant',
            atk: 50,
            def: 5,
            health: 60,
            spd: 400,
            moveList: [],
            ai: { patrol: [[27, 35], [28, 10], [20, 8], [6, 14], [5, 26], [15, 38]] },
            animations: {
                walkFront: {frames: [0,1], frameRate: 5, loop: true},
                walkLeft: {frames: [2,3], frameRate: 5, loop: true},
                walkRight: {frames: [4,5], frameRate: 5, loop: true},
                walkBack: {frames: [6,7], frameRate: 5, loop: true},
                attackFront: {frames: [8,9,10,11], frameRate: 5, loop: false},
                attackLeft: {frames: [12,13,14,15], frameRate: 5, loop: false},
                attackRight: {frames: [16,17,18,19], frameRate: 5, loop: false},
                attackBack: {frames: [20,21,22,23], frameRate: 5, loop: false},
                death: {frames: [24,25,26,27], frameRate: 5, loop: false}
            },
            ability: freeze
        }
    ];
};

TheLegendOfMeta.Level4.prototype = Level.prototype;
