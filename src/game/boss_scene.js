import Level from "./gen/level";

import LevelScene from "./level_scene";

class BossScene extends LevelScene {
  preload() {
    super.preload();

    this.load.spritesheet("mantisman", "assets/mantisboss.png", {
      frameWidth: 96,
      frameHeight: 67,
    });
  }

  getLevel() {
    const level = new Level(
      1,
      1,
      this.props.template.width,
      this.props.template.height
    );

    level.loadTemplate(this.props.template);

    return level;
  }

  create() {
    super.create();
  }
}

export default BossScene;
