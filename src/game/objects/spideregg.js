import Enemy from "./enemy";
import SpiderKid from "./spiderkid";
import * as Phaser from "phaser";

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

    scene.anims.create({
      key: "spideregg_chilling",
      frames: scene.anims.generateFrameNumbers("spideregg", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
    });

    scene.anims.create({
      key: "spideregg_flying",
      frames: scene.anims.generateFrameNumbers("spideregg", {
        start: 4,
        end: 7,
      }),
      frameRate: 8,
    });

    this.chill();
  }

  chill() {
    this._state = "chilling";
    this.spiderball.play({ key: "spideregg_chilling", repeat: -1 });
  }

  launch(direction) {
    this._state = "flying";
    this.spiderball.play({ key: "spideregg_flying", repeat: -1 });
    direction.setLength(50);
    this.body.setVelocity(direction.x, direction.y);
  }

  preUpdate() {
    if (this._state === "chilling") {
      const player = this.scene.refs.player;

      if (Math.abs(player.x - this.x) < 5 && player.y - this.y < 7 * 24) {
        this.launch(new Phaser.Math.Vector2(0, 1));
      }
    }
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
