const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  const sounds = document.querySelector(".sound-picker");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelector(".time-select");

  const outlineLength = outline.getTotalLength();

  let Duration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = icons.pauseIcon;
    } else {
      song.pause();
      video.pause();
      play.src = icons.playIcon;
    }

    song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      let elapsed = Duration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);

      let progress = outlineLength - (currentTime / Duration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      timeDisplay.textContent = `${minutes}:${seconds}`;

      if (currentTime >= Duration) {
        song.pause();
        song.currentTime = 0;
        play.src = icons.playIcon;
        video.pause();
      }
    };
  };

  sounds.addEventListener("click", function (event) {
    const elem =
      event.target.tagName !== "BUTTON"
        ? event.target.closest("button")
        : event.target;
    if (elem) {
      song.src = elem.dataset.sound;
      video.src = elem.dataset.video;
      checkPlaying(song);
    }
  });

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  timeSelect.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;

    Duration = event.target.dataset.time;
    const durationSeconds = Math.floor(Duration % 60)
      ? Math.floor(Duration % 60)
      : "00";
    timeDisplay.textContent = `${Math.floor(Duration / 60)}:${durationSeconds}`;
  });
};
