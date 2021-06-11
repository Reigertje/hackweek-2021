class Grid {
  constructor(width, height, data = null) {
    this.width = width;
    this.height = height;
    this.data = data || new Array(width * height);
    if (this.data.length !== width * height) {
      throw new Error("Invalid data passed to grid.");
    }
  }

  fill(value) {
    this.data.fill(value);
  }

  index(x, y) {
    return y * this.width + x;
  }

  pointIndex(point) {
    return this.index(point.x, point.y);
  }

  at(x, y) {
    return this.data[this.index(x, y)];
  }

  atPoint(point) {
    return this.at(point.x, point.y);
  }

  set(x, y, value) {
    this.data[this.index(x, y)] = value;
  }

  setPoint(point, value) {
    this.set(point.x, point.y, value);
  }

  inBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
  }

  pointInBounds(point) {
    return this.inBounds(point.x, point.y);
  }
}

export default Grid;
