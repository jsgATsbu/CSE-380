'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Level5 = function() {
    this.mapKey = 'level5';
    this.lvl = 5;
    this.music = 'bgm5';

    this.defaultAbilities = [feather, null, null, null];

    this.playerProperties = {
        name: 'player',
        type: meta
    };

    this.monsterProperties = [
        {
            type: vampire,
            ai: [
                [[3,9],[14,2]],
                [[21,15],[29,2]],
                [[24,16],[34,20]],
                [[45,3],[42,15]],
                [[56,9],[52,23]],

                [[3,16],[21,17]],
                [[3,19],[17,19],[17,23],[3,23]],
                [[25,20],[22,26],[11,26]],
                [[29,15],[34,20],[30,24]],
                [[38,18],[46,24]],

                [[51,23],[57,23],[55,32]],
                [[16,31],[22,31],[22,37],[16,37]],
                [[27,31],[33,28],[35,36]],
                [[39,32],[39,45]],
                [[7,31],[16,42]],

                [[2,38],[9,38],[9,45]],
                [[17,45],[35,44]],
                [[12,54],[32,51]],
                [[52,33],[57,33],[57,44]],
                [[35,52],[43,52],[43,57],[35,57]],

                [[41,43],[57,43],[57,46]],
            ]
        }
    ];
};

TheLegendOfMeta.Level5.prototype = Object.create(Level.prototype);

TheLegendOfMeta.Level5.prototype.checkWinCondition = function() {
    return this.soulorbs.children.length === 0;
};
