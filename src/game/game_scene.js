import * as Phaser from "phaser";
import LevelGenerator from "./gen/level_generator";
import BackgroundScene from "./background_scene";

import { randomInt } from "./gen/random";

import Player from "./objects/player";
import Enemy1 from "./objects/enemy1";

import Bullet from "./gobj/bullet";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image("enemy", "assets/enemy.png");
    this.load.image("wall", "assets/wall.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("ship", "assets/ship.png");
    this.load.spritesheet("exhaust", "assets/exhaust.png", {
      frameWidth: 13,
      frameHeight: 13,
    });
    this.load.spritesheet("midge", "assets/midge_enemy.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  create() {
    this.scene.add("background", BackgroundScene, true, { x: 400, y: 300 });
    this.scene.bringToTop();
    const level = new LevelGenerator().generate();

    const player = this.add.existing(new Player(this, 50, 50));

    this.add.sprite(0, 0, "bullet");

    this.add.sprite(0, 24, "bullet");

    const bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });

    const enemies = this.physics.add.group();

    const cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({
      width: level.width,
      height: level.height,
      tileWidth: 24,
      tileHeight: 24,
    });
    const tileset = map.addTilesetImage("wall");

    const layer1 = map.createBlankLayer("layer1", tileset);

    for (let y = 0; y < level.height; ++y) {
      for (let x = 0; x < level.width; ++x) {
        const ty = level.height - 1 - y;

        if (level.at(x, y) === "#") {
          layer1.putTileAt(randomInt(4), x, ty);
        } else if (level.at(x, y) === "1" && randomInt(2) === 0) {
          const enemy = new Enemy1(this, x * 24 + 12, ty * 24 + 12);
          this.add.existing(enemy);
          enemies.add(enemy);
        }
      }
    }

    map.setCollision([0, 1, 2, 3], true, false, "layer1", true);
    this.physics.add.collider(player, layer1);
    this.physics.add.collider(bullets, layer1, (bullet, _tile) => {
      bullet.kill();
    });
    this.physics.add.collider(enemies, layer1, (enemy, _) => {
      enemy.turn();
    });

    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(2);

    this.refs = {
      player,
      bullets,
      cursors,
    };
  }

  update() {}
}

export default GameScene;
