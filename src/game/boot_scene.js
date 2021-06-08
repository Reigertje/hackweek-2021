import * as Phaser from "phaser";
import GameScene from "./game_scene";

class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload() {
    this.load.spritesheet("title", "assets/splash.png", {
      frameWidth: 640,
      frameHeight: 640,
      endFrame: 28,
    });
  }

  create() {
    const titleAnimation = this.anims.create({
      key: "play",
      frames: this.anims.generateFrameNumbers("title"),
      frameRate: 12,
    });

    const sprite = this.add.sprite(320, 320, "title");
    sprite.play({ key: "play" });
    this.add.text(0, 0, "Click to Start Game");
    this.input.once(
      "pointerdown",
      function () {
        this.scene.switch("game");
      },
      this
    );
  }
}

export default BootScene;
