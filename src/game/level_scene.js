import * as Phaser from "phaser";

class LevelScene extends Phaser.Scene {
  constructor(key, props) {
    super(key);
    this.props = props;
  }

  preload() {
    this.textures.remove("background");
    this.load.image("background", this.props.backgroundAsset);

    this.load.spritesheet("powerup", "assets/powerup.png", {
      frameWidth: 24,
      frameHeight: 24,
    });

    this.load.spritesheet("shield", "assets/shield.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  create() {
    this.add.image(320, 180, "background").setScrollFactor(0);
  }

  setBackground() {}

  nextLevel() {
    if (this.props.next) {
      this.scene.start(this.props.next);
    } else {
      // TODO last level completed?
      console.log("you won!");
    }
  }
}

export default LevelScene;
