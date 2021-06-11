import GeneratedLevelScene from "./generated_level_scene";
import BossScene from "./boss_scene";
import { Template } from "./gen/level_templates";

class FirstLevel extends GeneratedLevelScene {
  constructor() {
    super("level_1", {
      next: "first_boss",
      backgroundAsset: "/assets/background_1.png",
      tilesAsset: "/assets/tiles_1.png",
      mazeWidth: 2,
      mazeHeight: 2,
    });
  }
}

class FirstBossLevel extends BossScene {
  constructor() {
    super("first_boss", {
      next: "level_2",
      backgroundAsset: "/assets/background_1.png",
      tilesAsset: "/assets/tiles_2.png",
      template: new Template(17, 13, [
        "#################",
        "#...#.......#...#",
        "#...............#",
        "#...............#",
        "#...#...M...#...#",
        "#...............#",
        "#...............#",
        "#...............#",
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
      next: "second_boss",
      backgroundAsset: "/assets/background_2.png",
      tilesAsset: "/assets/tiles_3.png",
      mazeWidth: 3,
      mazeHeight: 3,
    });
  }
}

class SecondBossLevel extends BossScene {
  constructor() {
    super("second_boss", {
      next: "level_3",
      backgroundAsset: "/assets/background_2.png",
      tilesAsset: "/assets/tiles_4.png",
      template: new Template(17, 11, [
        "#################",
        "#N.N.N..S.N.N.N.#",
        "#...............#",
        "#...P.......P...#",
        "#...P.......P...#",
        "#...............#",
        "#...............#",
        "#.......C.......#",
        "##.............##",
        "###.#.###.#.#####",
        "#################",
      ]),
    });
  }
}

class ThirdLevel extends GeneratedLevelScene {
  constructor() {
    super("level_3", {
      next: "third_boss",
      backgroundAsset: "/assets/background_2.png",
      tilesAsset: "/assets/tiles_5.png",
      mazeWidth: 3,
      mazeHeight: 3,
    });
  }
}

class ThirdBossLevel extends BossScene {
  constructor() {
    super("third_boss", {
      next: null,
      backgroundAsset: "/assets/background_1.png",
      tilesAsset: "/assets/tiles_6.png",
      template: new Template(25, 25, [
        "#########################",
        "#.......................#",
        "#.......................#",
        "#.......................#",
        "#....#..................#",
        "#.......................#",
        "#.......................#",
        "#....#......C......#....#",
        "#.......................#",
        "#.......................#",
        "#.......................#",
        "#..................#....#",
        "#....#..................#",
        "#.......................#",
        "#.......................#",
        "#....#.............#....#",
        "#.......................#",
        "#.......................#",
        "#.......................#",
        "#..................#....#",
        "#.........33333.........#",
        "#........3333333........#",
        "#.......3333X3333.......#",
        "#........3#####3........#",
        "#########################",
      ]),
    });
  }
}

const LEVELS = [
  FirstLevel,
  FirstBossLevel,
  SecondLevel,
  SecondBossLevel,
  ThirdLevel,
  ThirdBossLevel,
];

export default LEVELS;
