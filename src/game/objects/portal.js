import * as Phaser from "phaser";

class Portal extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "portal");

    this.anims.create({
      key: "portal_big",
      frames: this.anims.generateFrameNumbers("portal", { start: 39, end: 51 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "portal_growing",
      frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 38 }),
      frameRate: 16,
      repeat: 0,
    });
    this.speed = 75;

    this.play({ key: "portal_growing", repeat: 0 });

    this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.play({ key: "portal_big", repeat: -1 });
      scene.physics.world.enable(this);
      this.body.setCircle(12, 13, 13);
      scene.refs.portals.add(this);
    });

    this.setDepth(-10);
  }
}

export default Portal;
