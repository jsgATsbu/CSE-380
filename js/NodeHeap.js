"use strict";

/*
 * Binary heap for storing free nodes, adapted from http://eloquentjavascript.net/1st_edition/appendix2.html
 */
class NodeHeap {
    constructor() {
        this.content = [];
    }

    push(node) {
        this.content.push(node);
        this.bubbleUp(this.content.length - 1);
    }

    pop() {
        let result = this.content[0];
        let end = this.content.pop();

        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    }

    reset(node) {
        this.sinkDown(this.content.indexOf(node));
    }

    size() {
        return this.content.length;
    }

    bubbleUp(n) {
        let node = this.content[n];

        while (n > 0) {
            let parentIndex = Math.floor((n + 1) / 2) - 1;
            let parent = this.content[parentIndex];

            if (node.f >= parent.f) {
                break;
            }

            this.content[parentIndex] = node;
            this.content[n] = parent;
            n = parentIndex;
        }
    }

    sinkDown(n) {
        let length = this.content.length;
        let node = this.content[n];

        while (true) {
            let rightIndex = (n + 1) * 2;
            let leftIndex = rightIndex - 1;
            let swap = -1;

            let left;
            if (leftIndex < length) {
                left = this.content[leftIndex];
                if (left.f < node.f) {
                    swap = leftIndex;
                }
            }

            if (rightIndex < length) {
                let right = this.content[rightIndex];
                if (right.f < (swap < 0 ? node.f : left.f)) {
                    swap = rightIndex;
                }
            }

            if (swap < 0) {
                break;
            }

            this.content[n] = this.content[swap];
            this.content[swap] = node;
            n = swap;
        }
    }
}
