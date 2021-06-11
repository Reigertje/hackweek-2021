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

    this.load.spritesheet("spideregg", "assets/spideregg.png", {
      frameWidth: 12,
      frameHeight: 12,
    });

    this.load.spritesheet("mothmother", "assets/mothboss.png", {
      frameWidth: 128,
      frameHeight: 96,
    });
    this.load.spritesheet("butterfly", "assets/butterfly.png", {
      frameWidth: 9,
      frameHeight: 9,
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
    this.cutscene = true;
    this.cameras.main.centerOn(this.refs.boss.x, this.refs.boss.y);
    this.cameras.main.flash(1000, 255, 0, 0, false, (camera, progress) => {
      if (progress === 1)
        this.cameras.main.shake(1000, 0.001, false, (camera, progress) => {
          if (progress === 1)
            this.cameras.main.pan(
              this.refs.player.x,
              this.refs.player.y,
              2000,
              "Linear",
              false,
              (camera, progress) => {
                if (progress === 1) {
                  this.cameras.main.startFollow(this.refs.player);
                  this.cutscene = false;
                }
              }
            );
        });
    });
  }
}

export default BossScene;
