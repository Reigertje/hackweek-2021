import * as Phaser from "phaser";

import { randomBool } from "../gen/random";

class Enemy1 extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.anims.create({
      key: "fly",
      frames: scene.anims.generateFrameNumbers("midge"),
      frameRate: 8,
    });

    this.midge = scene.add.sprite(-13, 0, "midge");
    this.midge.play({ key: "fly", repeat: -1 });

    this.setSize(20, 20);

    scene.physics.world.enable(this);
    this.goDown = randomBool;
    this.max_speed = 25;

    this.add(this.midge);
  }

  preUpdate() {
    this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
  }

  turn() {
    this.goDown = !this.goDown;
  }
}

export default Enemy1;
