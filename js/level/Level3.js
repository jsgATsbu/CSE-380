'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level3 = function() {
    this.mapKey = 'level3';
    this.lvl = 3;

    this.music = 'bgm3';

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            name: 'harpy1',
            type: harpy,
            moveList: [],
            ai: { patrol: [[10, 24], [28, 26], [26, 7], [7, 6]] }
        }
    ];
};

TheLegendOfMeta.Level3.prototype = Object.create(Level.prototype);

TheLegendOfMeta.Level3.prototype.checkWinCondition = function() {
    // TODO
};
