'use strict';

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.game = new Phaser.Game(2560, 2560);

LegendOfMeta.game.state.add('Boot', LegendOfMeta.Boot);
LegendOfMeta.game.state.add('Preload', LegendOfMeta.Preload);
LegendOfMeta.game.state.add('Game', LegendOfMeta.Game);

LegendOfMeta.game.state.start('Boot');
