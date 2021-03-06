'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Preload = function(){};

TheLegendOfMeta.Preload.prototype = {
    preload: function(){
        this.load.image('logo','assets/images/gui/logo.png');
        this.load.image('preloadBar','assets/images/gui/preloader-bar.png');
        this.load.image('mainMenuBG','assets/images/gui/menu_bg.png');
        this.load.image('preloadBG','assets/images/other/Black.png');
        this.load.image('selectLevelBG','assets/images/other/Black.png');
        this.load.image('settingBG','assets/images/other/Black.png');
        this.load.image('helpBG','assets/images/gui/help_bg.png');
        this.load.image('WinBG','assets/images/other/Black.png');
        this.load.image('LoseBG','assets/images/other/Black.png');
        this.load.image('FinalBG','assets/images/other/Black.png');

        this.load.image('Level-1','assets/images/gui/Level1.png');
        this.load.image('Level-2','assets/images/gui/Level2.png');
        this.load.image('Level-3','assets/images/gui/Level3.png');
        this.load.image('Level-4','assets/images/gui/Level4.png');
        this.load.image('Level-5','assets/images/gui/Level5.png');
        this.load.image('Level-6','assets/images/gui/Level6.png');

        this.load.image('pauseMenu','assets/images/gui/menu_paused.png');
        this.load.image('Black','assets/images/other/Black.png');
        this.load.image('Control','assets/images/gui/controls.png');
        this.load.image('SkillSlot1','assets/images/gui/SkillSlot1.png');
        this.load.image('SkillSlot2','assets/images/gui/SkillSlot2.png');
        this.load.image('SkillSlot3','assets/images/gui/SkillSlot3.png');
        this.load.image('SkillSlot4','assets/images/gui/SkillSlot4.png');
        this.load.image('SkillSlotBG', 'assets/images/gui/SkillSlotBG.png');
        this.load.image('gameTiles', 'assets/images/sprite/tiles.png');
        this.load.image('returnBtn','assets/images/gui/menu_return.png');
        this.load.image('bullet','assets/images/bullet/bullet.png');

        this.load.atlas('abilities', 'assets/images/atlases/abilities.png', 'assets/atlases/abilities.json');
        this.load.atlas('bullets', 'assets/images/atlases/bullets.png', 'assets/atlases/bullets.json');
        this.load.image('ice', 'assets/images/other/iced.png');

        this.load.audio('bgm1','assets/audios/1.ogg');
        this.load.audio('bgm2','assets/audios/2.ogg');
        this.load.audio('bgm3','assets/audios/3.ogg');
        this.load.audio('bgm4','assets/audios/4.ogg');
        this.load.audio('bgm5','assets/audios/5.ogg');
        this.load.audio('bgm6','assets/audios/6.ogg');

        this.load.audio('bat','assets/audios/bat.ogg');
        this.load.audio('feather','assets/audios/feather.ogg');
        this.load.audio('ice','assets/audios/ice.ogg');
        this.load.audio('fireball','assets/audios/fireball.ogg');
        this.load.audio('musicNote','assets/audios/musicNote.ogg');
        this.load.audio('attack','assets/audios/attack.ogg');
        this.load.audio('strength','assets/audios/strength.ogg');
        this.load.audio('strength_end','assets/audios/strength_end.ogg');

        this.load.audio('dead', 'assets/audios/dead.ogg');

        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level3', 'assets/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level4', 'assets/tilemaps/level4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level5', 'assets/tilemaps/level5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level6', 'assets/tilemaps/level6.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.spritesheet('heart','assets/images/sprite/heart.png',40,40);
        this.load.spritesheet('soulorb','assets/images/sprite/soulorb.png',40,40);
        this.load.spritesheet('player', 'assets/images/sprite/Meta_new.png',40,40);
        this.load.spritesheet('alien', 'assets/images/sprite/alien.png',64,64);
        this.load.spritesheet('dreadFace', 'assets/images/sprite/dreadFace.png',64,64);
        this.load.spritesheet('death', 'assets/images/sprite/death.png',64,64);
        this.load.spritesheet('firestone', 'assets/images/sprite/firestone.png',64,64);
        this.load.spritesheet('icegiant', 'assets/images/sprite/icegiant.png',64,64);
        this.load.spritesheet('harpy', 'assets/images/sprite/harpy.png',64,64);
        this.load.spritesheet('siren', 'assets/images/sprite/siren.png',64,64);
        this.load.spritesheet('vampire', 'assets/images/sprite/vampire.png',64,64);
        this.load.spritesheet('werewolf', 'assets/images/sprite/werewolf.png',64,64);
        this.load.spritesheet('worm', 'assets/images/sprite/worm.png',64,64);

        this.load.spritesheet('statue', 'assets/images/sprite/statue.png',64,64);

        this.load.spritesheet('startBtn','assets/images/gui/menu_start.png',256,128);
        this.load.spritesheet('selectLevelBtn','assets/images/gui/menu_select.png',256,128);
        this.load.spritesheet('settingBtn','assets/images/gui/menu_setting.png',256,128);
        this.load.spritesheet('helpBtn','assets/images/gui/menu_help.png',256,128);
        this.load.spritesheet('exitBtn','assets/images/gui/menu_exit.png',256,128);
        this.load.spritesheet('resumeBtn','assets/images/gui/menu_resume.png',256,128);
        this.load.spritesheet('titleBtn','assets/images/gui/menu_return.png',256,128);
        this.load.spritesheet('controlsBtn','assets/images/gui/menu_controls.png',256,128);
        this.load.spritesheet('mainmenuBtn','assets/images/gui/menu_mainmenu.png',256,128);
    },
    create: function(){
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'preloadBG');
        this.preloadBar = this.add.sprite(this.game.width/2,this.game.height*4/5,'preloadBar');
        this.preloadBar.anchor.setTo(0.5);

        var style1 = {font: "60px Arial", fill: "#fff", align: "center" };
        var style2 = { font: "30px Arial", fill: "#fff", align: "center" };
        var title = this.game.add.text(this.game.width/2,this.game.height/5,"The Legend Of Meta", style1);
        var tap = this.game.add.text(this.game.width/2,this.game.height*4/5+50, "Tap to Begin", style2);
        title.anchor.set(0.5);
        tap.anchor.set(0.5);
    },

    update: function(){
        if(this.game.input.activePointer.justPressed()){
            this.state.start("MainMenu");
        }
    }
};
