import * as Phaser from "phaser";

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super("background");
  }

  init(data) {
    console.log("init", data);
    this.levelIndex = data.levelIndex;
  }

  preload() {
    this.load.image("background_1", "assets/background_1.png");
    this.load.image("background_2", "assets/background_2.png");
  }

  create() {
    const sprite = this.add.image(
      0,
      0,
      this.levelIndex === 1 ? "background_1" : "background_2"
    );
    sprite.setOrigin(0);
    // this.cameras.main.setViewport(0, 0, 320, 180);
    // this.cameras.main.setSize(320, 180);
    this.cameras.main.setZoom(2);
    this.cameras.main.setOrigin(0);

    this.events.on("resume", () => {
      console.log("yes");
    });
  }

  update() {
    // console.log("i'm running");
  }
}

export default BackgroundScene;
