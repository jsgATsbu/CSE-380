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
            type: harpy,
            ai: [
                [[55,6],[71,10]],
                [[24,8],[16,4]],
                [[10,6],[5,12]],
                [[10,67],[12,72]],
                [[68,66],[56,70]],

                [[70,50],[73,62]],
                [[31,43],[41,47]]
            ]
        },

        {
            type: siren,
            ai: [
                [[48,2],[48,10]],
                [[29,5],[39,8]],
                [[16,15],[22,24]],
                [[11,27],[16,35]],
                [[20,48],[15,56]],

                [[38,64],[25,69]],
                [[42,65],[57,59]],
                [[60,42],[69,41]],
                [[50,28],[50,40]]
            ]
        },

        {
            type: statue,
            ai: [
                [[37,36],[37,36]],
                [[13,8],[13,8]],
                [[7,56],[7,56]],
                [[10,70],[10,70]],
                [[22,63],[22,63]],

                [[68,36],[68,36]],
                [[73,69],[73,69]]
            ]
        },

        {
            type: firestone,
            ai: [
                [[46,32],[45,42]],
                [[41,26],[31,27]]
            ]
        }
    ];
};

TheLegendOfMeta.Level3.prototype = Level.prototype;
