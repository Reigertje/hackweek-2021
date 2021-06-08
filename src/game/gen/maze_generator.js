import Point from "./point";
import Maze from "./maze";
import { list as getDirections } from "./directions";
import { randomShuffle } from "./random";

const generateMaze = function (maze, startPoint) {
  const directions = getDirections();
  randomShuffle(directions);

  directions.forEach((direction) => {
    const destination = startPoint.getNeighbour(direction);
    if (maze.pointInBounds(destination) && maze.atPoint(destination) === 0) {
      maze.addPassage(startPoint, direction);
      generateMaze(maze, destination);
    }
  });
};

class MazeGenerator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  generate() {
    const maze = new Maze(this.width, this.height);
    generateMaze(maze, new Point(this.width / 2, this.height / 2));
    return maze;
  }
}

export default MazeGenerator;
