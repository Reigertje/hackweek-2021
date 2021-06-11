import * as Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Container {
  constructor(scene, x, y, props) {
    super(scene, x, y);
    this._lives = props.lives || 1;
    this._isDying = false;

    this.setSize(props.width || 1, props.height || 1);

    scene.refs.enemies.add(this);
  }

  hit(damage) {
    this._lives -= damage;
    if (this._lives <= 0) {
      this.body.checkCollision.none = true;
      this._isDying = true;
      this.startDying();
    }
  }

  isAlive() {
    return !this._isDying;
  }

  isDying() {
    return this._isDying;
  }

  preUpdate() {}
}

export default Enemy;
