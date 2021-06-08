import * as Phaser from "phaser";

class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.ship = scene.add.image(0, 0, "ship");

    scene.anims.create({
      key: "normal",
      frames: scene.anims.generateFrameNumbers("exhaust"),
      frameRate: 12,
    });

    this.exhaust = scene.add.sprite(-13, 0, "exhaust");
    this.exhaust.play({ key: "normal", repeat: -1 });

    this.setSize(6, 6);

    scene.physics.world.enable(this);

    this.body.setDamping(true);
    this.body.setDrag(0.5);
    this.body.setMaxVelocity(50);

    this.add(this.ship);
    this.add(this.exhaust);
  }

  preUpdate() {
    const scene = this.scene;
    const { cursors, bullets } = scene.refs;

    scene.physics.velocityFromRotation(
      this.rotation,
      50,
      this.body.acceleration
    );
    if (cursors.up.isDown) {
      scene.physics.velocityFromRotation(
        this.rotation,
        50,
        this.body.acceleration
      );
      this.exhaust.setVisible(true);
    } else {
      this.body.setAcceleration(0);
      this.exhaust.setVisible(false);
    }

    if (cursors.down.isDown) {
      this.body.setDrag(0.1);
    } else {
      this.body.setDrag(0.99);
    }

    if (cursors.left.isDown) {
      this.body.setAngularVelocity(-300);
    } else if (cursors.right.isDown) {
      this.body.setAngularVelocity(300);
    } else {
      this.body.setAngularVelocity(0);
    }

    if (cursors.space.isDown) {
      const bullet = bullets.get();
      if (bullet) {
        bullet.fire(this);
      }
    }
  }
}

export default Player;
