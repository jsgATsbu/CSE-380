"use strict";

const states = {
    NORMAL: 0,
    COMBAT: 1
};

class AI {

    constructor(monster, patrol, level) {
        this.monster = monster;
        this.patrol = patrol;
        this.path = patrol;

        this.level = level;
        this.pathfinding = level.pathfinding;
        this.state = states.NORMAL;

        this.__los = new Phaser.Line();  // line of sight; one line so we don't have to keep creating new ones either
    }

    update() {
        let monster = this.monster;
        let currentTile = this.level.map.getTileWorldXY(monster.x, monster.y);
        let playerTile = this.level.map.getTileWorldXY(this.level.player.x, this.level.player.y);

        if (this.state === states.NORMAL) {
            if (this.playerNearby() && this.scanForPlayer()) {
                this.state = states.COMBAT;
            } else {
                if (currentTile.x === this.path[0].x && currentTile.y === this.path[0].y) {
                    this.path.shift();
                }
                if (this.path.length === 0) {
                    this.patrol.push(this.patrol.shift());
                    this.path = this.pathfinding.findPath(currentTile, this.patrol[0]);
                }
            }
        }

        if (this.state === states.COMBAT) {
            if (this.playerNearby()) {
                this.path = this.pathfinding.findPath(currentTile, playerTile);
                if (currentTile.x === this.path[0].x && currentTile.y === this.path[0].y) {
                    this.path.shift();
                }
            } else {
                this.state = states.NORMAL;
                // approximate distance to waypoint using taxicab distance
                let distances = this.patrol.map(tile => Math.abs(tile.x - currentTile.x) + Math.abs(tile.y + currentTile.y));
                let next = Math.min(distances);
                while (this.patrol[0] !== next) {
                    this.patrol.push(this.patrol.shift());
                }
            }
        }

        if (monster.path.length !== 0) {
            let theta = Phaser.Math.angleBetween(playerTile.x, playerTile.y,
                                                 this.level.player.path[0].x, this.level.player.path[0].y);
            monster.body.velocity.x = monster.velocity * Math.cos(theta);
            monster.body.velocity.y = monster.velocity * Math.sin(theta);
            monster.rotation = theta + Math.PI / 2;
        } else {
            monster.body.velocity.x = 0;
            monster.body.velocity.y = 0;
            monster.animations.stop();
        }
    }

    scanForPlayer() {
        this.__los.start.set(this.monster.x, this.monster.y);
        this.__los.end.set(this.level.player.x, this.level.player.y);

        let layer = this.level.map.getLayer('blockedLayer');
        let hits = layer.getRayCastTiles(this.__los);
        return hits.length === 0;
    }

    playerNearby() {
        let distX = this.monster.x - this.level.player.x;
        let distY = this.monster.y - this.level.player.y;

        // want to know if player is in general vicinity, so use Euclidean distance
        let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        return dist <= 640;
    }
}