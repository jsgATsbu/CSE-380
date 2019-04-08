'use strict';

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.game = new Phaser.Game(/* TODO decide how large the game window will be */);

LegendOfMeta.game.state.add('Boot', LegendOfMeta.Boot);
LegendOfMeta.game.state.add('Preload', LegendOfMeta.Preload);
LegendOfMeta.game.state.add('Game', LegendOfMeta.Game);

LegendOfMeta.game.state.start('Boot');
