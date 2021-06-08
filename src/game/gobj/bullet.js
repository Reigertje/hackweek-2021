import * as Phaser from "phaser";

const Bullet = new Phaser.Class({
  Extends: Phaser.Physics.Arcade.Image,

  initialize: function Bullet(scene) {
    Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, "bullet");
    this.setDepth(1);

    this.speed = 200;
    this.lifespan = 1000;

    this._temp = new Phaser.Math.Vector2();
  },

  fire: function (origin) {
    this.lifespan = 1000;

    this.setActive(true);
    this.setVisible(true);
    this.setAngle(origin.body.rotation);
    this.setPosition(origin.x, origin.y);

    this.body.reset(origin.x, origin.y);

    this.body.setSize(10, 10, true);

    let angle = Phaser.Math.DegToRad(origin.body.rotation);

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      this.body.velocity
    );

    this.body.velocity.x *= 2;
    this.body.velocity.y *= 2;
  },

  update: function (time, delta) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.kill();
    }
  },

  kill: function () {
    this.setActive(false);
    this.setVisible(false);
    this.body.stop();
  },
});

export default Bullet;
