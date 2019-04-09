'use strict';

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.Game = function(){};

LegendOfMeta.Game.prototype = {
    create: function() {
        // TODO load levels
        // TODO load tilesets
        // TODO create layers

        // TODO create game objects

        // this.game.camera.follow(this.player);  // TODO camera?

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.altCursors = this.game.addKeys({
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S,
            left: Phaser.KeyCode.A,
            right: Phaser.KeyCode.D
        });
    },

    /*findObjectsByType: function(type, map, layer) {
          let result = [];
          map.objects[layer].forEach(function(element) {
              if (element.properties.type === type) {
                  // Phaser uses top left, Tiled bottom left so we have to adjust
                  element.y -= map.tileHeight;
                  result.push(element);
              }
          });
          return result;
    },*/

    update: function() {
        // TODO collision

        // TODO movement
        /*
        let cursors = this.cursors;
        let altCursors = this.altCursors;

        let up = cursors.up.isDown || altCursors.up.isDown;
        let down = cursors.down.isDown || altCursors.down.isDown;
        if (up && down) {
            up = false;
            down = false;
        }

        let left = cursors.left.isDown || altCursors.left.isDown;
        let right = cursors.right.isDown || altCursors.right.isDown;
        if (left && right) {
            left = false;
            right = false;
        }

        if (up) {
            this.player.body.velocity.y -= 50;
        } else if (down) {
            this.player.body.velocity.y += 50;
        } else {
            this.player.body.velocity.y = 0;
        }

        if (left) {
            this.player.body.velocity.x -= 50;
        } else if (right) {
            this.player.body.velocity.x += 50;
        } else {
            this.player.body.velocity.x = 0;
        }*/
    }
};
