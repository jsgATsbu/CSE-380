'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level6 = function() {
    this.mapKey = 'level6';
    this.lvl = 6;
    this.music = 'bgm6';

    this.defaultAbilities = [attack, null, null, null];

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            type: death,
            ai: [
                [[198,7],[198,12]],
                [[177,3],[182,3]],
                [[177,16],[182,16]],
                [[179,14],[185,14]],
                [[179,5],[185,5]]
                ]
        },

        {
            type: firestone,
            ai: [
                [[8,2],[16,11]],
                [[11,2],[19,7]],
                [[20,11],[28,3]],
                [[14,13],[29,11]],
                [[37,9],[30,3]],

                [[35,17],[47,11]],
                [[68,13],[81,17]],
                [[83,12],[73,11]],
                [[72,2],[88,5]],
                [[82,7],[90,18]],

                [[92,8],[100,15]],
                [[98,6],[107,6]],
                [[109,9],[96,18]],
                [[89,10],[99,16]],
                [[43,8],[31,17]],
            ]
        },

        {
            type: level6harpy,
            ai: [
                [[8,13],[22,18]],
                [[36,2],[47,6]],
                [[87,3],[90,6]],
                [[91,11],[100,15]],
                [[124,5],[132,3]],

                [[136,2],[127,14]],
                [[133,8],[134,18]],
                [[146,18],[146,12]],
                [[139,5],[151,5]],
                [[152,2],[153,17]],

                [[160,9],[159,17]],
                [[164,5],[172,11]],
                [[161,4],[166,1]],
                [[176,18],[187,18]],
                [[176,2],[187,2]],

            ]
        },
    ];
};

TheLegendOfMeta.Level6.prototype = Object.create(Level.prototype);

TheLegendOfMeta.Level6.prototype.checkWinCondition = function() {
    let death = this.monsters.find(function(monster) {
        return monster.key === 'death';
    });

    return !death;
};
