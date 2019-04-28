'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Preload = function(){};

TheLegendOfMeta.Preload.prototype = {
    preload: function(){
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'preloadBG');
        this.preloadBar = this.add.sprite(this.game.width/2,this.game.height*4/5,'preloadBar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level3', 'assets/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level4', 'assets/tilemaps/level4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level5', 'assets/tilemaps/level5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level6', 'assets/tilemaps/level6.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tiles.png');
        this.load.spritesheet('player', 'assets/images/Meta.png',64,64);
        this.load.spritesheet('alien', 'assets/images/alien.png',64,64);
        this.load.spritesheet('dreadFace', 'assets/images/dreadFace.png',64,64);
        this.load.spritesheet('startBtn','assets/images/menu_start.png',256,128);
        this.load.spritesheet('selectLevelBtn','assets/images/menu_select.png',256,128);
        this.load.spritesheet('settingBtn','assets/images/menu_setting.png',256,128);
        this.load.spritesheet('helpBtn','assets/images/menu_help.png',256,128);
        this.load.spritesheet('exitBtn','assets/images/menu_exit.png',256,128);
        this.load.spritesheet('resumeBtn','assets/images/menu_resume.png',256,128);
        this.load.spritesheet('titleBtn','assets/images/menu_return.png',256,128);
        this.load.image('returnBtn','assets/images/menu_return.png');
        this.load.image('bullet','assets/images/bullet.png');

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
