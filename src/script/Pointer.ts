import Point from './Point';

export default class Pointer {
  // TODO - maybe should use { offsetX, offsetY } together or instead
  id: number;
  startPoint: Point;
  prevPoint: Point;
  prevTs: number;

  constructor ({x, y, pointerId}: PointerEvent) {
    this.id = pointerId;
    this.startPoint = new Point(x, y);
    this.prevPoint = new Point(x, y);
    this.prevTs = Date.now();
  }

  update({x, y, pointerId}: PointerEvent) {
    if (this.id === pointerId) {
      this.prevPoint = new Point(x, y);
      this.prevTs = Date.now();
    }
  }
}
