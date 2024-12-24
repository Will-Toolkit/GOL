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
  }

}

export default GOLController;