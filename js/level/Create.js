'use strict';

var createSound = function(level){
    level.bgm = level.game.add.audio(level.music,1,true);
    level.bgm.play();
    level.state.onStateChange.add(function(){
        level.bgm.stop();
    },this);
};

var createFields = function(level){
    level.countDown = 0;
    level.tempSetting = null;
    level.monsters = [];
    level.game.sprites = [];
    // level.icons = [];
};

var createSkillSlot = function(level){
    level.skillSlot = level.game.add.image(level.game.camera.x+window.innerWidth/2-128,level.game.camera.y+window.innerHeight*8/10, 'SkillSlot');
    level.skillFrame = level.game.add.image(level.game.camera.x+window.innerWidth/2-128,level.game.camera.y+window.innerHeight*8/10, 'SkillFrame');

    level.skillSlot.fixedToCamera = true;
    level.skillFrame.fixedToCamera = true;

    level.currentSkill = 0;
};

var createMap = function(level) {
    level.map = level.game.add.tilemap(level.mapKey);
    level.map.addTilesetImage('tiles', 'gameTiles');

    level.backgroundlayer = level.map.createLayer('backgroundLayer');
    if(level.map.getLayerIndex('roadLayer') !== null)
        level.map.createLayer('roadLayer');
    level.bulletLayer = level.map.createLayer('bulletLayer');
    level.blockedLayer = level.map.createLayer('blockedLayer');
    level.backgroundlayer.resizeWorld();

    level.map.setCollisionBetween(1,2000,true,'bulletLayer');
    level.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
};

var createPlayer = function(level) {
    level.player = createSprite(level, level.playerProperties);
    level.player.abilities = [];
    level.player.activeAbility = function() {};

    var weapon = level.game.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 100;
    weapon.trackSprite(level.player);
    level.player.weapon = weapon;
    level.game.camera.follow(level.player);
};

var createMonsters = function(level) {
    let properties = level.monsterProperties;
    if(properties === undefined){
        return;
    }
    properties.forEach(function (pro) {
        let mon = createSprite(level, pro);
        mon.ai = new AI(mon, pro.ai.patrol, this);
        level.monsters.push(mon);
    }, level);
};

var createSprite = function(level, properties) {
    let foundObj = level.findObjectsByType(properties.name, level.map, 'objectsLayer')[0];
    let sprite = level.game.add.sprite(foundObj.x + 32, foundObj.y + 32, properties.name);
    initializeStats(sprite, properties.atk, properties.def, properties.health, properties.spd);
    level.game.sprites.push(sprite);

    level.game.physics.arcade.enable(sprite);
    sprite.anchor.setTo(0.5,0.5);
    let barConfig = {
        width: 64, height: 8,
        bar: { color: '#46EF6E' }, bg: { color: 'black' },
        x: sprite.body.x,
        y: sprite.body.y - sprite.body.height * 2 / 3
    };
    sprite.healthBar = new HealthBar(level.game, barConfig);
    sprite.healthBar.setAnchor(0.5,0.5);

    Object.keys(properties.animations).forEach(function (anim) {
        sprite.animations.add(anim, properties.animations[anim].frames, properties.animations[anim].frameRate, properties.animations[anim].loop);
    });
    sprite.animations.stop('walkFront', true);  // otherwise currentAnim will be the last one added

    sprite.ability = properties.ability;

    sprite.body.immovable = true;

    return sprite;
};