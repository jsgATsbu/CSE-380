'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level5 = function() {
    this.mapKey = 'level5';
    this.lvl = 5;

    this.music = 'bgm5';

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            name: 'vampire1',
            type: vampire,
            moveList: [],
            ai: { patrol: [[21, 6], [25, 11], [33, 35]] }
        }
    ];
};

TheLegendOfMeta.Level5.prototype = Level.prototype;
