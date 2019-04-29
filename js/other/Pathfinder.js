"use strict";

class Pathfinder {
    constructor(map) {
        this.map = map;
    }

    /*
     * Algorithm from class with improvements from https://briangrinstead.com/blog/astar-search-algorithm-in-javascript-updated/
     */
    findPath(src, dest) {
        this.cleanMap();

        // let obstacle = this.map.getTile(dest.x, dest.y, 'obstacles');
        if (src === dest || dest === null || this.isObstacle(dest)) {  // if the destination is the player's current location or is inaccessible
            return [];
        }

        let openList = new NodeHeap();
        openList.push(src);
        src.g = 0;
        src.h = Pathfinder.findH(src, dest);
        src.parent = null;

        while (openList.size() !== 0) {
            let node = openList.pop();

            if (node.x === dest.x && node.y === dest.y) {
                return Pathfinder.findFinalPath(dest);
            }

            node.closed = true;

            let neighbors = this.getNeighbors(node);
            neighbors.forEach(function(neighbor) {
                let g = Pathfinder.findG(node, neighbor);
                let visited = neighbor.visited;

                if (!visited || g < neighbor.g) {
                    neighbor.visited = true;
                    neighbor.parent = node;

                    neighbor.g = g;
                    neighbor.h = Pathfinder.findH(neighbor, dest);
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!visited) {
                        openList.push(neighbor);
                    } else {
                        openList.reset(neighbor);
                    }
                }
            });
        }

        return [];
    }

    isObstacle(tile) {
        return this.map.getTile(tile.x, tile.y, 'blockedLayer') !== null || this.map.getTile(tile.x, tile.y, 'bulletLayer') !== null;
    }

    static findFinalPath(dest) {
        let result = [dest];
        let n = dest.parent;
        while (n.parent !== null) {
            result.splice(0, 0, n);
            n = n.parent;
        }

        return result;
    }

    cleanMap() {
        this.map.forEach(function(tile) {
            tile.visited = false;
            tile.closed = false;
            tile.parent = null;
        }, null, 0, 0, this.map.width, this.map.height);
    }

    getNeighbors(node) {
        let neighbors = [];

        let left = this.map.getTile(node.x - 1, node.y);
        let right = this.map.getTile(node.x + 1, node.y);
        let top = this.map.getTile(node.x, node.y - 1);
        let bottom = this.map.getTile(node.x, node.y + 1);

        let topLeft = this.map.getTile(node.x - 1, node.y - 1);
        let topRight = this.map.getTile(node.x + 1, node.y - 1);
        let bottomLeft = this.map.getTile(node.x - 1, node.y + 1);
        let bottomRight = this.map.getTile(node.x + 1, node.y + 1);

        if (left !== null && !left.closed && !this.isObstacle(left)) {
            neighbors.push(left);
        }
        if (right !== null && !right.closed && !this.isObstacle(right)) {
            neighbors.push(right);
        }
        if (top !== null && !top.closed && !this.isObstacle(top)) {
            neighbors.push(top);
        }
        if (bottom !== null && !bottom.closed && !this.isObstacle(bottom)) {
            neighbors.push(bottom);
        }

        // cannot move diagonally through obstacles
        if (topLeft !== null  && !topLeft.closed &&
            !this.isObstacle(topLeft) && !this.isObstacle(top) && !this.isObstacle(left)) {
            neighbors.push(topLeft);
        }
        if (topRight !== null  && !topRight.closed &&
            !this.isObstacle(topRight) && !this.isObstacle(top) && !this.isObstacle(right)) {
            neighbors.push(topRight);
        }
        if (bottomLeft !== null  && !bottomLeft.closed &&
            !this.isObstacle(bottomLeft) && !this.isObstacle(bottom) && !this.isObstacle(left)) {
            neighbors.push(bottomLeft);
        }
        if (bottomRight !== null  && !bottomRight.closed &&
            !this.isObstacle(bottomRight) && !this.isObstacle(bottom) && !this.isObstacle(right)) {
            neighbors.push(bottomRight);
        }

        return neighbors;
    }

    static findG(prev, next) {
        if (prev.x - next.x !== 0 && prev.y - next.y !== 0) {  // diagonal
            return prev.g + 1.4;
        } else {  // top, bottom, left, or right
            return prev.g + 1;
        }
    }

    static findH(node, dest) {
        return Math.abs(dest.x - node.x) + Math.abs(dest.y - node.y);
    }
}
