'use strict';

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.Preload = function(){};

LegendOfMeta.Preload.prototype = {
    preload: function() {
        // TODO loading bar?

        this.load.tilemap('test_map', 'assets/maps/test_map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('test_tiles', 'assets/images/test_tiles.png');
        this.load.spritesheet('test_sprites', 'assets/images/test_sprite.png', 128, 128);
    },

    create: function() {
        this.state.start('Game');
    }
};
