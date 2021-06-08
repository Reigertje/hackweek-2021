import * as Phaser from "phaser";

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super("background");
  }

  preload() {
    this.load.image("background", "assets/background_1.png");
  }

  create() {
    const sprite = this.add.image(0, 0, "background");
    sprite.setOrigin(0);
    // this.cameras.main.setViewport(0, 0, 320, 180);
    // this.cameras.main.setSize(320, 180);
    this.cameras.main.setZoom(2);
    this.cameras.main.setOrigin(0);
  }
}

export default BackgroundScene;
