import { PLAYER_SPEED } from "./constants";
import { mapBounds } from "./mapBound";
import { SHIP_HEIGHT, SHIP_WIDTH } from "./constants";

const isWithinMovementBoundries = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayer = (gameState) => {
  const absPlayerX = gameState.player.x + SHIP_WIDTH / 2;
  const absPlayerY = gameState.player.y + SHIP_HEIGHT / 2 + 15;
  if (
    gameState.cursors.up.isDown &&
    isWithinMovementBoundries(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    gameState.player.y -= PLAYER_SPEED;
  }
  if (
    gameState.cursors.down.isDown &&
    isWithinMovementBoundries(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    gameState.player.y += PLAYER_SPEED;
  }
  if (
    gameState.cursors.left.isDown &&
    isWithinMovementBoundries(absPlayerX - PLAYER_SPEED, absPlayerY)
  ) {
    gameState.player.x -= PLAYER_SPEED;
    gameState.player.flipX = true;
  }
  if (
    gameState.cursors.right.isDown &&
    isWithinMovementBoundries(absPlayerX + PLAYER_SPEED, absPlayerY)
  ) {
    gameState.player.x += PLAYER_SPEED;
    gameState.player.flipX = false;
  }
};
