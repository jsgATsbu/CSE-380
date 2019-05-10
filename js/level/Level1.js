'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level1 = function() {
    this.mapKey = 'level1';
    this.lvl = 1;

    this.music = 'bgm1';

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    // this.monsterProperties = [
    //     {
    //         name: 'alien1',
    //         type: alien,
    //         moveList: [],
    //         ai: { patrol: [[3, 2], [8, 5], [3, 8], [8, 5]] }
    //     },
    //
    //     {
    //         name: 'dreadFace1',
    //         type: dreadFace,
    //         moveList: [],
    //         ai: { patrol: [[13, 20], [19, 13]] }
    //     }
    // ];
};

TheLegendOfMeta.Level1.prototype = Level.prototype;
