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
import {
  ADMIN_STAR_X,
  ADMIN_STAR_Y,
  WEAPONS_STAR_X,
  WEAPONS_STAR_Y,
  MED_STAR_X,
  MED_STAR_Y,
  ELECTRIC_STAR_X,
  ELECTRIC_STAR_Y,
} from "./starLocations";
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
    gameState.obstacleAdmin = this.physics.add.sprite(
      ADMIN_STAR_X,
      ADMIN_STAR_Y,
      "star"
    );
    gameState.obstacleWeapons = this.physics.add.sprite(
      WEAPONS_STAR_X,
      WEAPONS_STAR_Y,
      "star"
    );
    gameState.obstacleMed = this.physics.add.sprite(
      MED_STAR_X,
      MED_STAR_Y,
      "star"
    );
    gameState.obstacleElectric = this.physics.add.sprite(
      ELECTRIC_STAR_X,
      ELECTRIC_STAR_Y,
      "star"
    );
    gameState.obstacleAdmin.setScale(0.01);
    gameState.obstacleWeapons.setScale(0.01);
    gameState.obstacleMed.setScale(0.01);
    gameState.obstacleElectric.setScale(0.01);

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
      gameState.obstacleAdmin,
      doAtCollide
    );
    this.physics.add.collider(
      gameState.player,
      gameState.obstacleMed,
      doAtCollide
    );
    this.physics.add.collider(
      gameState.player,
      gameState.obstacleElectric,
      doAtCollide
    );
    this.physics.add.collider(
      gameState.player,
      gameState.obstacleWeapons,
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
  }
}

function doAtCollide(player, obstacle) {
  let modalBox = "Education";
  let modalContainer = "education-o";
  let closeButton = "closeButtonEducation";

  if (obstacle.x === WEAPONS_STAR_X) {
    modalBox = "Projects";
    modalContainer = "projects-o";
    closeButton = "closeButtonProjects";
  } else if (obstacle.x === MED_STAR_X) {
    modalBox = "Work";
    modalContainer = "work-o";
    closeButton = "closeButtonWork";
  } else if (obstacle.x === ELECTRIC_STAR_X) {
    modalBox = "Volunteer";
    modalContainer = "volunteer-o";
    closeButton = "closeButtonVolunteer";
  }

  obstacle.destroy();
  let element = document.getElementById(modalBox);
  let element2 = document.getElementById(modalContainer);
  if (element) {
    element.style.display = "flex";
    element.style.position = "absolute";
    element.style.zIndex = "1";
    element2.style.display = "flex";

    document.getElementById(closeButton).addEventListener("click", () => {
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
