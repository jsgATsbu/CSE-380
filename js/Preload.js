'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Preload = function(){};

TheLegendOfMeta.Preload.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.width/2,this.game.height*4/5,'preloadBar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tiles.png');
        this.load.spritesheet('playerSprite', 'assets/images/Meta.png',64,64);
        this.load.image('mainMenuBG','assets/images/MainMenu.png');

        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'preloadBG');
        var style1 = {font: "60px Arial", fill: "#000", align: "center" };
        var style2 = { font: "30px Arial", fill: "#000", align: "center" };
        var title = this.game.add.text(this.game.width/2,this.game.height/5,"The Legend Of Meta", style1);
        var tap = this.game.add.text(this.game.width/2,this.game.height*4/5+50, "Tap to Begin", style2);
        title.anchor.set(0.5);
        tap.anchor.set(0.5);

        this.inputEnabled = true;
        this.game.input.mouse.onMouseDown = function(event){
            this.game.state.start('MainMenu');
        }.bind(this);
    }
};
