"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add({ x, y }) {
        return new Point(this.x + x, this.y + y);
    }
    substract({ x, y }) {
        return new Point(this.x - x, this.y - y);
    }
    distanceTo({ x, y }) {
        return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    }
}
exports.default = Point;
//# sourceMappingURL=Point.js.map