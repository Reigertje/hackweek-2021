import Enemy from "./enemy";

const PROPS = {
  lives: 50,
  width: 32,
  height: 48,
};

class MantisMan extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, PROPS);

    scene.anims.create({
      key: "mantisman_default",
      frames: scene.anims.generateFrameNumbers("mantisman"),
      frameRate: 8,
    });

    this.mantis = scene.add.sprite(0, 0, "mantisman");
    this.mantis.play({ key: "mantisman_default", repeat: -1 });

    this.add(this.mantis);
  }

  preUpdate() {
    // if (!this.isDying()) {
    //   this.body.setVelocity(0, this.goDown ? this.max_speed : -this.max_speed);
    // } else {
    //   this.body.setVelocity(0);
    // }
  }

  startDying() {
    this.destroy();
  }
}

export default MantisMan;
