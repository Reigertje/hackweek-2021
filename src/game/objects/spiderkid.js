import Enemy from "./enemy";
import * as Phaser from "phaser";
import { randomBool } from "../gen/random";

const PROPS = {
  lives: 1,
  width: 6,
  height: 6,
};

class SpiderKid extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "spiderkid_default",
      frames: scene.anims.generateFrameNumbers("spiderkid"),
      frameRate: 8,
    });

    this.spiderkid = scene.add.sprite(0, 0, "spiderkid");
    this.spiderkid.play({ key: "spiderkid_default", repeat: -1 });

    this.add(this.spiderkid);
  }

  preUpdate() {
    const player = this.scene.refs.player;

    const direction = new Phaser.Math.Vector2(
      player.x - this.x,
      player.y - this.y
    );

    direction.setLength(40);

    this.body.setVelocity(direction.x, direction.y);

    this.spiderkid.setAngle(Phaser.Math.RadToDeg(direction.angle()) - 90);
    // if (!this.isDying()) {
    //   this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    // } else {
    //   this.body.setVelocity(0);
    // }
  }

  turn() {
    // this.goDown = !this.goDown;
    this.startDying();
  }

  startDying() {
    this.destroy();
  }
}

export default SpiderKid;
