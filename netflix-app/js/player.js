/**
 * StreamFlix Custom Netflix Video Player Engine
 */

class NetflixPlayer {
  constructor() {
    this.container = document.getElementById("player-modal");
    this.video = document.getElementById("main-video");
    this.playBtn = document.getElementById("player-play-btn");
    this.rewindBtn = document.getElementById("player-rewind-btn");
    this.forwardBtn = document.getElementById("player-forward-btn");
    this.volumeBtn = document.getElementById("player-volume-btn");
    this.volumeSlider = document.getElementById("player-volume-slider");
    this.progressBar = document.getElementById("player-progress-bar");
    this.progressBuffered = document.getElementById("player-buffered-bar");
    this.progressPlayed = document.getElementById("player-played-bar");
    this.timeDisplay = document.getElementById("player-time-display");
    this.speedBtn = document.getElementById("player-speed-btn");
    this.speedMenu = document.getElementById("player-speed-menu");
    this.pipBtn = document.getElementById("player-pip-btn");
    this.fullscreenBtn = document.getElementById("player-fullscreen-btn");
    this.backBtn = document.getElementById("player-back-btn");
    this.titleEl = document.getElementById("player-title");
    this.spinner = document.getElementById("player-spinner");
    this.controlsOverlay = document.getElementById("player-controls-overlay");
    this.hoverTooltip = document.getElementById("player-hover-tooltip");

    this.hideTimeout = null;
    this.currentMovie = null;
    this.initEvents();
  }

  initEvents() {
    // Play/Pause
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.video.addEventListener("click", () => this.togglePlay());

    // Back to Browse
    this.backBtn.addEventListener("click", () => this.close());

    // Seek buttons
    this.rewindBtn.addEventListener("click", () => this.seek(-10));
    this.forwardBtn.addEventListener("click", () => this.seek(10));

    // Volume
    this.volumeBtn.addEventListener("click", () => this.toggleMute());
    this.volumeSlider.addEventListener("input", (e) => {
      this.video.volume = e.target.value;
      this.video.muted = (e.target.value === "0");
      this.updateVolumeIcon();
    });

    // Speed options
    this.speedBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.speedMenu.classList.toggle("hidden");
    });

    document.querySelectorAll(".speed-option").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const speed = parseFloat(e.target.dataset.speed);
        this.video.playbackRate = speed;
        this.speedBtn.textContent = speed + "x";
        this.speedMenu.classList.add("hidden");
      });
    });

    // PiP
    if (document.pictureInPictureEnabled) {
      this.pipBtn.addEventListener("click", async () => {
        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          } else {
            await this.video.requestPictureInPicture();
          }
        } catch (err) {
          console.warn("PiP error:", err);
        }
      });
    } else {
      this.pipBtn.style.display = "none";
    }

    // Fullscreen
    this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());

    // Progress bar click & drag
    this.progressBar.addEventListener("click", (e) => this.scrub(e));

    // Scrubber hover preview tooltip
    this.progressBar.addEventListener("mousemove", (e) => {
      const rect = this.progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const hoverTime = pos * this.video.duration;
      if (!isNaN(hoverTime)) {
        this.hoverTooltip.style.left = `${e.clientX - rect.left}px`;
        this.hoverTooltip.textContent = this.formatTime(hoverTime);
        this.hoverTooltip.classList.remove("hidden");
      }
    });

    this.progressBar.addEventListener("mouseleave", () => {
      this.hoverTooltip.classList.add("hidden");
    });

    // Video events
    this.video.addEventListener("timeupdate", () => this.onTimeUpdate());
    this.video.addEventListener("progress", () => this.onProgress());
    this.video.addEventListener("waiting", () => this.spinner.classList.remove("hidden"));
    this.video.addEventListener("canplay", () => this.spinner.classList.add("hidden"));
    this.video.addEventListener("play", () => {
      this.updatePlayBtn(true);
      this.startHideTimer();
    });
    this.video.addEventListener("pause", () => {
      this.updatePlayBtn(false);
      this.showControls();
    });
    this.video.addEventListener("ended", () => {
      this.updatePlayBtn(false);
      this.showControls();
    });

    // Mouse movement to show/hide controls
    this.container.addEventListener("mousemove", () => {
      this.showControls();
      this.startHideTimer();
    });

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if (this.container.classList.contains("hidden")) return;

      if (e.code === "Space" || e.code === "KeyK") {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === "ArrowLeft" || e.code === "KeyJ") {
        e.preventDefault();
        this.seek(-10);
      } else if (e.code === "ArrowRight" || e.code === "KeyL") {
        e.preventDefault();
        this.seek(10);
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        this.video.volume = Math.min(1, this.video.volume + 0.1);
        this.volumeSlider.value = this.video.volume;
        this.updateVolumeIcon();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        this.video.volume = Math.max(0, this.video.volume - 0.1);
        this.volumeSlider.value = this.video.volume;
        this.updateVolumeIcon();
      } else if (e.code === "KeyM") {
        e.preventDefault();
        this.toggleMute();
      } else if (e.code === "KeyF") {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.code === "Escape") {
        if (!document.fullscreenElement) {
          this.close();
        }
      }
    });

    // Close speed menu when clicking outside
    document.addEventListener("click", () => {
      if (this.speedMenu) this.speedMenu.classList.add("hidden");
    });
  }

  open(movie) {
    this.currentMovie = movie;
    this.titleEl.textContent = movie.title || "Now Playing";
    this.container.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Set video source
    this.video.src = movie.videoUrl;
    this.video.playbackRate = 1.0;
    this.speedBtn.textContent = "1x";
    this.progressPlayed.style.width = "0%";
    this.progressBuffered.style.width = "0%";
    this.timeDisplay.textContent = "00:00 / 00:00";

    this.video.play().catch((err) => {
      console.log("Auto-play blocked or waiting for user interaction:", err);
    });
    this.showControls();
    this.startHideTimer();
  }

  close() {
    this.video.pause();
    this.video.src = "";
    this.container.classList.add("hidden");
    document.body.style.overflow = "auto";
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  togglePlay() {
    if (this.video.paused || this.video.ended) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  seek(seconds) {
    this.video.currentTime = Math.max(0, Math.min(this.video.duration || 0, this.video.currentTime + seconds));
    this.showControls();
    this.startHideTimer();
  }

  scrub(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (!isNaN(this.video.duration)) {
      this.video.currentTime = pos * this.video.duration;
    }
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.volumeSlider.value = this.video.muted ? 0 : this.video.volume;
    this.updateVolumeIcon();
  }

  updateVolumeIcon() {
    const isMuted = this.video.muted || this.video.volume === 0;
    const volIcon = document.getElementById("volume-icon");
    if (isMuted) {
      volIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>`;
    } else if (this.video.volume > 0.5) {
      volIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
    } else {
      volIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  onTimeUpdate() {
    const cur = this.video.currentTime || 0;
    const dur = this.video.duration || 0;
    if (dur > 0) {
      const pct = (cur / dur) * 100;
      this.progressPlayed.style.width = `${pct}%`;
    }
    this.timeDisplay.textContent = `${this.formatTime(cur)} / ${this.formatTime(dur)}`;
  }

  onProgress() {
    if (this.video.buffered.length > 0 && this.video.duration) {
      const bufferedEnd = this.video.buffered.end(this.video.buffered.length - 1);
      const pct = (bufferedEnd / this.video.duration) * 100;
      this.progressBuffered.style.width = `${pct}%`;
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  updatePlayBtn(isPlaying) {
    const icon = this.playBtn.querySelector("svg");
    if (isPlaying) {
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />`;
    } else {
      icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
    }
  }

  showControls() {
    this.controlsOverlay.style.opacity = "1";
    this.container.style.cursor = "default";
  }

  startHideTimer() {
    clearTimeout(this.hideTimeout);
    if (!this.video.paused) {
      this.hideTimeout = setTimeout(() => {
        this.controlsOverlay.style.opacity = "0";
        this.container.style.cursor = "none";
      }, 2500);
    }
  }
}

window.NetflixPlayer = NetflixPlayer;
