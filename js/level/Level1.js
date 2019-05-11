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

    this.monsterProperties = [
        {
            type: werewolf,
            ai: [
                [[22,67],[13,71]],
                [[12,60],[24,63]],
                [[8,39],[15,47]],
                [[25,40],[25,52]],
                [[30,74],[32,58]],

                [[5,26],[23,26]],
                [[20,22],[27,19]],
                [[7,22],[18,13]],
                [[9,7],[13,4]],
                [[27,7],[11,10]],
            ]
        },

        {
            type: dreadFace,
            ai: [
                [[39,6],[46,11]],
                [[39,14],[43,17]],
                [[44,19],[50,8]],
                [[48,5],[62,4]],
                [[59,8],[63,10]],

                [[49,19],[57,21]],
                [[52,17],[65,14]],
                [[75,5],[75,13]],
                [[75,20],[62,24]],
            ]
        },

        {
            type: alien,
            ai: [
                [[38,55],[52,54]],
                [[49,57],[59,51]],
                [[59,54],[54,68]],
                [[58,49],[71,49]],
                [[75,52],[63,62]],

                [[45,75],[60,63]],
                [[41,74],[53,62]],
                [[68,69],[68,71],[71,71],[71,69]],
            ]
        },
    ];
};

TheLegendOfMeta.Level1.prototype = Level.prototype;
