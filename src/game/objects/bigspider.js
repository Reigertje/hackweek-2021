import Enemy from "./enemy";
import * as Phaser from "phaser";
import Portal from "../objects/portal";
import { randomInt } from "../gen/random";

import BigSpiderBall from "./bigspiderball";
import SpiderEgg from "./spideregg";
import SpiderKid from "./spiderkid";

const PROPS = {
  lives: 30,
  width: 16,
  height: 16,
};

const SHOOT_INTERVAL = 3000;

class BigSpider extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "bigspider_default",
      frames: scene.anims.generateFrameNumbers("bigspider"),
      frameRate: 8,
    });

    this.spider = scene.add.sprite(0, 0, "bigspider");
    this.spider.play({ key: "bigspider_default", repeat: -1 });

    this.add(this.spider);
    this.body.setBounce(1);

    this.shoot_interval = SHOOT_INTERVAL;
  }

  canShootAnotherBall() {
    const threatCount = this.scene.children.list.reduce((accum, value) => {
      if (
        value instanceof BigSpiderBall ||
        value instanceof SpiderEgg ||
        value instanceof SpiderKid
      ) {
        return accum + 1;
      }
      return accum;
    }, 0);

    return threatCount < 5;
  }

  preUpdate(time, delta) {
    if (this.scene.cutscene) return;
    this.shoot_interval -= delta;

    if (this.shoot_interval <= 0 && this.canShootAnotherBall()) {
      if (randomInt(2) === 0) {
        this.scene.add.existing(
          new BigSpiderBall(this.scene, this.x, this.y + 18)
        );
      } else {
        const egg = new SpiderEgg(this.scene, this.x, this.y + 18);
        this.scene.add.existing(egg);
        egg.launch(
          new Phaser.Math.Vector2(
            this.scene.refs.player.x - this.x,
            this.scene.refs.player.y - this.y
          )
        );
      }
      this.shoot_interval = SHOOT_INTERVAL;
    }
    if (!this.canShootAnotherBall()) {
      this.shoot_interval = SHOOT_INTERVAL;
    }

    this.spider.setTint(0xffffff);
  }

  hit(damage) {
    this.spider.setTint(0xff0000);
    super.hit(damage);
  }

  turn() {}

  startDying() {
    // this.scene.add.existing(new Portal(this.scene, this.x, this.y));

    this.destroy();
  }
}

export default BigSpider;
