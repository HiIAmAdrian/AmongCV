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

const gameState = {};

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
    gameState.obstacle = this.physics.add.sprite(
      GATHER_STAR_X,
      GATHER_STAR_Y,
      "star"
    );
    gameState.obstacle.setScale(0.01);
    gameState.player = this.physics.add.sprite(
      PLAYER_START_X,
      PLAYER_START_Y,
      "player"
    );

    gameState.player.displayHeight = PLAYER_HEIGHT;
    gameState.player.displayWidth = PLAYER_WIDTH;

    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(
      gameState.player,
      gameState.obstacle,
      doAtCollide
    );

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 24,
      repeat: -1,
    });
  }

  update() {
    this.scene.scene.cameras.main.centerOn(
      gameState.player.x,
      gameState.player.y
    );
    movePlayer(gameState);
    animateMovement(gameState);
    this.physics.collide(gameState.player, star, () => alert());
  }
}

function doAtCollide(player, obstacle) {
  gameState.obstacle.destroy();
  let element = document.getElementById("modalCV");
  let element2 = document.getElementById("m1-o");
  if (element) {
    element.style.display = "flex";
    element.style.position = "absolute";
    element.style.zIndex = "1";
    element2.style.display = "flex";

    document.getElementById("closeButton").addEventListener("click", () => {
      element.style.display = "none";
      element.style.zIndex = "-1";
      element2.style.display = "none";
    });
  }
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
