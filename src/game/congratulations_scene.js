import * as Phaser from "phaser";

class CongratulationsScene extends Phaser.Scene {
    constructor() {
        super("congratulations_scene");
    }

    preload() {
        this.load.spritesheet("congrats", "/assets/congratulations.png", {
            frameWidth: 800,
            frameHeight: 600,
            endFrame: 11,
        });
    }

    create() {
        this.anims.create({
            key: "play_congrats",
            frames: this.anims.generateFrameNumbers("congrats"),
            frameRate: 4,
        });

        const sprite = this.add.sprite(320, 180, "congrats");
        sprite.scale = 0.5;
        sprite.play({ key: "play_congrats" });
        this.add.text(0, 0, "Click to Restart the Game");
        this.add.text(450, 0, "Thanks for Playing!");
        this.input.once(
            "pointerdown",
            function () {
                this.scene.start("level_1");
            },
            this
        );
    }
}

export default CongratulationsScene;
