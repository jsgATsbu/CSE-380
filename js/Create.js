'use strict';

var createFields = function(obj){
    obj.countDown = 0;
    obj.tempSetting = null;
    obj.monsters = [];
    obj.game.sprites = [];
};

var createSkillSlot = function(obj){
    obj.skillSlot = obj.game.add.image(obj.game.camera.x+window.innerWidth/2-128,obj.game.camera.y+window.innerHeight*8/10, 'SkillSlot');
    obj.skillFrame = obj.game.add.image(obj.game.camera.x+window.innerWidth/2-128,obj.game.camera.y+window.innerHeight*8/10, 'SkillFrame');

    obj.skillSlot.fixedToCamera = true;
    obj.skillFrame.fixedToCamera = true;

    obj.currentSkill = 0;
};

var createMap = function(obj) {
    obj.map = obj.game.add.tilemap(obj.mapKey);
    obj.map.addTilesetImage('tiles', 'gameTiles');

    obj.backgroundlayer = obj.map.createLayer('backgroundLayer');
    obj.map.createLayer('roadLayer');
    obj.bulletLayer = obj.map.createLayer('bulletLayer');
    obj.blockedLayer = obj.map.createLayer('blockedLayer');
    obj.backgroundlayer.resizeWorld();

    obj.map.setCollisionBetween(1,2000,true,'bulletLayer')
    obj.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
};

var createPlayer = function(obj) {
    obj.player = createSprite(obj, obj.playerProperties);
    obj.player.abilities = [breakRock];
    obj.player.activeAbility = function() {};

    var weapon = obj.game.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 100;
    weapon.trackSprite(obj.player);
    obj.player.weapon = weapon;
};

var createMonsters = function(obj) {
    let properties = obj.monsterProperties;
    properties.forEach(function (pro) {
        obj.monsters.push(createSprite(obj, pro));
    }, obj);
};

var createSprite = function(obj, pro) {
    let foundObj = obj.findObjectsByType(pro.name, obj.map, 'objectsLayer')[0];
    let sprite = obj.game.add.sprite(foundObj.x + 32, foundObj.y + 32, pro.name);
    initializeStats(sprite, pro.atk, pro.def, pro.health, pro.spd);
    obj.game.sprites.push(sprite);

    obj.game.physics.arcade.enable(sprite);
    sprite.anchor.setTo(0.5,0.5);
    let barConfig = {width: 64, height: 8,
        bar:{color: '#46EF6E'}, bg:{color: 'black'},
        x: sprite.body.x,
        y: sprite.body.y - sprite.body.height * 2 / 3};
    sprite.healthBar = new HealthBar(obj.game, barConfig);
    sprite.healthBar.setAnchor(0.5,0.5);

    Object.keys(pro.animations).forEach(function (anim) {
        sprite.animations.add(anim, pro.animations[anim].frames, pro.animations[anim].frameRate, pro.animations[anim].loop);
    });
    sprite.animations.stop('walkFront', true);  // otherwise currentAnim will be the last one added

    sprite.body.immovable = true;

    return sprite;
}