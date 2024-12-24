class GOLController {
  constructor(element, grid) {
    this.el = element;
    this.grid = grid;
    this.init();
  }

  init() {
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