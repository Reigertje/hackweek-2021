import * as Phaser from "phaser";

class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.powers = {
      boost: false,
      rocket: false,
      num_rockets: 0,
      shield: false,
      range: 1,
    };

    this.alive = true;
    this.ship = scene.add.sprite(0, 0, "ship");

    scene.anims.create({
      key: "ship_normal",
      frames: scene.anims.generateFrameNumbers("ship", { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1,
    });

    scene.anims.create({
      key: "ship_shielded",
      frames: scene.anims.generateFrameNumbers("ship", { start: 6, end: 6 }),
      frameRate: 1,
      repeat: -1,
    });

    scene.anims.create({
      key: "ship_explode",
      frames: scene.anims.generateFrameNumbers("ship", { start: 1, end: 5 }),
      frameRate: 12,
      repeat: 1,
    });

    scene.anims.create({
      key: "normal",
      frames: scene.anims.generateFrameNumbers("exhaust"),
      frameRate: 12,
    });

    this.exhaust = scene.add.sprite(-13, 0, "exhaust");
    this.exhaust.play({ key: "normal", repeat: -1 });

    this.setSize(6, 6);

    scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;

    this.body.setDamping(true);
    this.body.setDrag(0.5);
    this.body.setMaxVelocity(50);

    this.add(this.ship);
    this.add(this.exhaust);
  }

  preUpdate() {
    if (!this.alive) return;
    if (this.scene.cutscene) {
      this.body.stop();
    }

    const scene = this.scene;
    const { cursors, bullets, rockets } = scene.refs;

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

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      if (this.powers.rocket && this.powers.num_rockets > 0) {
        const rocket = rockets.get();
        if (rocket) {
          rocket.fire(this);
          this.powers.num_rockets--;
        }
      } else {
        const bullet = bullets.get();
        if (bullet) {
          bullet.fire(this);
        }
      }
    }

    if (this.powers.shield) {
      this.ship.play({ key: "ship_shielded" });
    }
  }

  pickUpPowerUp(powerup) {
    this.powers = {
      boost: this.powers.boost || powerup.powers.boost,
      rocket: this.powers.rocket || powerup.powers.rocket,
      num_rockets: this.powers.rocket || powerup.powers.rocket ? 5 : 0,
      shield: this.powers.shield || powerup.powers.shield,
      range: this.range + (powerup.powers.range || 0),
    };

    powerup.destroy();
  }

  kill() {
    if (this.alive) {
      this.scene.cameras.main.shake(1000, 0.001);

      this.scene.add
        .text(320, 180, "GAME OVER")
        .setScrollFactor(0)
        .setOrigin(0.5, 0.5);
      // this.scene.respawn();
      this.scene.restartGame();

      this.ship.play({ key: "ship_explode", repeat: 0, hideOnComplete: true });
      this.body.stop();
      this.exhaust.setVisible(false);
      this.alive = false;
    }
  }

  hasShield() {
    return this.powers.shield;
  }

  destroyShield() {
    this.powers.shield = false;
    this.ship.play("ship_normal");
  }

  damageOrKill() {
    this.hasShield() ? this.destroyShield() : this.kill();
  }
}

export default Player;
