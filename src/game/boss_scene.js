import Level from "./gen/level";

import LevelScene from "./level_scene";

class BossScene extends LevelScene {
  preload() {
    super.preload();

    this.load.spritesheet("mantisman", "assets/mantisboss.png", {
      frameWidth: 96,
      frameHeight: 67,
    });
    this.load.spritesheet("bigspider", "assets/spiderboss.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.spritesheet("spiderball", "assets/spiderball.png", {
      frameWidth: 8,
      frameHeight: 8,
    });

    this.load.spritesheet("spiderkid", "assets/spiderkid.png", {
      frameWidth: 11,
      frameHeight: 10,
    });

    this.load.image("spideregg", "assets/spideregg.png");
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
