import Boss from "./boss";
import * as Phaser from "phaser";
import Portal from "../objects/portal";
import { randomInt } from "../gen/random";

import ButterFly from "./butterfly";

const PROPS = {
  lives: 30,
  width: 32,
  height: 48,
};

const MAX_BUTTERFLIES = 25;

class MothMother extends Boss {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "mothmother_stage_1",
      frames: scene.anims.generateFrameNumbers("mothmother", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
    });

    scene.anims.create({
      key: "mothmother_transform",
      frames: scene.anims.generateFrameNumbers("mothmother", {
        start: 4,
        end: 7,
      }),
      frameRate: 8,
    });

    scene.anims.create({
      key: "mothmother_stage_2",
      frames: scene.anims.generateFrameNumbers("mothmother", {
        start: 8,
        end: 15,
      }),
      frameRate: 8,
    });

    this.mothmother = scene.add.sprite(0, 0, "mothmother");
    this.mothmother.play({ key: "mothmother_stage_1", repeat: -1 });

    this.body.setMaxVelocity(0);

    this.add(this.mothmother);
    this.body.setBounce(1);
    this._stage = "stage_1";
    this._spawn_timer = 10000;
  }

  changeDirection() {
    const direction = new Phaser.Math.Vector2();
    Phaser.Math.RandomXY(direction);
    direction.setLength(30);

    this.body.setVelocity(direction.x, direction.y);
  }

  countButterflies() {
    return this.scene.children.list.reduce((accum, value) => {
      if (value instanceof ButterFly) {
        return accum + 1;
      }
      return accum;
    }, 0);
  }

  spawnButterFlyIfPossible() {
    if (this.countButterflies() < MAX_BUTTERFLIES) {
      console.log("spawn");
      const butterfly = new ButterFly(this.scene, this.x, this.y);
      this.scene.add.existing(butterfly);
      return butterfly;
    }
    return null;
  }

  transform() {
    this._stage = "transforming";
    this.scene.cutscene = true;
    this.scene.cameras.main.stopFollow();
    this.scene.cameras.main.pan(
      this.x,
      this.y,
      2000,
      "Linear",
      false,
      (camera, progress) => {
        if (progress === 1) {
          this.mothmother.play({ key: "mothmother_transform", repeat: 0 });
          this.scene.cameras.main.shake(1000, 0.001, false);
          this.mothmother.once("animationcomplete", () => {
            this.mothmother.play({
              key: "mothmother_stage_2",
              repeat: -1,
            });
            this.scene.cameras.main.pan(
              this.scene.refs.player.x,
              this.scene.refs.player.y,
              1000,
              "Linear",
              false,
              (camera, progress) => {
                if (progress === 1) {
                  this.scene.cameras.main.startFollow(this.scene.refs.player);
                  this.scene.cutscene = false;
                  this._stage = "stage_2";
                  this.body.setMaxVelocity(20);
                }
              }
            );
          });
        }
      }
    );
  }

  preUpdate(time, delta) {
    if (this.scene.cutscene) {
      this.body.setVelocity(0);
    } else {
      if (this.body.speed === 0) {
        this.changeDirection();
      }

      if (this._stage === "stage_1") {
        this._spawn_timer -= delta;
        if (this._spawn_timer <= 0) {
          this.spawnButterFlyIfPossible();
          this._spawn_timer = 10000;
        }

        if (this.countButterflies() < 5) {
          this.transform();
        }
      } else if (this._stage === "stage_2") {
        console.log("stage_2");
        this._spawn_timer -= delta;
        if (this._spawn_timer <= 0) {
          const butterfly = this.spawnButterFlyIfPossible();
          if (butterfly) {
            butterfly.setMother(this);
          }
          this._spawn_timer = 1000;
        }
      }
    }

    // if (!this.isDying()) {
    //   this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    // } else {
    //   this.body.setVelocity(0);
    // }
    this.mothmother.setTint(0xffffff);
  }

  hit(damage) {
    if (this._stage === "stage_1") return;

    this.mothmother.setTint(0xff0000);
    this.changeDirection();
    super.hit(damage);
  }

  turn() {}

  startDying() {
    this.scene.add.existing(new Portal(this.scene, this.x, this.y));
    super.startDying();
  }
}

export default MothMother;
