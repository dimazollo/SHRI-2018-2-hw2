export default class Point {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
  }

  add ({x, y}) {
    return new Point({x: this.x + x, y: this.y + y});
  }

  substract ({x, y}) {
    return new Point({x: this.x - x, y: this.y - y});
  }

  distanceTo ({x, y}) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
  }
}
