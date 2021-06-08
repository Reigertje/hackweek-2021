import * as Directions from "./directions";

class Point {
  constructor(x, y) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }

  getAdd(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  getNeighbour(direction) {
    const asVector = Directions.vector(direction);
    return new Point(this.x + asVector[0], this.y + asVector[1]);
  }
}

export default Point;
