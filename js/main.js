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
TheLegendOfMeta.game.state.add('Level2',TheLegendOfMeta.Level2);
TheLegendOfMeta.game.state.add('Level3',TheLegendOfMeta.Level3);
TheLegendOfMeta.game.state.add('Level4',TheLegendOfMeta.Level4);
TheLegendOfMeta.game.state.add('Level5',TheLegendOfMeta.Level5);
TheLegendOfMeta.game.state.add('Level6',TheLegendOfMeta.Level6);
TheLegendOfMeta.game.state.add('ResultScreen', TheLegendOfMeta.ResultScreen);

TheLegendOfMeta.game.state.start('Boot');
