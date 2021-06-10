import * as Phaser from "phaser";

export const SHIELD = {
  asset: "shield",
  powers: {
    shield: true,
  },
};

export const ROCKET = {
  asset: "rocket",
  powers: {
    rocket: true,
    num_rockets: 5
  },
};

class PowerUp extends Phaser.GameObjects.Container {
  constructor(scene, x, y, props) {
    super(scene, x, y);

    this.props = props;

    this.powers = props.powers;

    scene.anims.create({
      key: "powerup_pulse",
      frames: scene.anims.generateFrameNumbers("powerup"),
      frameRate: 8,
    });

    scene.anims.create({
      key: `${props.asset}_anim`,
      frames: scene.anims.generateFrameNumbers(props.asset),
      frameRate: 8,
    });

    this._powerup = scene.add.sprite(0, 0, "powerup");
    this._powerup.play({ key: "powerup_pulse", repeat: -1 });

    this._asset = scene.add.sprite(0, 0, props.asset);

    this.add(this._powerup);
    this.add(this._asset);
    scene.refs.powerups.add(this);

    scene.physics.world.enable(this);
    this.body.setCircle(10, -10, -10);
  }
}

export default PowerUp;
