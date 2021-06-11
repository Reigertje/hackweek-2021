import * as Phaser from "phaser";

class HealthBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setScrollFactor(0);

    this.x = x;
    this.y = y;
    this.value = 100;
    this.bar_length = 250;
    this.p = this.bar_length / 100;

    this.bar.setDepth(3000);
    scene.add.existing(this.bar);

    this._intro_animation_progress = 0;
    this.draw();
  }

  decrease(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();

    return this.value === 0;
  }

  update(time, delta) {
    this._intro_animation_progress += delta / 3000.0;
    if (this._intro_animation_progress > 1.0) {
      this._intro_animation_progress = 1.0;
    }
  }

  draw() {
    this.bar.clear();
    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.bar_length + 4, 8);

    //  Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, this.bar_length, 6);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    var d = Math.floor(this.p * this.value * this._intro_animation_progress);

    this.bar.fillRect(this.x + 2, this.y + 2, d, 6);
  }
}

export default HealthBar;
