import * as Phaser from "phaser";

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
    this.anims.create({
      key: "play",
      frames: this.anims.generateFrameNumbers("title"),
      frameRate: 12,
    });

    const sprite = this.add.sprite(320, 180, "title");
    sprite.scale = 0.5;
    sprite.play({ key: "play" });
    this.add.text(0, 0, "Click to Start Game");
    this.input.once(
      "pointerdown",
      function () {
        this.scene.start("second_boss");
      },
      this
    );
  }
}

export default BootScene;
