import * as Phaser from "phaser";
import LevelGenerator from "./gen/level_generator";

import { randomInt } from "./gen/random";

import Player from "./objects/player";
import Mosquito from "./objects/mosquito";

import Bullet1 from "./objects/bullet1";

import LevelScene from "./level_scene";

class GeneratedLevelScene extends LevelScene {
  constructor(key, props) {
    super(key, props);
    this.refs = {};
  }

  preload() {
    super.preload();

    this.textures.remove("tiles");
    this.load.image("tiles", this.props.tilesAsset);

    this.load.image("enemy", "assets/enemy.png");

    this.load.spritesheet("bullet", "assets/bullet.png", {
      frameWidth: 16,
      frameHeight: 9,
    });
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.spritesheet("exhaust", "assets/exhaust.png", {
      frameWidth: 13,
      frameHeight: 13,
    });
    this.load.spritesheet("midge", "assets/midge_enemy.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  generateLevel() {
    const level = new LevelGenerator().generate(
      this.props.mazeWidth,
      this.props.mazeHeight
    );

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
          }
          if (p.x === level.mazeWidth - 1 && p.y === level.mazeHeight - 1) {
            this.refs.portal = this.add.sprite(x * 24, ty * 24, "enemy");
            this.physics.world.enable(this.refs.portal);
          }
        } else if (level.at(x, y) === "1" && randomInt(2) === 0) {
          const enemy = new Mosquito(this, x * 24 + 12, ty * 24 + 12);
          this.add.existing(enemy);
        }
      }
    }

    map.setCollision([0, 1, 2, 3], true, false, "layer1", true);

    this.refs.tiles = layer1;
  }

  createColliders() {
    const { player, tiles, enemies, bullets } = this.refs;

    this.physics.add.collider(player, tiles);
    this.physics.add.collider(bullets, tiles, (bullet, _tile) => {
      bullet.kill();
    });
    this.physics.add.collider(enemies, tiles, (enemy, _) => {
      enemy.turn();
    });
    this.physics.add.collider(enemies, bullets, (enemy, bullet) => {
      bullet.kill();
      enemy.hit(1);
    });
    this.physics.add.collider(player, enemies, (player, enemy) => {
      player.kill();
    });
    this.physics.add.collider(
      player,
      this.refs.portal,
      (player, portal) => {
        this.nextLevel();
      },
      (player, portal) => {
        return true;
      }
    );
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

    console.log(this.refs.bullets);

    this.refs.enemies = this.physics.add.group();

    // Create input
    this.refs.cursors = this.input.keyboard.createCursorKeys();

    this.generateLevel();

    this.createColliders();
  }

  update() {}
}

export default GeneratedLevelScene;