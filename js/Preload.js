'use strict';

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.Preload = function(){};

LegendOfMeta.Preload.prototype = {
    preload: function() {
        // TODO loading bar?

        // TODO load levels
        // TODO load sprites
    },

    create: function() {
        this.state.start('Game');
    }
};
