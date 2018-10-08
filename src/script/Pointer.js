import Point from './Point';

export default class Pointer {
  // TODO - maybe should use { offsetX, offsetY } together or instead
  constructor ({x, y, pointerId}) {
    this.id = pointerId;
    this.startPoint = new Point({x, y});
    this.prevPoint = new Point({x, y});
    this.prevTs = Date.now();
  }

  update({x, y, pointerId}) {
    if (this.id === pointerId) {
      this.prevPoint = new Point({x, y});
      this.prevTs = Date.now();
    }
  }
}
