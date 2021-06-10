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

    this.load.spritesheet("bullet", "assets/bullet.png", {
      frameWidth: 16,
      frameHeight: 9,
    });
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("exhaust", "assets/exhaust.png", {
      frameWidth: 13,
      frameHeight: 13,
    });

    this.textures.remove("tiles");
    this.load.image("tiles", this.props.tilesAsset);

    this.load.spritesheet("portal", "assets/portal.png", {
      frameWidth: 50,
      frameHeight: 50,
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
