'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level3 = function() {
    this.mapKey = 'level3';
    this.lvl = 3;

    this.music = 'bgm3';

    this.defaultAbilities = [attack, null, null, null];

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [

    ];
};

TheLegendOfMeta.Level3.prototype = Object.create(Level.prototype);

TheLegendOfMeta.Level3.prototype.checkWinCondition = function() {
    // TODO
};
