import Phaser from "phaser";
import shipImg from "./assets/ship.png";
import playerSprite from "./assets/player.png";
import {
  PLAYER_HEIGHT,
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_WIDTH,
} from "./constants";
import { movePlayer } from "./movement";
import { animateMovement } from "./animation";
import { GATHER_STAR_X, GATHER_STAR_Y } from "./starLocations";
import star from "./assets/star.png";

const player = {};
let pressedKeys = [];
let obstacle;

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("ship", shipImg);
    this.load.image("star", star);
    this.load.spritesheet("player", playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
  }

  create() {
    const ship = this.add.image(0, 0, "ship");
    obstacle = this.physics.add.sprite(GATHER_STAR_X, GATHER_STAR_Y, "star");
    obstacle.setScale(0.01);
    player.sprite = this.physics.add.sprite(
      PLAYER_START_X,
      PLAYER_START_Y,
      "player"
    );
    player.sprite.displayHeight = PLAYER_HEIGHT;
    player.sprite.displayWidth = PLAYER_WIDTH;

    this.physics.add.collider(
      player.sprite,
      obstacle,
      function (player, obstacle) {
        obstacle.destroy();
        alert();
      }
    );

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 24,
      repeat: -1,
    });

    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });
  }

  update() {
    this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
    movePlayer(pressedKeys, player.sprite);
    animateMovement(pressedKeys, player.sprite);
    this.physics.collide(player.sprite, star, collectStar);
  }
}

function collectStar(player, star) {
  console.log("hit");
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 450,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
