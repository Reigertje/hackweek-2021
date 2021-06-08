import Grid from "./grid";
import Point from "./point";

class Level extends Grid {
  constructor(mazeWidth, mazeHeight, templateWidth, templateHeight) {
    super(mazeWidth * templateWidth, mazeHeight * templateHeight);

    this.mazeWidth = mazeWidth;
    this.mazeHeight = mazeHeight;
    this.templateWidth = templateWidth;
    this.templateHeight = templateHeight;

    this.fill("?");
  }

  getRoomPosition(x, y) {
    return new Point(
      Math.floor(x / this.templateWidth),
      Math.floor(y / this.templateHeight)
    );
  }

  toString() {
    let str = "";
    for (let y = this.height - 1; y >= 0; --y) {
      for (let x = 0; x < this.width; ++x) {
        str += this.at(x, y);
      }
      str += "\n";
    }
    return str;
  }
}

export default Level;
