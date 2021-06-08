import Grid from "./grid";

class Level extends Grid {
  constructor(width, height) {
    super(width, height);
    this.fill("?");
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
