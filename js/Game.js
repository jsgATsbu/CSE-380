'use strict';

var LegendOfMeta = LegendOfMeta || {};

LegendOfMeta.Game = function(){};

LegendOfMeta.Game.prototype = {
    create: function() {
        this.createMap();
        this.createPlayer();

        this.game.physics.arcade.enable(this.player);
        this.game.camera.follow(this.player);
        this.setupInput();
    },

    createMap() {
        this.map = this.game.add.tilemap('test_map');
        this.map.addTilesetImage('test_tiles', 'test_tiles');

        this.background = this.map.createLayer('background');
        this.obstacles = this.map.createLayer('obstacles');
        this.background.resizeWorld();

        this.map.setCollisionBetween(1, 2000, true, 'obstacles');
    },

    createPlayer() {
        let playerObj = this.findObjectsByType('playerStart', this.map, 'objects')[0];
        this.player = this.game.add.sprite(playerObj.x, playerObj.y, 'test_sprites', 0);
        this.player.animations.add('test_sprites', null, 10, true);
        this.player.animations.stop();
    },

    findObjectsByType: function(type, map, layer) {
        let result = [];
        map.objects[layer].forEach(function(element) {
            element.properties.forEach(function(property) {
                if (property.name === "type" && property.value === type) {
                    //Phaser uses top left, Tiled bottom left so we have to adjust
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
        });
        return result;
    },

    setupInput: function() {
        const keyboard = this.game.input.keyboard;

        this.cursors = keyboard.createCursorKeys();
        this.altCursors = keyboard.addKeys({
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S,
            left: Phaser.KeyCode.A,
            right: Phaser.KeyCode.D
        });

        this.space = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.esc = keyboard.addKey(Phaser.KeyCode.ESC);
        this.one = keyboard.addKey(Phaser.KeyCode.ONE);
        this.two = keyboard.addKey(Phaser.KeyCode.TWO);
        this.three = keyboard.addKey(Phaser.KeyCode.THREE);
        this.four = keyboard.addKey(Phaser.KeyCode.FOUR);
    },

    update: function() {
        this.game.physics.arcade.collide(this.player, this.obstacles);

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

        let playerVelocity = this.player.body.velocity;
        if (up) {
            playerVelocity.y = -256;
        } else if (down) {
            playerVelocity.y = 256;
        } else {
            playerVelocity.y = 0;
        }

        if (left) {
            playerVelocity.x = -256;
        } else if (right) {
            playerVelocity.x = 256;
        } else {
            playerVelocity.x = 0;
        }

        if (playerVelocity.x === 0 && playerVelocity.y === 0) {
            this.player.animations.stop();
        } else {
            this.player.animations.play('test_tiles');
        }
    }
};
