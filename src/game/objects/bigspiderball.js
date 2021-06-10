import Enemy from "./enemy";
import * as Phaser from "phaser";
import { randomBool } from "../gen/random";

const PROPS = {
  lives: 1,
  width: 6,
  height: 6,
};

class BigSpiderBall extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "spiderball_default",
      frames: scene.anims.generateFrameNumbers("spiderball"),
      frameRate: 8,
    });

    this.spiderball = scene.add.sprite(0, 0, "spiderball");
    this.spiderball.play({ key: "spiderball_default", repeat: -1 });

    this.add(this.spiderball);
  }

  preUpdate() {
    const player = this.scene.refs.player;

    const direction = new Phaser.Math.Vector2(
      player.x - this.x,
      player.y - this.y
    );

    direction.setLength(30);

    this.body.setVelocity(direction.x, direction.y);

    // if (!this.isDying()) {
    //   this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    // } else {
    //   this.body.setVelocity(0);
    // }
  }

  turn() {
    // this.goDown = !this.goDown;
  }

  startDying() {
    this.destroy();
  }
}

export default BigSpiderBall;
