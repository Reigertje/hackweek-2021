import * as Phaser from "phaser";

import GameScene from "./game_scene";
import BackgroundScene from "./background_scene";
import BootScene from "./boot_scene";

class Game extends Phaser.Game {
  constructor(react) {
    const config = {
      backgroundColor: "#000000",
      // transparent: true,
      type: Phaser.AUTO,
      width: 640,
      height: 360,
      physics: {
        default: "arcade",
        arcade: {
          fps: 60,
          gravity: { y: 0 },
          debug: true,
        },
      },
      render: {
        pixelArt: true,
        // antialias: false,
      },
      parent: "gameContainer",
      scene: [GameScene],
    };
    super(config);
    this.react = react;
  }
}

export default Game;