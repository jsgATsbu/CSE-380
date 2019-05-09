"use strict";

const STATE = {
    PATROL: 0,
    COMBAT_MELEE: 1,
    COMBAT_RANGE: 2,
};

/*
 * Pathfinding improvements from https://gamedevacademy.org/how-to-use-pathfinding-in-phaser
 */
class AI {

    constructor(monster, patrolList, level) {
        this.monster = monster;
        this.level = level;

        this.state = STATE.PATROL;
        this.pathFinder = new Pathfinder(this.level.map);
        this.path = [];

        this.patrolList = patrolList;

        this.cooldown = 0;

        this._los = new Phaser.Line();  // line of sight; one line so we don't have to keep creating new ones
    }

    update() {
        let monster = this.monster;

        if (monster.stats.currentHealth <= 0) {              // Check if monster is dead first, if yes, no more updates
            monster.body.velocity.x = 0;
            monster.body.velocity.y = 0;
            monster.healthBar.kill();
            monster.animations.play("death", 3, false, true);

            this.level.addAbility(monster.ability);
            // this.level.addIcon(monster.x + 32, monster.y + 32, monster.ability);

            return;
        }

        let start = this.level.map.getTileWorldXY(this.monster.x, this.monster.y);

        if(this.state === STATE.PATROL) {
            if (this.playerNearby() && this.noBlockInBetween() && !this.level.player.invisible) {
                let dest = this.level.map.getTileWorldXY(this.level.player.x, this.level.player.y);     // Chase Player
                this.state = STATE.COMBAT_MELEE;
                this.path = this.pathFinder.findPath(start, dest);
            }
        }
        else{
            if(this.playerNearby() && this.noBlockInBetween() && !this.level.player.invisible) {
                let dest = this.level.map.getTileWorldXY(this.level.player.x, this.level.player.y);     // Chase Player
                this.path = this.pathFinder.findPath(start, dest);
            }
            else{
                let dest = this.level.map.getTile(this.patrolList[0][0], this.patrolList[0][1]);         // Patrol
                this.state = STATE.PATROL;
                this.path = this.pathFinder.findPath(start, dest);
            }
        }

        if(this.reachedTarget()){
            this.path.shift();
        }

        if(this.cooldown <= 0 && this.reachedPlayer()){
            this.monster.attack.call(this.monster, this.level.player);
            this.cooldown = 100;
        }
        else{
            this.cooldown--;
        }

        if(this.path.length === 0){
            let dest = this.level.map.getTile(this.patrolList[0][0], this.patrolList[0][1]);         // Patrol
            this.patrolList.push(this.patrolList.shift());
            this.path = this.pathFinder.findPath(start, dest);
        }

        if(this.path.length !== 0 && !this.reachedPlayer()) {
            this.moveMonToXY(this.path[0].worldX,this.path[0].worldY);
        }
    }

    moveMonToXY(x,y) {
        let speed = this.monster.stats.spd;

        if (x === this.monster.body.x) {
            this.monster.body.velocity.x = 0;
        } else {
            this.monster.body.velocity.x = (x > this.monster.body.x) ? speed : -1 * speed;
        }
        if (y === this.monster.body.y) {
            this.monster.body.velocity.y = 0;
        } else {
            this.monster.body.velocity.y = (y > this.monster.body.y) ? speed : -1 * speed;
        }
    }

    reachedTarget() {
        if (this.path.length === 0) return true;

        return Math.abs(this.monster.body.x - this.path[0].worldX) <= this.monster.stats.spd / 60 &&
            Math.abs(this.monster.body.y - this.path[0].worldY) <= this.monster.stats.spd / 60;
    }

    reachedPlayer() {
        let player = this.level.player;

        if (player.invisible) {
            return false;
        }

        let result = Math.abs(this.monster.x - player.x) <= 70 && Math.abs(this.monster.y - player.y) <= 70;
        return result;
    }

    noBlockInBetween() {
        this._los.start.set(this.monster.body.x, this.monster.body.y);
        this._los.end.set(this.level.player.body.x, this.level.player.body.y);

        let layer = this.level.blockedLayer;
        let tiles = layer.getRayCastTiles(this._los);
        let noBlock = true;

        tiles.forEach(function(tile) {
            if (tile.index !== -1) {
                noBlock = false;
            }
        });

        return noBlock;
    }

    playerNearby() {
        let distX = this.monster.body.x - this.level.player.body.x;
        let distY = this.monster.body.y - this.level.player.body.y;

        // want to know if player is in general vicinity, so use Euclidean distance
        let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        return dist <= 320;
    }
}