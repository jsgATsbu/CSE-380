'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level1 = function() {
    this.mapKey = 'level1';

    this.playerProperties = {
        name: 'player',
        atk: 30,
        def: 15,
        health: 100,
        spd: 400,
        animations: {
            walkFront: [0, 4, 5, 6, 7],
            walkLeft: [1, 8, 9, 10, 11],
            walkRight: [2, 12, 13, 14, 15],
            walkBack: [3, 16, 17, 18, 19]
        }
    };

    this.monsterProperties = [
        {
            name: 'alien',
            atk: 50,
            def: 5,
            health: 60,
            spd: 400,
            animations: {
                walkFront: [0, 4, 5, 6, 7],
                walkLeft: [1, 8, 9, 10, 11],
                walkRight: [2, 12, 13, 14, 15],
                walkBack: [3, 16, 17, 18, 19]
            }
        },

        {
            name: 'dreadFace',
            atk: 20,
            def: 20,
            health: 120,
            spd: 200,
            animations: {
                walkFront: [0, 1],
                walkLeft: [2, 3],
                walkRight: [4, 5],
                walkBack: [6, 7]
            }
        }
    ];
};

TheLegendOfMeta.Level1.prototype = Level.prototype;
