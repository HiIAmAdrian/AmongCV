import { PLAYER_SPEED } from "./constants";
import { mapBounds } from "./mapBound";
import { SHIP_HEIGHT, SHIP_WIDTH } from "./constants";

const isWithinMovementBoundries = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayer = (keys, player) => {
  const absPlayerX = player.x + SHIP_WIDTH / 2;
  const absPlayerY = player.y + SHIP_HEIGHT / 2 + 15;
  if (
    keys.includes("ArrowUp") &&
    isWithinMovementBoundries(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    player.y -= PLAYER_SPEED;
  }
  if (
    keys.includes("ArrowDown") &&
    isWithinMovementBoundries(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    player.y += PLAYER_SPEED;
  }
  if (
    keys.includes("ArrowLeft") &&
    isWithinMovementBoundries(absPlayerX - PLAYER_SPEED, absPlayerY)
  ) {
    player.x -= PLAYER_SPEED;
    player.flipX = true;
  }
  if (
    keys.includes("ArrowRight") &&
    isWithinMovementBoundries(absPlayerX + PLAYER_SPEED, absPlayerY)
  ) {
    player.x += PLAYER_SPEED;
    player.flipX = false;
  }
};
