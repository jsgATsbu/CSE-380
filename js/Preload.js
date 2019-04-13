var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Preload = function(){};

TheLegendOfMeta.Preload.prototype = {
    preload: function(){
        this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'preloadBar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/tiles.png');
        this.load.spritesheet('player', 'assets/images/Meta.png',64,64);

    },
    create: function(){
        this.state.start('MainMenu');
    }
};