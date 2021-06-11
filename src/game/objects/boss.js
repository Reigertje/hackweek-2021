import Enemy from "./enemy";
import HealthBar from "../objects/healthbar";

class Boss extends Enemy {
  constructor(scene, x, y, PROPS) {
    super(scene, x, y, PROPS);
    this.lives = PROPS.lives;
    this.hp = new HealthBar(scene, 204, 118);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.hp.update(time, delta);
    this.hp.draw();
  }

  hit(damage) {
    this.hp.decrease((damage / this.lives) * 100);
    super.hit(damage);
  }

  startDying() {
    this.hp.bar.destroy();
    this.hp = null;
    this.destroy();
  }
}

export default Boss;
