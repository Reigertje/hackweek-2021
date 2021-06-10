import GeneratedLevelScene from "./generated_level_scene";
import BossScene from "./boss_scene";
import { Template } from "./gen/level_templates";

class FirstLevel extends GeneratedLevelScene {
  constructor() {
    super("level_1", {
      next: "first_boss",
      backgroundAsset: "assets/background_1.png",
      tilesAsset: "assets/wall.png",
      mazeWidth: 2,
      mazeHeight: 2,
    });
  }
}

class FirstBossLevel extends BossScene {
  constructor() {
    super("first_boss", {
      next: "level_2",
      backgroundAsset: "assets/background_1.png",
      tilesAsset: "assets/wall.png",
      template: new Template(17, 13, [
        "#################",
        "#...#.......#...#",
        "#...............#",
        "#...............#",
        "#...#.......#...#",
        "#...............#",
        "#...............#",
        "#.......M.......#",
        "#...#.......#...#",
        "#...............#",
        "#.......C.......#",
        "#...#.......#...#",
        "#################",
      ]),
    });
  }
}

class SecondLevel extends GeneratedLevelScene {
  constructor() {
    super("level_2", {
      next: null,
      backgroundAsset: "assets/background_2.png",
      tilesAsset: "assets/wall2.png",
      mazeWidth: 3,
      mazeHeight: 3,
    });
  }
}

const LEVELS = [FirstBossLevel, SecondLevel];

export default LEVELS;
