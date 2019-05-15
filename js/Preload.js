'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Preload = function(){};

TheLegendOfMeta.Preload.prototype = {
    preload: function(){
        this.load.image('logo','assets5/images/gui/logo.png');
        this.load.image('preloadBar','assets5/images/gui/preloader-bar.png');
        this.load.image('mainMenuBG','assets5/images/gui/menu_bg.png');
        this.load.image('preloadBG','assets5/images/other/Black.png');
        this.load.image('selectLevelBG','assets5/images/other/Black.png');
        this.load.image('settingBG','assets5/images/other/Black.png');
        this.load.image('helpBG','assets5/images/gui/help_bg.png');
        this.load.image('WinBG','assets5/images/other/Black.png');
        this.load.image('LoseBG','assets5/images/other/Black.png');
        this.load.image('FinalBG','assets5/images/other/Black.png');

        this.load.image('Level-1','assets5/images/gui/Level1.png');
        this.load.image('Level-2','assets5/images/gui/Level2.png');
        this.load.image('Level-3','assets5/images/gui/Level3.png');
        this.load.image('Level-4','assets5/images/gui/Level4.png');
        this.load.image('Level-5','assets5/images/gui/Level5.png');
        this.load.image('Level-6','assets5/images/gui/Level6.png');

        this.load.image('pauseMenu','assets5/images/gui/menu_paused.png');
        this.load.image('Black','assets5/images/other/Black.png');
        this.load.image('Control','assets5/images/gui/controls.png');
        this.load.image('SkillSlot1','assets5/images/gui/SkillSlot1.png');
        this.load.image('SkillSlot2','assets5/images/gui/SkillSlot2.png');
        this.load.image('SkillSlot3','assets5/images/gui/SkillSlot3.png');
        this.load.image('SkillSlot4','assets5/images/gui/SkillSlot4.png');
        this.load.image('SkillSlotBG', 'assets5/images/gui/SkillSlotBG.png');
        this.load.image('gameTiles', 'assets5/images/sprite/tiles.png');
        this.load.image('returnBtn','assets5/images/gui/menu_return.png');
        this.load.image('bullet','assets5/images/bullet/bullet.png');

        this.load.atlas('abilities', 'assets5/images/atlases/abilities.png', 'assets5/atlases/abilities.json');
        this.load.atlas('bullets', 'assets5/images/atlases/bullets.png', 'assets5/atlases/bullets.json');
        this.load.image('ice', 'assets5/images/other/iced.png');

        this.load.audio('bgm1','assets5/audios/1.ogg');
        this.load.audio('bgm2','assets5/audios/2.ogg');
        this.load.audio('bgm3','assets5/audios/3.ogg');
        this.load.audio('bgm4','assets5/audios/4.ogg');
        this.load.audio('bgm5','assets5/audios/5.ogg');
        this.load.audio('bgm6','assets5/audios/6.ogg');

        this.load.audio('bat','assets5/audios/bat.ogg');
        this.load.audio('feather','assets5/audios/feather.ogg');
        this.load.audio('ice','assets5/audios/ice.ogg');
        this.load.audio('fireball','assets5/audios/fireball.ogg');
        this.load.audio('musicNote','assets5/audios/musicNote.ogg');
        this.load.audio('attack','assets5/audios/attack.ogg');
        this.load.audio('strength','assets5/audios/strength.ogg');
        this.load.audio('strength_end','assets5/audios/strength_end.ogg');

        this.load.audio('dead', 'assets5/audios/dead.ogg');

        this.load.tilemap('level1', 'assets5/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets5/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level3', 'assets5/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level4', 'assets5/tilemaps/level4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level5', 'assets5/tilemaps/level5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level6', 'assets5/tilemaps/level6.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.spritesheet('heart','assets5/images/sprite/heart.png',40,40);
        this.load.spritesheet('soulorb','assets5/images/sprite/soulorb.png',40,40);
        this.load.spritesheet('player', 'assets5/images/sprite/Meta_new.png',40,40);
        this.load.spritesheet('alien', 'assets5/images/sprite/alien.png',64,64);
        this.load.spritesheet('dreadFace', 'assets5/images/sprite/dreadFace.png',64,64);
        this.load.spritesheet('death', 'assets5/images/sprite/death.png',64,64);
        this.load.spritesheet('firestone', 'assets5/images/sprite/firestone.png',64,64);
        this.load.spritesheet('icegiant', 'assets5/images/sprite/icegiant.png',64,64);
        this.load.spritesheet('harpy', 'assets5/images/sprite/harpy.png',64,64);
        this.load.spritesheet('siren', 'assets5/images/sprite/siren.png',64,64);
        this.load.spritesheet('vampire', 'assets5/images/sprite/vampire.png',64,64);
        this.load.spritesheet('werewolf', 'assets5/images/sprite/werewolf.png',64,64);
        this.load.spritesheet('worm', 'assets5/images/sprite/worm.png',64,64);

        this.load.spritesheet('statue', 'assets5/images/sprite/statue.png',64,64);

        this.load.spritesheet('startBtn','assets5/images/gui/menu_start.png',256,128);
        this.load.spritesheet('selectLevelBtn','assets5/images/gui/menu_select.png',256,128);
        this.load.spritesheet('settingBtn','assets5/images/gui/menu_setting.png',256,128);
        this.load.spritesheet('helpBtn','assets5/images/gui/menu_help.png',256,128);
        this.load.spritesheet('exitBtn','assets5/images/gui/menu_exit.png',256,128);
        this.load.spritesheet('resumeBtn','assets5/images/gui/menu_resume.png',256,128);
        this.load.spritesheet('titleBtn','assets5/images/gui/menu_return.png',256,128);
        this.load.spritesheet('controlsBtn','assets5/images/gui/menu_controls.png',256,128);
        this.load.spritesheet('mainmenuBtn','assets5/images/gui/menu_mainmenu.png',256,128);
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
