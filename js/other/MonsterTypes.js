"use strict";

let meta = {
    spriteKey: "player",

    stats: {
        atk: 30,
        def: 15,
        health: 100,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [8, 9, 10, 11], frameRate: 5, loop: false },
        attackLeft: { frames: [12, 13, 14, 15], frameRate: 5, loop: false },
        attackRight: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackBack: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 3, loop: false },
        abilityFront: { frames: [28, 29, 30, 31], frameRate: 5, loop: false },
        abilityLeft: { frames: [32, 33, 34, 35], frameRate: 5, loop: false },
        abilityRight: { frames: [36, 37, 38, 39], frameRate: 5, loop: false },
        abilityBack: { frames: [40, 41, 42, 43], frameRate: 5, loop: false },
        buffWalkFront: { frames: [44, 45], frameRate: 5, loop: true },
        buffWalkLeft: { frames: [46, 47], frameRate: 5, loop: true },
        buffWalkRight: { frames: [48, 49], frameRate: 5, loop: true },
        buffWalkBack: { frames: [50, 51], frameRate: 5, loop: true },
        buffAttackFront: { frames: [52, 53, 54, 55], frameRate: 5, loop: false },
        buffAttackLeft: { frames: [56, 57, 58, 59], frameRate: 5, loop: false },
        buffAttackRight: { frames: [60, 61, 62, 63], frameRate: 5, loop: false },
        buffAttackBack: { frames: [64, 65, 66, 67], frameRate: 5, loop: false },
        buffAbilityFront: { frames: [68, 69, 70, 71], frameRate: 5, loop: false },
        buffAbilityLeft: { frames: [72, 73, 74, 75], frameRate: 5, loop: false },
        buffAbilityRight: { frames: [76, 77, 78, 79], frameRate: 5, loop: false },
        buffAbilityBack: { frames: [80, 81, 82, 83], frameRate: 5, loop: false }
    }
};

let alien = {
    spriteKey: "alien",

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 240
    },

    animations: {
        walkFront: { frames: [0, 4, 5, 6, 7], frameRate: 5, loop: true },
        walkLeft: { frames: [1, 8, 9, 10, 11], frameRate: 5, loop: true },
        walkRight: { frames: [2, 12, 13, 14, 15], frameRate: 5, loop: true },
        walkBack: { frames: [3, 16, 17, 18, 19], frameRate: 5, loop: true },
        attackFront: { frames: [0, 20, 21, 22, 23], frameRate: 20, loop: false },
        attackLeft: { frames: [1, 24, 25, 26, 27], frameRate: 20, loop: false },
        attackRight: { frames: [2, 28, 29, 30, 31], frameRate: 20, loop: false },
        attackBack: { frames: [3, 32, 33, 34, 35], frameRate: 20, loop: false },
        death: { frames: [36, 37, 38, 39], frameRate: 3, loop: false }
    },

    ability: invisibility
};

let dreadFace = {
    spriteKey: "dreadFace",

    stats: {
        atk: 20,
        def: 20,
        health: 120,
        spd: 200
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [0, 8, 9, 10, 11], frameRate: 20, loop: false },
        attackLeft: { frames: [2, 12, 13, 14, 15], frameRate: 20, loop: false },
        attackRight: { frames: [4, 16, 17, 18, 19], frameRate: 20, loop: false },
        attackBack: { frames: [6, 20, 21, 22, 23], frameRate: 20, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 3, loop: false }
    },

    ability: breakRock
};

let werewolf = {
    spriteKey: "werewolf",

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [8, 9, 10, 11], frameRate: 5, loop: false },
        attackLeft: { frames: [12, 13, 14, 15], frameRate: 5, loop: false },
        attackRight: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackBack: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 5, loop: false }
    },

    ability: strength
};

let harpy = {
    spriteKey: "harpy",

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1, 2, 3], frameRate: 5, loop: true },
        walkLeft: { frames: [4, 5, 6, 7], frameRate: 5, loop: true },
        walkRight: { frames: [8, 9, 10, 11], frameRate: 5, loop: true },
        walkBack: { frames: [12, 13, 14, 15], frameRate: 5, loop: true },
        attackFront: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackLeft: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        attackRight: { frames: [24, 25, 26, 27], frameRate: 5, loop: false },
        attackBack: { frames: [28, 29, 30, 31], frameRate: 5, loop: false },
        death: { frames: [32, 33, 34, 35], frameRate: 5, loop: false }
    },

    ability: feather
};

let iceGiant = {
    spriteKey: "icegiant",

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [8, 9, 10, 11], frameRate: 5, loop: false },
        attackLeft: { frames: [12, 13, 14, 15], frameRate: 5, loop: false },
        attackRight: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackBack: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 5, loop: false }
    },

    ability: freeze
};

let vampire = {
    spriteKey: "vampire",

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [8, 9, 10, 11], frameRate: 5, loop: false },
        attackLeft: { frames: [12, 13, 14, 15], frameRate: 5, loop: false },
        attackRight: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackBack: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 5, loop: false }
    },

    ability: lifeDrain
};

let death = {
    spriteKey: "death",

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [8, 9, 10, 11], frameRate: 5, loop: false },
        attackLeft: { frames: [12, 13, 14, 15], frameRate: 5, loop: false },
        attackRight: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackBack: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 5, loop: false }
    },

    // ability: poison
};

let fireStone = {
    spriteKey: 'fireStone',

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 400
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [2, 3], frameRate: 5, loop: true },
        walkRight: { frames: [4, 5], frameRate: 5, loop: true },
        walkBack: { frames: [6, 7], frameRate: 5, loop: true },
        attackFront: { frames: [8, 9, 10, 11], frameRate: 5, loop: false },
        attackLeft: { frames: [12, 13, 14, 15], frameRate: 5, loop: false },
        attackRight: { frames: [16, 17, 18, 19], frameRate: 5, loop: false },
        attackBack: { frames: [20, 21, 22, 23], frameRate: 5, loop: false },
        death: { frames: [24, 25, 26, 27], frameRate: 5, loop: false }
    },

    ability: fireball
};

let worm = {
    spriteKey: 'worm',

    stats: {
        atk: 50,
        def: 5,
        health: 60,
        spd: 0
    },

    animations: {
        walkFront: { frames: [0, 1], frameRate: 5, loop: true },
        walkLeft: { frames: [0, 1], frameRate: 5, loop: true },
        walkRight: { frames: [0, 1], frameRate: 5, loop: true },
        walkBack: { frames: [0, 1], frameRate: 5, loop: true },
        attackFront: { frames: [2, 3, 4, 5], frameRate: 5, loop: false },
        attackLeft: { frames: [6, 7, 8, 9], frameRate: 5, loop: false },
        attackRight: { frames: [10, 11, 12, 13], frameRate: 5, loop: false },
        attackBack: { frames: [14, 15, 16, 17], frameRate: 5, loop: false },
        death: { frames: [18, 19, 20, 21], frameRate: 5, loop: false }
    },

    ability: poison
};
