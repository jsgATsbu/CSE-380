'use strict';

var createText = function(level) {
    if(level.mapKey === 'level5') {
        let text = "Number of Soul orb left: " + level.soulorbs.children.length;
        let style = {font: "32px Arial", fill: "#f26c4f", align: "center"};
        level.lvl5Text = level.game.add.text(32, 32, text, style);
        level.lvl5Text.fixedToCamera = true;
        level.lvl5Text.cameraOffset.setTo(window.innerWidth - 500, 100);
    }

    level.skillText = level.game.add.text(level.skillSlot.x, level.skillSlot.y - 30,
        "", {font: "20px Arial", fill: "#f26c4f", align: "center"});
    level.skillText.fixedToCamera = true;
};

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
};

var createCollectable = function(level){
    let map = level.map;
    let layer = 'objectsLayer';
    level.collectables = level.game.add.group();
    level.collectables.enableBody = true;
    level.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    level.soulorbs = level.game.add.group();
    level.soulorbs.enableBody = true;
    level.soulorbs.physicsBodyType = Phaser.Physics.ARCADE;

    map.objects[layer].forEach(function(element) {
        if (element.type === 'heart') {
            let h = level.collectables.create(element.x + 32,element.y-16,'heart');
            h.anchor.setTo(0.5);
        }
        else if (element.type === 'soulorb') {
            let h = level.soulorbs.create(element.x + 32,element.y-16,'soulorb');
            h.anchor.setTo(0.5);
        }
    });
};

var setupAbilities = function(level){
    level.player.abilities = level.defaultAbilities.slice(0);  // shallow copy
    level.player.charges = level.defaultAbilities.map(ability => ability === null ? null : 999);

    level.player.activeAbilityIndex = 0;
    level.player.activeAbility = level.player.abilities[0];
    level.player.weapon.bulletFrame = level.player.activeAbility.bullet;

    let bg = level.game.add.image(level.game.camera.x + window.innerWidth/2 - 128,
                                  level.game.camera.y + window.innerHeight * 8/10,
                                  'SkillSlotBG');
    bg.fixedToCamera = true;

    level.skillSlot = level.game.add.image(level.game.camera.x + window.innerWidth/2 - 128,
                                           level.game.camera.y + window.innerHeight * 8/10,
                                           'SkillSlot1');
    level.skillSlot.fixedToCamera = true;

    level.skillIcons = [];
    for (let i = 0; i < level.defaultAbilities.length; i++) {
        if (level.defaultAbilities[i] === null) {
            level.skillIcons[i] = null;
        } else {
            // 61 not 64 because of the way the frame is designed
            level.skillIcons[i] = level.game.add.image(window.innerWidth / 2 + (-128 + 61 * i) + 5,
                                                       window.innerHeight * 8 / 10 + 5,
                                                       'abilities', level.defaultAbilities[i].name);
            level.skillIcons[i].inputEnabled = true;
            level.skillIcons[i].fixedToCamera = true;
            level.skillIcons[i].moveDown();
        }
    }

    level.chargesText = [null, null, null, null];
};

var createMap = function(level) {
    level.map = level.game.add.tilemap(level.mapKey);
    level.map.addTilesetImage('tiles', 'gameTiles');

    level.backgroundLayer = level.map.createLayer('backgroundLayer');
    if(level.map.getLayerIndex('roadLayer') !== null)
        level.roadLayer = level.map.createLayer('roadLayer');
    level.bulletLayer = level.map.createLayer('bulletLayer');
    level.blockedLayer = level.map.createLayer('blockedLayer');
    if(level.map.getLayerIndex('extraLayer') !== null) {
        level.extraLayer = level.map.createLayer('extraLayer');
        level.map.setCollisionBetween(1, 2000, true, 'extraLayer');
    }

    level.backgroundLayer.resizeWorld();

    level.map.setCollisionBetween(1,2000,true,'bulletLayer');
    level.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
};

var createPlayer = function(level) {
    level.player = createSprite(level, level.playerProperties,level.playerProperties.name);

    var weapon = level.game.add.weapon(-1, 'bullets');
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
    properties.forEach(function (monProperty) {
        for(let i=0;i<monProperty.ai.length;i++) {
            let monName = monProperty.type.spriteKey + (i+1);
            let mon = createSprite(level, monProperty,monName);
            mon.ai = new AI(mon, monProperty.ai[i], this);
            level.monsters.push(mon);
        }
    }, level);
};

var createSprite = function(level, properties, name) {
    let type = properties.type;

    let results = level.findObjectsByType(type.spriteKey, level.map, 'objectsLayer');
    let found = results.find(function(obj) {
        return obj.name === name;
    });

    if(found === undefined){
        console.log(name);
    }

    let sprite = level.game.add.sprite(found.x + 32, found.y - 32, type.spriteKey);
    initializeStats(sprite, type.stats);
    level.game.sprites.push(sprite);

    /// For debugging
    sprite.spriteName = name;
    sprite.spriteType = type;

    level.game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.anchor.setTo(0.5,0.5);
    let barConfig = {
        width: 64, height: 8,
        bar: { color: '#46EF6E' }, bg: { color: 'black' },
        x: sprite.body.x,
        y: sprite.body.y - sprite.body.height * 2 / 3
    };
    sprite.healthBar = new HealthBar(level.game, barConfig);
    sprite.healthBar.setAnchor(0.5,0.5);
    sprite.healthBar.config.animationDuration = 1;

    Object.keys(type.animations).forEach(function(anim) {
        sprite.animations.add(anim, type.animations[anim].frames, type.animations[anim].frameRate, type.animations[anim].loop);
    });
    sprite.animations.stop('walkFront', true);  // otherwise currentAnim will be the last one added

    sprite.ability = type.ability;

    sprite.body.immovable = true;

    return sprite;
};

var initializeStats = function(sprite, stats){
    sprite.stats = {};
    sprite.stats.atk = stats.atk;
    sprite.stats.def = stats.def;
    sprite.stats.currentHealth = stats.health;
    sprite.stats.maxHealth = stats.health;
    sprite.stats.spd = stats.spd;

    sprite.attack = function(enemy) {
        let diffX = enemy.x - sprite.x;
        let diffY = enemy.y - sprite.y;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                if(sprite.strengthened !== undefined && sprite.strengthened){
                    sprite.animations.play('buffAttackRight')
                }
                else
                    sprite.animations.play('attackRight');
            } else {
                if(sprite.strengthened !== undefined && sprite.strengthened){
                    sprite.animations.play('buffAttackLeft')
                }
                else
                    sprite.animations.play('attackLeft');
            }
        } else {
            if (diffY > 0) {
                if(sprite.strengthened !== undefined && sprite.strengthened){
                    sprite.animations.play('buffAttackFront')
                }
                else
                    sprite.animations.play('attackFront');
            } else {
                if(sprite.strengthened !== undefined && sprite.strengthened){
                    sprite.animations.play('buffAttackBack')
                }
                else
                    sprite.animations.play('attackBack');
            }
        }

        let last = sprite.animations.currentAnim;
        sprite.animations.currentAnim.onComplete.addOnce(function() {
            sprite.animations.play(last);
        },this);

        let dmg = sprite.stats.atk - enemy.stats.def;
        if(enemy.stats.currentHealth > 0 && !enemy.invincible){
            enemy.stats.currentHealth -= dmg;
        }
    };
};
