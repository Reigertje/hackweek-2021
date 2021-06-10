import LevelGenerator from "./gen/level_generator";

import LevelScene from "./level_scene";

class GeneratedLevelScene extends LevelScene {
  constructor(key, props) {
    super(key, props);
    this.refs = {};
  }

  preload() {
    super.preload();

    this.load.spritesheet("midge", "assets/midge_enemy.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  getLevel() {
    return new LevelGenerator().generate(
      this.props.mazeWidth,
      this.props.mazeHeight
    );
  }

  create() {
    super.create();

    this.cameras.main.startFollow(this.refs.player);

    // TODO additional things?
  }

  update() {}
}

export default GeneratedLevelScene;
