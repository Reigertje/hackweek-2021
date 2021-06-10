import * as Phaser from "phaser";

import Level from "./gen/level";

import { randomInt } from "./gen/random";

import Player from "./objects/player";
import Mosquito from "./objects/mosquito";
import MantisMan from "./objects/mantisman";

import Bullet1 from "./objects/bullet1";
import Portal from "./objects/portal";
import PowerUp, { SHIELD } from "./objects/powerup";

import LevelScene from "./level_scene";

import { Template } from "./gen/level_templates";

class BossScene extends LevelScene {
  constructor(key, props) {
    super(key, props);
    this.refs = {};
  }

  preload() {
    super.preload();

    this.load.spritesheet("mantisman", "assets/mantisboss.png", {
      frameWidth: 96,
      frameHeight: 67,
    });
  }

  generateLevel() {
    const level = new Level(
      1,
      1,
      this.props.template.width,
      this.props.template.height
    );

    console.log(this.props.template);

    level.loadTemplate(this.props.template);

    const map = this.make.tilemap({
      width: level.width,
      height: level.height,
      tileWidth: 24,
      tileHeight: 24,
    });

    const tileset = map.addTilesetImage("tiles");

    const layer1 = map.createBlankLayer("layer1", tileset);

    for (let y = 0; y < level.height; ++y) {
      for (let x = 0; x < level.width; ++x) {
        const ty = level.height - 1 - y;

        if (level.at(x, y) === "#") {
          layer1.putTileAt(randomInt(4), x, ty);
        } else if (level.at(x, y) === "C") {
          const p = level.getRoomPosition(x, y);
          if (p.x === 0 && p.y === 0) {
            // Create player
            this.refs.player = this.add.existing(
              new Player(this, x * 24, ty * 24)
            );
            this.cameras.main.startFollow(this.refs.player);
            this.cameras.main.setZoom(2);
          } else if (
            p.x === level.mazeWidth - 1 &&
            p.y === level.mazeHeight - 1
          ) {
            // this.add.existing(new Portal(this, x * 24 + 12, ty * 24 + 12));
          } else {
            this.spawnPowerUp(x * 24 + 12, ty * 24 + 12);
          }
        } else if (level.at(x, y) === "1" && randomInt(2) === 0) {
          // const enemy = new Mosquito(this, x * 24 + 12, ty * 24 + 12);
          // this.add.existing(enemy);
        } else if (level.at(x, y) === "P" && randomInt(2) === 0) {
          // this.spawnPowerUp(x * 24 + 12, ty * 24 + 12);
        } else if (level.at(x, y) === "M") {
          this.add.existing(new MantisMan(this, x * 24 + 12, y * 24 + 12));
        }
      }
    }

    map.setCollision([0, 1, 2, 3], true, false, "layer1", true);

    this.refs.tiles = layer1;
  }

  create() {
    super.create();
    // Create groups
    this.refs.bullets = this.physics.add.group({
      classType: Bullet1,
      maxSize: 30,
      runChildUpdate: true,
      width: 40,
      hitArea: new Phaser.Geom.Rectangle(0, 0, 1, 1),
    });

    this.refs.enemies = this.physics.add.group();
    this.refs.portals = this.physics.add.group();
    this.refs.powerups = this.physics.add.group();

    // Create input
    this.refs.cursors = this.input.keyboard.createCursorKeys();

    this.generateLevel();
  }
}

export default BossScene;
