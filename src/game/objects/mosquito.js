import Enemy from "./enemy";

import { randomBool } from "../gen/random";

const PROPS = {
  lives: 1,
  width: 15,
  height: 15,
};

class Mosquito extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "fly",
      frames: scene.anims.generateFrameNumbers("midge", { start: 0, end: 3 }),
      frameRate: 8,
    });

    scene.anims.create({
      key: "midge_die",
      frames: scene.anims.generateFrameNumbers("midge", { start: 4, end: 7 }),
      frameRate: 8,
    });

    this.midge = scene.add.sprite(0, 0, "midge");
    this.midge.play({ key: "fly", repeat: -1 });

    this.goDown = randomBool;
    this.max_speed = 25;

    this.add(this.midge);
  }

  preUpdate() {
    if (!this.isDying()) {
      this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    } else {
      this.body.setVelocity(0);
    }
  }

  turn() {
    this.goDown = !this.goDown;
  }

  startDying() {
    this.body.stop();
    this.midge.play({ key: "midge_die", repeat: 0 });
    this.once("animationcomplete", () => {
      this.destroy();
    });
  }
}

export default Mosquito;
