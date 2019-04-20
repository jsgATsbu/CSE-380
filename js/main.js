'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,'');

TheLegendOfMeta.game.state.add('Boot',TheLegendOfMeta.Boot);
TheLegendOfMeta.game.state.add('Preload',TheLegendOfMeta.Preload);
TheLegendOfMeta.game.state.add('MainMenu',TheLegendOfMeta.MainMenu);
TheLegendOfMeta.game.state.add('SelectLevel',TheLegendOfMeta.SelectLevel);
TheLegendOfMeta.game.state.add('Setting',TheLegendOfMeta.Setting);
TheLegendOfMeta.game.state.add('Help',TheLegendOfMeta.Help);
TheLegendOfMeta.game.state.add('Level1',TheLegendOfMeta.Level1);

TheLegendOfMeta.game.state.start('Boot');
