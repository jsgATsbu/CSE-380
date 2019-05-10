'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level2 = function() {
    this.mapKey = 'level2';
    this.lvl = 2;

    this.music = 'bgm2';

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            name: 'werewolf1',
            type: werewolf,
            moveList: [],
            ai: { patrol: [[9,5], [15, 33]] }
        },

        {
            name: 'werewolf2',
            type: werewolf,
            moveList: [],
            ai: { patrol: [[47, 62], [75, 62]] }
        },

        {
            name: 'werewolf3',
            type: werewolf,
            moveList: [],
            ai: { patrol: [[24, 74], [27, 57], [24, 74], [12, 60]] }
        },

        {
            name: 'guardWerewolf1',
            type: werewolf,
            moveList: [],
            ai: { patrol: [[76, 28]] }
        },

        {
            name: 'guardWerewolf2',
            type: werewolf,
            moveList: [],
            ai: { patrol: [[78, 28]] }
        },

        {
            name: 'dreadFace1',
            type: dreadFace,
            moveList: [],
            ai: { patrol: [[41, 68], [41, 77]] }
        },

        {
            name: 'dreadFace2',
            type: dreadFace,
            moveList: [],
            ai: { patrol: [[66, 23], [58, 19]] }
        },

        {
            name: 'alien1',
            type: alien,
            moveList: [],
            ai: { patrol: [[26, 18], [28, 9]] }
        },

        {
            name: 'harpy1',
            type: harpy,
            moveList: [],
            ai: { patrol: [[55, 55], [65, 55]] }
        },

        {
            name: 'harpy2',
            type: harpy,
            moveList: [],
            ai: { patrol: [[76, 7], [67, 20]] }
        },

        {
            name: 'guardHarpy1',
            type: harpy,
            moveList: [],
            ai: { patrol: [[76, 30]] }
        },

        {
            name: 'guardHarpy2',
            type: harpy,
            moveList: [],
            ai: { patrol: [[78, 30]] }
        }
    ];
};

TheLegendOfMeta.Level2.prototype = Level.prototype;
