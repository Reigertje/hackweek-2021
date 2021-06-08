import MazeGenerator from "./maze_generator";
import LevelTemplates from "./level_templates";
import Level from "./level";

const generateLevel = function (level, maze, templates) {
  for (let y = 0; y < maze.height; ++y) {
    for (let x = 0; x < maze.width; ++x) {
      const xOffset = x * templates.width;
      const yOffset = y * templates.height;
      const template = templates.select(maze.at(x, y));

      for (let ty = 0; ty < template.height; ++ty) {
        for (let tx = 0; tx < template.width; ++tx) {
          level.set(tx + xOffset, ty + yOffset, template.at(tx, ty));
        }
      }
    }
  }
};

class LevelGenerator {
  generate(mazeWidth, mazeHeight) {
    const templates = new LevelTemplates();
    const maze = new MazeGenerator(mazeWidth, mazeHeight).generate();
    const level = new Level(
      maze.width,
      maze.height,
      templates.width,
      templates.height
    );

    generateLevel(level, maze, templates);
    console.log(maze.toString());
    console.log(level.toString());
    return level;
  }
}

export default LevelGenerator;
