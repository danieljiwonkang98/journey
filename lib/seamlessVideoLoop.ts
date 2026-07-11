/** Restart just before `ended` so native `loop` doesn't hitch. */
const LOOP_EPSILON_SEC = 0.05;

export function attachSeamlessLoop(
  video: HTMLVideoElement,
  onLoop?: () => void,
): () => void {
  let frame = 0;
  let looping = false;

  const tick = () => {
    const { duration, currentTime, paused } = video;

    if (
      !paused &&
      !looping &&
      Number.isFinite(duration) &&
      duration > 0 &&
      currentTime >= duration - LOOP_EPSILON_SEC
    ) {
      looping = true;

      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        looping = false;
      };
      video.addEventListener("seeked", onSeeked);

      video.currentTime = 0;
      onLoop?.();
    }

    frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frame);
}
