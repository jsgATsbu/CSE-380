'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level4 = function() {
    this.mapKey = 'level4';
    this.lvl = 4;

    this.music = 'bgm4';

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            name: 'icegiant1',
            type: iceGiant,
            moveList: [],
            ai: { patrol: [[27, 35], [28, 10], [20, 8], [6, 14], [5, 26], [15, 38]] }
        }
    ];
};

TheLegendOfMeta.Level4.prototype = Level.prototype;
