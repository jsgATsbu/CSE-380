"use strict";

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Boot = function(){};

TheLegendOfMeta.Boot.prototype = {
    create: function () {
        this.game.stage.backgroundColor = '#fff';

        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preload');
    }
};
