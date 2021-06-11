import Boss from "./boss";
import * as Phaser from "phaser";
import Portal from "../objects/portal";

const PROPS = {
  lives: 1,
  width: 32,
  height: 48,
};

class MantisMan extends Boss {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "mantisman_default",
      frames: scene.anims.generateFrameNumbers("mantisman"),
      frameRate: 8,
    });

    this.mantis = scene.add.sprite(0, 0, "mantisman");
    this.mantis.play({ key: "mantisman_default", repeat: -1 });

    this.body.setMaxVelocity(30);

    this.add(this.mantis);
    this.body.setBounce(1);
  }

  changeDirection() {
    const direction = new Phaser.Math.Vector2();
    Phaser.Math.RandomXY(direction);
    direction.setLength(30);

    this.body.setVelocity(direction.x, direction.y);
  }

  preUpdate() {
    if (this.scene.cutscene) {
      this.body.setVelocity(0);
    } else if (this.body.speed === 0) {
      this.changeDirection();
    }
    this.mantis.setTint(0xffffff);
  }

  hit(damage) {
    this.mantis.setTint(0xff0000);
    this.changeDirection();
    super.hit(damage);
  }

  turn() {}

  startDying() {
    this.scene.add.existing(new Portal(this.scene, this.x, this.y));
    super.startDying();
  }
}

export default MantisMan;
