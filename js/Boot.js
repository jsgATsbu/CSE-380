"use strict";

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.Boot = function () {};

LegendOfMeta.Boot.prototype = {
    preload: function () {
        // TODO loading bar?
    },

    create: function () {
        this.game.stage.backgroundColor ='#fff';  // TODO background color?

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preload');
    }
};
