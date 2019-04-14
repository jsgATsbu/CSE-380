var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Boot = function(){};

TheLegendOfMeta.Boot.prototype = {
  preload: function(){
    this.load.image('logo','assets/images/logo.png');
    this.load.image('preloadBar','assets/images/preloader-bar.png');
    this.load.image('mainMenuBG','assets/images/MainMenu.png');
    this.load.image('preloadBG','assets/images/Preload.png');
    this.load.image('selectLevelBG','assets/images/SelectLevel.png');
    this.load.image('settingBG','assets/images/Setting.png');
    this.load.image('helpBG','assets/images/Help.png');
  },
  create: function () {
    this.game.stage.backgroundColor = '#fff';

    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload');
  }
};