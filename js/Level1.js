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
            walkFront: {frames: [0, 4, 5, 6, 7], frameRate: 5, loop: true},
            walkLeft: {frames: [1, 8, 9, 10, 11], frameRate: 5, loop: true},
            walkRight: {frames: [2, 12, 13, 14, 15], frameRate: 5, loop: true},
            walkBack: {frames: [3, 16, 17, 18, 19], frameRate: 5, loop: true},
            attackFront: {frames: [0, 36, 37, 38, 39], frameRate: 5, loop: false},
            attackLeft: {frames: [1, 40, 41, 42, 43], frameRate: 5, loop: false},
            attackRight: {frames: [2, 44, 45, 46, 47], frameRate: 5, loop: false},
            attackBack: {frames: [3, 48, 49, 50, 51], frameRate: 5, loop: false},
            death: {frames: [20, 21, 22, 23], frameRate: 5, loop: false}
        }
    };

    this.monsterProperties = [
        {
            name: 'alien',
            atk: 50,
            def: 5,
            health: 60,
            spd: 400,
            moveList: [],
            status: {
                patrol: [[3,2],[8,5],[3,8],[8,5]]
            },
            animations: {
                walkFront: {frames: [0, 4, 5, 6, 7], frameRate: 5, loop: true},
                walkLeft: {frames: [1, 8, 9, 10, 11], frameRate: 5, loop: true},
                walkRight: {frames: [2, 12, 13, 14, 15], frameRate: 5, loop: true},
                walkBack: {frames: [3, 16, 17, 18, 19], frameRate: 5, loop: true},
                attackFront: {frames: [0, 20, 21, 22, 23], frameRate: 5, loop: false},
                attackLeft: {frames: [1, 24, 25, 26, 27], frameRate: 5, loop: false},
                attackRight: {frames: [2, 28, 29, 30, 31], frameRate: 5, loop: false},
                attackBack: {frames: [3, 32, 33, 34, 35], frameRate: 5, loop: false},
                death: {frames: [36, 37, 38, 39], frameRate: 5, loop: false}
            }
        },

        {
            name: 'dreadFace',
            atk: 20,
            def: 20,
            health: 120,
            spd: 200,
            moveList: [],
            status: {
                patrol: [[13, 20], [19, 13]]
            },
            animations: {
                walkFront: {frames: [0, 1], frameRate: 5, loop: true},
                walkLeft: {frames: [2, 3], frameRate: 5, loop: true},
                walkRight: {frames: [4, 5], frameRate: 5, loop: true},
                walkBack: {frames: [6, 7], frameRate: 5, loop: true},
                attackFront: {frames: [0, 8, 9, 10, 11], frameRate: 5, loop: false},
                attackLeft: {frames: [2, 12, 13, 14, 15], frameRate: 5, loop: false},
                attackRight: {frames: [4, 16, 17, 18, 19], frameRate: 5, loop: false},
                attackBack: {frames: [6, 20, 21, 22, 23], frameRate: 5, loop: false},
                death: {frames: [24, 25, 26, 27], frameRate: 5, loop: false}
            }
        }
    ];
};

TheLegendOfMeta.Level1.prototype = Level.prototype;
