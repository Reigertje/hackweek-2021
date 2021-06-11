import * as Phaser from "phaser";

import Bullet from "./objects/bullet1";
import Rocket from "./objects/rocket";
import Player from "./objects/player";
import Mosquito from "./objects/mosquito";
import Portal from "./objects/portal";
import MantisMan from "./objects/mantisman";
import BigSpider from "./objects/bigspider";
import PowerUp, { SHIELD, ROCKET } from "./objects/powerup";

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

    this.load.spritesheet("rocket", "assets/rocket.png", {
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

    this.cameras.main.setBounds(0, 0, level.width * 24, level.height * 24);
    this.physics.world.setBounds(0, 0, level.width * 24, level.height * 24);

    return tiles;
  }

  buildTile(tiles, tile, tileX, tileY, levelX, levelY, isStart, isExit) {
    switch (tile) {
      case "#":
        tiles.putTileAt(randomInt(2), tileX, tileY);
        break;
      case "C":
        if (isStart) {
          this.refs.player = this.add.existing(
            new Player(this, levelX, levelY)
          );
        } else if (isExit) {
          this.add.existing(new Portal(this, levelX, levelY));
        } else {
          this.add.existing(
            new PowerUp(this, levelX, levelY, this.selectRandomPowerup())
          );
        }
        break;
      case "1":
        if (randomInt(2) === 0) {
          this.add.existing(new Mosquito(this, levelX, levelY));
        }
        break;
      case "P":
        this.add.existing(
          new PowerUp(this, levelX, levelY, this.selectRandomPowerup())
        );
        break;
      case "M":
        this.refs.boss = this.add.existing(new MantisMan(this, levelX, levelY));
        break;
      case "S":
        this.refs.boss = this.add.existing(
          new BigSpider(this, levelX, levelY + 36)
        );
        break;
      default:
        break;
    }
  }

  addDefaultColliders() {
    const {
      player,
      tiles,
      enemies,
      bullets,
      portals,
      powerups,
      rockets,
    } = this.refs;

    this.physics.add.collider(player, tiles, (player, tile) => {
      player.damageOrKill();
    });

    this.physics.add.collider(bullets, tiles, (bullet, _tile) => {
      bullet.kill();
    });
    this.physics.add.collider(rockets, tiles, (rocket, _tile) => {
      rocket.kill();
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
    this.physics.add.collider(enemies, rockets, (enemy, rocket) => {
      rocket.kill();
      enemy.hit(5);
    });
    this.physics.add.overlap(player, enemies, (player, enemy) => {
      if (player.hasShield()) {
        player.destroyShield();
        enemy.hit(1);
      } else {
        player.damageOrKill();
      }
    });
    this.physics.add.overlap(player, portals, (player, portal) => {
      if (portal.body.wasTouching.none && !this.cutscene) this.nextLevel();
    });
    this.physics.add.overlap(player, powerups, (player, powerup) => {
      player.pickUpPowerUp(powerup);
    });
  }

  create() {
    this.cutscene = false;
    this.cameras.main.setZoom(2);
    // Set background
    const bg = this.add.image(320, 180, "background");
    bg.setScrollFactor(0);
    bg.setDepth(-100);

    // Create input
    this.refs.cursors = this.input.keyboard.createCursorKeys();

    // Create physics groups
    this.refs.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });
    this.refs.rockets = this.physics.add.group({
      classType: Rocket,
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
        this.scene.restart();
      },
      [],
      this
    );

    // Add timed event to call this.create()
  }

  nextLevel() {
    console.log("Hello");
    if (this.props.next) {
      this.cutscene = true;

      this.cameras.main.fade(250, 163, 2, 255, true, (cam, progress) => {
        if (progress === 1) this.scene.start(this.props.next);
        console.log(progress);
      });
    } else {
      // TODO last level completed?
      console.log("you won!");
    }
  }

  restartGame() {
    this.time.delayedCall(
      3000,
      () => {
        this.scene.start("level_1");
      },
      [],
      this
    );
  }

  selectRandomPowerup() {
    var items = [SHIELD, ROCKET];
    return items[Math.floor(Math.random() * items.length)];
  }
}

export default LevelScene;
