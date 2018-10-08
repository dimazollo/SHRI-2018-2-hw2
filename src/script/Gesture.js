import Pointer from "./Pointer"
import Point from './Point';

export default class Gesture {
  constructor() {
    this.pointers = [];
    this.translateParams = new Point({x: 0, y: 0});

    // this.sizeParams = new Point({x: 2560, y: 1600});
    this._scaleParams = 1.0;
    this._brightnessParams = 1.0;

    this.prevPinchDistance = null;
    this.prevRotateAngle = null;
  }

  handlePointerEvent(event) {
    switch (event.type) {
      case 'pointerdown': this.handlePointerDown(event); break;
      case 'pointermove': this.handlePointerMove(event); break;
      case 'pointerup': this.handlePointerUp(event); break;
      case 'pointercancel': this.handlePointerCancel(event); break;
    }
  }

  handlePointerDown(event) {
    if (this.pointers.filter(item => item.id === event.pointerId).length === 0) {
      this.pointers.push(new Pointer(event));
    }
  }

  handlePointerMove(event) {
    const currentPointer = this.getPointer(event);

    if (currentPointer == null) {
      // currentPointer.update(event);
      return;
    } else {

      if (this.pointers.length === 1) {
        const newPoint = new Point(event);
        const delta = newPoint.substract(currentPointer.prevPoint);
        this.translateParams = this.translateParams.add(delta);

      } else if (this.pointers.length === 2) {
        const secondPointer = this.pointers
          .filter(pointer => pointer.id !== event.pointerId)[0];

        this.handlePinch(currentPointer, secondPointer);

        // rotate
        this.handleRotate(currentPointer, secondPointer);
      }
      // update relevant pointer with event coordinates
      currentPointer.update(event);
    }
  }

  handlePointerUp(event) {
    this.releasePointer(event)
  }

  handlePointerCancel(event) {
    this.releasePointer(event)
  }

  releasePointer ({ pointerId }) {
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
    } else if (array.length < 1) {
      return null;
    } else if (array.length > 1) {
      throw new Error('unique pointer was registered twice');
    }
  }

  handlePinch(currentPointer, secondPointer) {
    const newPinchDistance = currentPointer
      .prevPoint.distanceTo(secondPointer.prevPoint);

    if (this.prevPinchDistance) {
      const delta = newPinchDistance - this.prevPinchDistance;
      const initialWidth = 2560;

      const k = 5; // magic coefficient to make scale faster;
      const relativeSizeChange = k * delta / initialWidth;

      this.scaleParams += relativeSizeChange;
    }
    // update prevPinchDistance
    this.prevPinchDistance = newPinchDistance;
  }

  handleRotate(currentPointer, secondPointer) {
    const vector = currentPointer.prevPoint.substract(secondPointer.prevPoint);
    const newRotateAngle = Math.atan2(vector.y, vector.x);

    if (this.prevRotateAngle) {
      const delta = newRotateAngle - this.prevRotateAngle;

      const k = 0.2;// magic coefficient to slow change of brightness
      this.brightnessParams += k * delta;
    }

    this.prevRotateAngle = newRotateAngle;
  }

  get scaleParams() {
    return this._scaleParams;
  }

  set scaleParams(value) {
    if (value > 0.3 && value < 2) {
      this._scaleParams = value;
    }
  }

  get brightnessParams() {
    return this._brightnessParams;
  }

  set brightnessParams(value) {
    if (value > 0.5 && value < 2) {
      this._brightnessParams = value;
    }
  }

}
