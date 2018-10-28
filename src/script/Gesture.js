"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pointer_1 = __importDefault(require("./Pointer"));
const Point_1 = __importDefault(require("./Point"));
class Gesture {
    constructor() {
        this.pointers = [];
        this.translateParams = new Point_1.default(0, 0);
        this._scaleParam = 1.0;
        this._brightnessParam = 1.0;
        this.prevPinchDistance = null;
        this.prevRotateAngle = null;
    }
    handlePointerEvent(event) {
        switch (event.type) {
            case 'pointerdown':
                this.handlePointerDown(event);
                break;
            case 'pointermove':
                this.handlePointerMove(event);
                break;
            case 'pointerup':
                this.handlePointerUp(event);
                break;
            case 'pointercancel':
                this.handlePointerCancel(event);
                break;
        }
    }
    handlePointerDown(event) {
        if (this.pointers.filter(item => item.id === event.pointerId).length === 0) {
            this.pointers.push(new Pointer_1.default(event));
        }
    }
    handlePointerMove(event) {
        const currentPointer = this.getPointer(event);
        if (currentPointer == null) {
            return;
        }
        else {
            // one pointer is active
            if (this.pointers.length === 1) {
                const newPoint = new Point_1.default(event.x, event.y);
                const delta = newPoint.substract(currentPointer.prevPoint);
                this.translateParams = this.translateParams.add(delta);
                // two pointers is active
            }
            else if (this.pointers.length === 2) {
                const secondPointer = this.pointers
                    .filter(pointer => pointer.id !== event.pointerId)[0];
                this.handlePinch(currentPointer, secondPointer);
                this.handleRotate(this.pointers[0], this.pointers[1]);
            }
            // update relevant pointer with event coordinates
            currentPointer.update(event);
        }
    }
    handlePointerUp(event) {
        this.releasePointer(event);
    }
    handlePointerCancel(event) {
        this.releasePointer(event);
    }
    releasePointer({ pointerId }) {
        this.pointers = this.pointers.filter(pointer => pointer.id !== pointerId);
        if (this.pointers.length < 2) {
            this.prevPinchDistance = null;
            this.prevRotateAngle = null;
        }
    }
    getPointer({ pointerId }) {
        const array = this.pointers.filter(pointer => pointer.id === pointerId);
        if (array.length === 1) {
            return array[0];
        }
        else if (array.length < 1) {
            return null;
        }
        else if (array.length > 1) {
            throw new Error('unique pointer was registered twice');
        }
    }
    handlePinch(currentPointer, secondPointer) {
        const newPinchDistance = currentPointer
            .prevPoint
            .distanceTo(secondPointer.prevPoint);
        if (this.prevPinchDistance) {
            const delta = newPinchDistance - this.prevPinchDistance;
            const initialWidth = 2560;
            const k = 5; // magic coefficient to make scale faster;
            const relativeSizeChange = k * delta / initialWidth;
            this.scaleParam += relativeSizeChange;
        }
        // update prevPinchDistance
        this.prevPinchDistance = newPinchDistance;
    }
    handleRotate(currentPointer, secondPointer) {
        const vector = currentPointer.prevPoint.substract(secondPointer.prevPoint);
        const newRotateAngle = Math.atan2(vector.y, vector.x);
        if (this.prevRotateAngle) {
            const delta = newRotateAngle - this.prevRotateAngle;
            const k = 0.2; // magic coefficient to slow change of brightness
            const angleChange = k * delta;
            this.brightnessParam += angleChange;
        }
        this.prevRotateAngle = newRotateAngle;
    }
    get scaleParam() {
        return this._scaleParam;
    }
    set scaleParam(value) {
        // check limits for the value
        if (value > 0.3 && value < 2) {
            this._scaleParam = value;
        }
    }
    get brightnessParam() {
        return this._brightnessParam;
    }
    set brightnessParam(value) {
        // check limits for the value
        if (value > 0.5 && value < 2) {
            this._brightnessParam = value;
        }
    }
}
exports.default = Gesture;
//# sourceMappingURL=Gesture.js.map