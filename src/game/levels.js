import GeneratedLevelScene from "./generated_level_scene";

class FirstLevel extends GeneratedLevelScene {
  constructor() {
    super("level_1", {
      next: "level_2",
      backgroundAsset: "assets/background_1.png",
      tilesAsset: "assets/wall.png",
      mazeWidth: 2,
      mazeHeight: 2,
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

const LEVELS = [FirstLevel, SecondLevel];

export default LEVELS;
