'use strict';

var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Game = function() {};

TheLegendOfMeta.Game.prototype = {
    create: function() {
        this.createMap();
        this.createPlayer();

        this.game.camera.follow(this.playerSprite);
        this.setupInput();
    },

    createMap() {
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tiles', 'gameTiles');

        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        this.backgroundlayer.resizeWorld();

        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
    },

    createPlayer() {
        let playerObj = this.findObjectsByType('playerStart', this.map, 'objectsLayer')[0];
        this.playerSprite = this.game.add.sprite(playerObj.x, playerObj.y, 'playerSprite');

        this.game.physics.arcade.enable(this.playerSprite);
        this.playerSprite.anchor.setTo(0.5,0.5);
        this.playerSpeed = 400;
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

        this.space.onDown.add(function() {
            // TODO
        });

        this.esc.onDown.add(function() {
            // TODO
        });

        this.one.onDown.add(function() {
            // TODO
        });

        this.two.onDown.add(function() {
            // TODO
        });

        this.three.onDown.add(function() {
            // TODO
        });

        this.four.onDown.add(function() {
            // TODO
        });
    },

    update: function() {
        this.game.physics.arcade.collide(this.playerSprite, this.blockedLayer);

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

        let playerSpeed = this.playerSpeed;
        if (up) {
            this.playerSprite.body.velocity.y = -playerSpeed;
        } else if (down) {
            this.playerSprite.body.velocity.y = playerSpeed;
        } else {
            this.playerSprite.body.velocity.y = 0;
        }

        if (left) {
            this.playerSprite.body.velocity.x = -playerSpeed;
        } else if (right) {
            this.playerSprite.body.velocity.x = playerSpeed;
        } else {
            this.playerSprite.body.velocity.x = 0;
        }
    }
};
