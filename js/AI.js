"use strict";

const states = {
    NORMAL: 0,
    COMBAT: 1
};

/*
 * Pathfinding improvements from https://gamedevacademy.org/how-to-use-pathfinding-in-phaser
 */
class AI {

    constructor(monster, patrol, level) {
        this.monster = monster;
        this.patrol = patrol;
        this.path = [];

        this.level = level;
        this.game = level.game;
        this.pathfinding = level.pathfinding;
        this.state = states.NORMAL;

        this._los = new Phaser.Line();  // line of sight; one line so we don't have to keep creating new ones
    }

    update() {
        let monster = this.monster;
        let currentTile = this.level.map.getTileWorldXY(monster.x, monster.y);
        let playerTile = this.level.map.getTileWorldXY(this.level.player.x, this.level.player.y);

        if (this.state === states.NORMAL) {
            if (this.playerNearby() && this.scanForPlayer()) {
                this.state = states.COMBAT;
            } else {
                if (this.path.length !== 0 && this.reachedTarget()) {
                    this.path.shift();
                }
                if (this.path.length === 0) {
                    let dest = this.level.map.getTile(this.patrol[0][0], this.patrol[0][1]);
                    this.path = this.pathfinding.findPath(currentTile, dest);
                    this.patrol.push(this.patrol.shift());
                }
            }
        }

        if (this.state === states.COMBAT) {
            if (this.playerNearby()) {
                this.path = this.pathfinding.findPath(currentTile, playerTile);
                if (this.reachedTarget()) {
                    this.path.shift();
                }
            } else {
                this.state = states.NORMAL;
                // approximate distance to waypoint using taxicab distance
                let distances = this.patrol.map(point => Math.abs(point[0] - currentTile.x) + Math.abs(point[1] + currentTile.y));
                let minIndex = distances.indexOf(Math.min(...distances));
                let min = this.patrol[minIndex];
                while (this.patrol[0] !== min) {
                    this.patrol.push(this.patrol.shift());
                }
            }
        }

        if (this.path.length !== 0) {
            let targetX = this.path[0].worldX + this.path[0].centerX;
            let targetY = this.path[0].worldY + this.path[0].centerY;
            this.game.physics.arcade.moveToXY(this.monster, targetX, targetY, this.monster.stats.spd);
        } else {
            monster.body.velocity.x = 0;
            monster.body.velocity.y = 0;
            monster.animations.stop();
        }
    }

    reachedTarget() {
        if (this.path.length === 0) return true;

        return Math.abs(this.monster.x - (this.path[0].worldX + this.path[0].centerX)) < 4 &&
               Math.abs(this.monster.y - (this.path[0].worldY + this.path[0].centerY)) < 4;
    }

    scanForPlayer() {
        this._los.start.set(this.monster.x, this.monster.y);
        this._los.end.set(this.level.player.x, this.level.player.y);

        let layer = this.level.blockedLayer;
        let tiles = layer.getRayCastTiles(this._los);
        let hit = false;
        tiles.forEach(function(tile) {
            if (tile.index !== -1) {
                hit = true;
            }
        });

        return hit;
    }

    playerNearby() {
        let distX = this.monster.x - this.level.player.x;
        let distY = this.monster.y - this.level.player.y;

        // want to know if player is in general vicinity, so use Euclidean distance
        let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        return dist <= 320;
    }
}