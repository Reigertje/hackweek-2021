import Enemy from "./enemy";
import * as Phaser from "phaser";
import { randomBool } from "../gen/random";

const PROPS = {
  lives: 1,
  width: 15,
  height: 15,
};

class ButterFly extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "butterfly_fly",
      frames: scene.anims.generateFrameNumbers("butterfly"),
      frameRate: 8,
    });

    this.butterfly = scene.add.sprite(0, 0, "butterfly");
    this.butterfly.play({ key: "butterfly_fly", repeat: -1 });

    this.goDown = randomBool;
    this.max_speed = 25;

    this.add(this.butterfly);
    this.body.setBounce(1);
    this.changeDirection();
    this._mother = 0;
  }

  changeDirection() {
    const direction = new Phaser.Math.Vector2();
    Phaser.Math.RandomXY(direction);
    direction.setLength(20);

    this.body.setVelocity(direction.x, direction.y);
  }

  preUpdate() {
    if (!this.isDying()) {
      if (
        this._mother &&
        new Phaser.Math.Vector2(
          this.x - this._mother.x,
          this.y - this._mother.y
        ).lengthSq() >
          96 * 96
      ) {
        this.body.setMaxVelocity(30);
        const direction = new Phaser.Math.Vector2(
          this._mother.x - this.x,
          this._mother.y - this.y
        );
        direction.setLength(30);
        this.body.setVelocity(direction.x, direction.y);
      }

      this.body.setMaxVelocity(25);

      // this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    } else {
      this.body.setVelocity(0);
    }
  }

  setMother(mother) {
    this._mother = mother;
  }

  turn() {
    // this.goDown = !this.goDown;
  }

  startDying() {
    this.destroy();
  }
}

export default ButterFly;
