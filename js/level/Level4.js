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
            type: worm,
            ai: [            // worms are immobile; their permanent locations are included here for consistency
                [[57, 21]],
                [[29, 2]],
                [[77, 29]],
                [[2, 54]],
                [[53, 77]],
                [[27, 57]]
            ]
        },

        {
            type: harpy,
            ai: [
                [[11, 7], [71, 74]],
                [[11, 74], [71, 7]],
                [[52, 2], [77, 54], [29, 77], [2, 29]],
                [[29, 77], [2, 29], [52, 2], [77, 54]],
                [[77, 54], [29, 77], [2, 29], [52, 2]],
                [[2, 29], [52, 2], [77, 54], [29, 77]]
            ]
        },

        {
            type: firestone,
            ai: [
                [[1, 1]]
            ]
        },

        {
            type: icegiant,
            ai: [
                [[75, 0], [75, 5], [79, 5]]
            ]
        }
    ];
};

TheLegendOfMeta.Level4.prototype = Level.prototype;

TheLegendOfMeta.Level4.prototype.checkWinCondition = function() {
    let playerTile = this.map.getTileWorldXY(this.player.x, this.player.y);

    let icegiant1 = this.monsters.find(function(monster) {
        return monster.key === 'icegiant';
    });

    return !icegiant1.alive && playerTile.x >= 75 && playerTile.y <= 5;
};
