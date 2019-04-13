var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,'');

TheLegendOfMeta.game.state.add('Boot',TheLegendOfMeta.Boot);
TheLegendOfMeta.game.state.add('Preload',TheLegendOfMeta.Preload);
TheLegendOfMeta.game.state.add('MainMenu',TheLegendOfMeta.MainMenu);
TheLegendOfMeta.game.state.add('Game',TheLegendOfMeta.Game);

TheLegendOfMeta.game.state.start('Boot');