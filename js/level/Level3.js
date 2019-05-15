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
        {
            type: siren,
            ai: [
                [[49,2],[29,8]],
                [[18,16],[31,23]],
                [[51,8],[65,25]],
                [[52,23],[77,36]],
                [[32,20],[46,50]],

                [[20,27],[21,47]],
                [[7,64],[29,52]],
                [[3,62],[17,76]],
                [[42,69],[72,74]],
                [[77,41],[53,59]],

                [[33,31],[41,31],[41,40],[33,40]],
            ]
        },

        {
            type: statue,
            ai: [
                [[]],
                [[]],
                [[]],
                [[]],
                [[]],

                [[]],
                [[]],
                [[]],
                [[]],
                [[]],

                [[]],
            ]
        }
    ];
};

TheLegendOfMeta.Level3.prototype = Object.create(Level.prototype);

TheLegendOfMeta.Level3.prototype.checkWinCondition = function() {
    // TODO
};
