var TheLegendOfMeta = TheLegendOfMeta || {};

TheLegendOfMeta.Game = function(){};

TheLegendOfMeta.Game.prototype = {
    create: function() {
        this.map = this.game.add.tilemap('level1');

        // First parameter = name of image in json file, 2nd is the key of preloaded image. Check Preload
        this.map.addTilesetImage('tiles', 'gameTiles');

        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        this.playerSpeed = 400;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        this.player.anchor.setTo(0.5,0.5);
    },
    findObjectsByType: function(type, map, layer) {
        var result = [];
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
            else if(Array.isArray(element.properties) && element.properties[0].value === type){
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.blockedLayer);

        this.player.body.velocity.x = 0;

        if(this.cursors.up.isDown) {
            if(this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= this.playerSpeed;
        }
        else if(this.cursors.down.isDown) {
            if(this.player.body.velocity.y == 0)
                this.player.body.velocity.y += this.playerSpeed;
        }
        else {
            this.player.body.velocity.y = 0;
        }
        if(this.cursors.left.isDown) {
            this.player.body.velocity.x -= this.playerSpeed;
        }
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x += this.playerSpeed;
        }
    },
};