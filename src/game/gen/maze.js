import * as Directions from "./directions";
import Grid from "./grid";

const EMPTY = " ";
const WALL = "▓";

class Maze extends Grid {
  constructor(width, height) {
    super(width, height);
    this.fill(0);
  }

  addPassage(point, direction) {
    this.data[this.pointIndex(point)] |= direction;
    const destination = point.getNeighbour(direction);
    if (this.pointInBounds(destination)) {
      this.data[this.pointIndex(destination)] |= Directions.invert(direction);
    }
  }

  toString() {
    let str = "";
    for (let y = this.height - 1; y >= 0; --y) {
      for (let yn = 0; yn < 3; ++yn) {
        let line = "";
        for (let x = 0; x < this.width; ++x) {
          const c = this.at(x, y);
          if (yn === 0) {
            line += WALL + (c & Directions.UP ? EMPTY : WALL) + WALL;
          } else if (yn === 1) {
            line +=
              (c & Directions.LEFT ? EMPTY : WALL) +
              EMPTY +
              (c & Directions.RIGHT ? EMPTY : WALL);
          } else {
            line += WALL + (c & Directions.DOWN ? EMPTY : WALL) + WALL;
          }
        }
        str += line + "\n";
      }
    }
    return str;
  }
}

export default Maze;
