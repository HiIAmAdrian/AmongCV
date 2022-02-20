export const animateMovement = (keys, player) => {
  const runningKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (
    !player.anims.isPlaying &&
    keys.some((key) => runningKeys.includes(key))
  ) {
    player.play("running");
  } else if (
    !keys.some((key) => runningKeys.includes(key)) &&
    player.anims.isPlaying
  ) {
    player.stop("running");
  }
};
