"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("./Point"));
class Pointer {
    constructor({ x, y, pointerId }) {
        this.id = pointerId;
        this.startPoint = new Point_1.default(x, y);
        this.prevPoint = new Point_1.default(x, y);
        this.prevTs = Date.now();
    }
    update({ x, y, pointerId }) {
        if (this.id === pointerId) {
            this.prevPoint = new Point_1.default(x, y);
            this.prevTs = Date.now();
        }
    }
}
exports.default = Pointer;
//# sourceMappingURL=Pointer.js.map