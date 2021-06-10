import Enemy from "./enemy";
import SpiderKid from "./spiderkid";

const PROPS = {
  lives: 1,
  width: 6,
  height: 6,
};

class SpiderEgg extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    this.spiderball = scene.add.sprite(0, 0, "spideregg");

    this.add(this.spiderball);
  }

  launch(direction) {
    direction.setLength(50);
    this.body.setVelocity(direction.x, direction.y);
  }

  preUpdate() {
    // if (!this.isDying()) {
    //   this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    // } else {
    //   this.body.setVelocity(0);
    // }
  }

  hit(damage) {
    // Indestructable
    return;
  }

  turn() {
    this.startDying();
  }

  startDying() {
    this.scene.add.existing(new SpiderKid(this.scene, this.x, this.y));
    this.destroy();
  }
}

export default SpiderEgg;
