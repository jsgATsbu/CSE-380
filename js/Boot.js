"use strict";

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Boot = function(){};

TheLegendOfMeta.Boot.prototype = {
    preload: function(){
        this.load.image('logo','assets/images/logo.png');
        this.load.image('preloadBar','assets/images/preloader-bar.png');
        this.load.image('mainMenuBG','assets/images/menu_bg.png');
        this.load.image('preloadBG','assets/images/Preload.png');
        this.load.image('selectLevelBG','assets/images/SelectLevel.png');
        this.load.image('settingBG','assets/images/Setting.png');
        this.load.image('helpBG','assets/images/help_bg.png');
        this.load.image('Level-1','assets/images/Level1.png');
        this.load.image('Level-2','assets/images/Level2.png');
        this.load.image('Level-3','assets/images/Level3.png');
        this.load.image('Level-4','assets/images/Level4.png');
        this.load.image('Level-5','assets/images/Level5.png');
        this.load.image('Level-6','assets/images/Level6.png');
        this.load.image('pauseMenu','assets/images/menu_paused.png');
        this.load.image("Black",'assets/images/Black.png');
        this.load.image("Control",'assets/images/controls.png');
        this.load.image("SkillSlot",'assets/images/SkillSlot.png');
        this.load.image("SkillFrame",'assets/images/SkillFrame.png');
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
