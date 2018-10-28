export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add({x, y}: Point) {
    return new Point(this.x + x, this.y + y);
  }

  substract({x, y}: Point) {
    return new Point(this.x - x, this.y - y);
  }

  distanceTo({x, y}: Point) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
  }
}
