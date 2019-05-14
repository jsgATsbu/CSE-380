'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level2 = function() {
    this.mapKey = 'level2';
    this.lvl = 2;
    this.music = 'bgm2';

    this.defaultAbilities = [attack, null, null, null];

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            type: werewolf,
            ai: [
                [[9,5], [15, 33]],
                [[47, 62], [75, 62]],
                [[24, 74], [27, 57], [24, 74], [12, 60]],
                [[76, 28]],
                [[78, 28]]
            ]
        },

        {
            type: dreadFace,
            ai: [
                [[41, 68], [41, 77]],
                [[66, 23], [58, 19]]
            ]
        },

        {
            type: alien,
            ai: [
                [[26, 18], [28, 9]]
            ]
        },

        {
            type: harpy,
            ai: [
                [[55, 55], [65, 55]],
                [[76, 7], [67, 20]],
                [[76, 30]],
                [[78, 30]]
            ]
        }
    ];
};

TheLegendOfMeta.Level2.prototype = Object.create(Level.prototype);

// TheLegendOfMeta.Level2.prototype.checkWinCondition = function() {
//     let playerTile = this.map.getTileWorldXY(this.player.x, this.player.y);
//     return playerTile.x === 79 && playerTile.y === 36;
// };
