import * as Phaser from "phaser";

import Bullet from "./objects/bullet1";
import Player from "./objects/player";
import Mosquito from "./objects/mosquito";
import Portal from "./objects/portal";
import MantisMan from "./objects/mantisman";
import PowerUp, { SHIELD } from "./objects/powerup";

import { randomInt } from "./gen/random";

class LevelScene extends Phaser.Scene {
  constructor(key, props) {
    super(key);
    this.props = props;
    this.refs = {};
  }

  preload() {
    this.textures.remove("background");
    this.load.image("background", this.props.backgroundAsset);

    this.load.spritesheet("powerup", "assets/powerup.png", {
      frameWidth: 24,
      frameHeight: 24,
    });

    this.load.spritesheet("shield", "assets/shield.png", {
      frameWidth: 24,
      frameHeight: 24,
    });

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

    this.textures.remove("tiles");
    this.load.image("tiles", this.props.tilesAsset);

    this.load.spritesheet("portal", "assets/portal.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
  }

  buildLevel() {
    const level = this.getLevel();

    const map = this.make.tilemap({
      width: level.width,
      height: level.height,
      tileWidth: 24,
      tileHeight: 24,
    });

    const tileset = map.addTilesetImage("tiles");

    const tiles = map.createBlankLayer("tiles", tileset);

    for (let y = 0; y < level.height; ++y) {
      for (let x = 0; x < level.width; ++x) {
        const roomPosition = level.getRoomPosition(x, y);
        const tileY = level.height - 1 - y;
        const tileX = x;

        const roomX = roomPosition.x;
        const roomY = roomPosition.y;

        const levelX = tileX * 24 + 12;
        const levelY = tileY * 24 + 12;

        const isStart = roomX === 0 && roomY === 0;
        const isExit =
          roomX === level.mazeWidth - 1 && roomY === level.mazeHeight - 1;

        this.buildTile(
          tiles,
          level.at(x, y),
          tileX,
          tileY,
          levelX,
          levelY,
          isStart,
          isExit
        );
      }
    }

    map.setCollision([0, 1, 2, 3], true, false, "tiles", true);

    return tiles;
  }

  buildTile(tiles, tile, tileX, tileY, levelX, levelY, isStart, isExit) {
    switch (tile) {
      case "#":
        tiles.putTileAt(randomInt(4), tileX, tileY);
        break;
      case "C":
        if (isStart) {
          this.refs.player = this.add.existing(
            new Player(this, levelX, levelY)
          );
          this.cameras.main.startFollow(this.refs.player);
          this.cameras.main.setZoom(2);
        } else if (isExit) {
          this.add.existing(new Portal(this, levelX, levelY));
        } else {
          this.add.existing(new PowerUp(this, levelX, levelY, SHIELD));
        }
        break;
      case "1":
        if (randomInt(2) === 0) {
          this.add.existing(new Mosquito(this, levelX, levelY));
        }
        break;
      case "P":
        this.add.existing(new PowerUp(this, levelX, levelY, SHIELD));
        break;
      case "M":
        this.add.existing(new MantisMan(this, levelX, levelY));
        break;
      default:
        break;
    }
  }

  addDefaultColliders() {
    const { player, tiles, enemies, bullets, portals, powerups } = this.refs;

    this.physics.add.collider(player, tiles, (player, tile) => {
      player.kill();
    });

    this.physics.add.collider(bullets, tiles, (bullet, _tile) => {
      bullet.kill();
    });
    this.physics.add.collider(enemies, tiles, (enemy, _) => {
      enemy.turn();
    });
    this.physics.add.overlap(enemies, bullets, (enemy, bullet) => {
      if (bullet.isLethal()) {
        bullet.kill();
        enemy.hit(1);
      }
    });
    this.physics.add.overlap(player, enemies, (player, enemy) => {
      player.kill();
    });
    this.physics.add.overlap(player, portals, (player, portal) => {
      if (portal.body.wasTouching.none) this.nextLevel();
    });
    this.physics.add.overlap(player, powerups, (player, powerup) => {
      player.pickUpPowerUp(powerup);
    });
  }

  create() {
    // Set background
    this.add.image(320, 180, "background").setScrollFactor(0);

    // Create input
    this.refs.cursors = this.input.keyboard.createCursorKeys();

    // Create physics groups
    this.refs.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });
    this.refs.enemies = this.physics.add.group();
    this.refs.portals = this.physics.add.group();
    this.refs.powerups = this.physics.add.group();

    this.refs.tiles = this.buildLevel();

    this.addDefaultColliders();
  }

  setBackground() {}

  respawn() {
    this.time.delayedCall(
      3000,
      () => {
        this.create();
      },
      [],
      this
    );

    // Add timed event to call this.create()
  }

  nextLevel() {
    if (this.props.next) {
      this.scene.start(this.props.next);
    } else {
      // TODO last level completed?
      console.log("you won!");
    }
  }
}

export default LevelScene;
