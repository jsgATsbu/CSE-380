'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level3 = function() {
    this.mapKey = 'level3';

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
};

TheLegendOfMeta.Level3.prototype = Level.prototype;
