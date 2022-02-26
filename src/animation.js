export const animateMovement = (gameState) => {
  if (
    !gameState.player.anims.isPlaying &&
    (gameState.cursors.up.isDown ||
      gameState.cursors.down.isDown ||
      gameState.cursors.right.isDown ||
      gameState.cursors.left.isDown)
  ) {
    gameState.player.play("running");
  } else if (
    !gameState.cursors.up.isDown &&
    !gameState.cursors.down.isDown &&
    !gameState.cursors.right.isDown &&
    !gameState.cursors.left.isDown &&
    gameState.player.anims.isPlaying
  ) {
    gameState.player.stop("running");
  }
};
