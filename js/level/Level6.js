'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level6 = function() {
    this.mapKey = 'level6';
    this.lvl = 6;

    this.music = 'bgm6';

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            name: 'death1',
            type: death,
            moveList: [],
            ai: { patrol: [[5, 11], [9, 30], [25, 28], [23, 6]] }
        }
    ];
};

TheLegendOfMeta.Level6.prototype = Level.prototype;
