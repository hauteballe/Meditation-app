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
      play.src = "./assets/svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./assets/svg/play.svg";
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
        play.src = "./assets/svg/play.svg";
        video.pause();
      }
    };
  };

  sounds.addEventListener("click", function (event) {
    let elem = event.target;
    if (elem.tagName !== "BUTTON") {
      elem = elem.closest("button");
    }
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
    let durationSeconds = Math.floor(Duration % 60);
    if (durationSeconds === 0) {
      durationSeconds = "00";
    }
    timeDisplay.textContent = `${Math.floor(Duration / 60)}:${durationSeconds}`;
  });
};
app();
