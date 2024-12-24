class GOLController {
  constructor(element, grid) {
    this.el = element;
    this.grid = grid;
    this.states = {
      playing: false,
      intervalId: null
    };

    this.init();
  }

  init() {
    // Make Play button
    const playBtn = document.createElement("a");
    this.el.append(playBtn);
    playBtn.classList.add("btn", "play");
    playBtn.href = "javascript:;";
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i>`

    playBtn.addEventListener("click", () => {
      if (this.states.playing === false) {
        this.states.playing = true;
        playBtn.classList.add("active")
        this.states.intervalID = setInterval(() => {
          this.grid?.step();
        }, 100);
      } else if (this.states.playing === true) {
        this.states.playing = false;
        playBtn.classList.remove("active");
        clearInterval(this.states.intervalID);
        this.states.intervalId = null;
      }
    });

    // Make Step button
    const stepBtn = document.createElement("a");
    this.el.append(stepBtn);
    stepBtn.classList.add("btn", "step");
    stepBtn.href = "javascript:;";
    stepBtn.innerHTML = "Step";

    stepBtn.addEventListener("click", () => {
      this.grid?.step();
    });

    // Make Clear button
    const clearBtn = document.createElement("a");
    this.el.append(clearBtn);
    clearBtn.classList.add("btn", "clear");
    clearBtn.href = "javascript:;";
    clearBtn.innerHTML = "Clear";

    clearBtn.addEventListener("click", () => {
      this.grid.clear();
    });
  }

}

export default GOLController;