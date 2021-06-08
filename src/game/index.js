import * as Phaser from "phaser";

import GameScene from "./game_scene";
import Level1 from "./level1";
import Level2 from "./level2";
import BackgroundScene from "./background_scene";

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
          debug: false,
        },
      },
      render: {
        pixelArt: true,
        // antialias: false,
      },
      parent: "gameContainer",
      scene: [Level1, BackgroundScene, Level2],
    };
    super(config);
    this.react = react;
  }
}

export default Game;
