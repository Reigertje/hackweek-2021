import * as Phaser from "phaser";

class Rocket extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "rocket");

    this.anims.create({
      key: "rocket",
      frames: this.anims.generateFrameNumbers("rocket", { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "rocket_explode",
      frames: this.anims.generateFrameNumbers("rocket", { start: 5, end: 11 }),
      frameRate: 12,
      repeat: -1,
    });

    this.speed = 100;
  }

  fire(origin) {
    this.lifespan = 1000;
    this.play({ key: "rocket", repeat: -1 });
    this.setActive(true);
    this.setVisible(true);
    this.setAngle(origin.body.rotation);
    this.setPosition(origin.x, origin.y);

    this.body.reset(origin.x, origin.y);

    this.body.setSize(1, 1, true);

    let angle = Phaser.Math.DegToRad(origin.body.rotation);

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      this.body.velocity
    );

    this.body.velocity.x *= 2;
    this.body.velocity.y *= 2;
  }

  isExploding() {
    return this.anims.currentAnim.key === "rocket_explode";
  }

  animationFinished() {
    return this.anims.currentFrame.isLast;
  }

  update(time, delta) {
    this.lifespan -= delta;

    if (this.active && this.isExploding() && this.animationFinished()) {
      this.setActive(false);
      this.setVisible(false);
      return;
    }

    if (!this.isExploding() && this.lifespan <= 0) {
      this.kill();
    }
  }

  kill() {
    this.play({ key: "rocket_explode", repeat: 1 });
    this.body.stop();
  }
}

export default Rocket;
