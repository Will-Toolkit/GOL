import GOLGrid from "./scripts/GOLGrid.js";

const gridEl = document.querySelector(".gol-grid");
const controllerEl = document.querySelector(".gol-controller");

const grid = new GOLGrid(gridEl, 20, 20, 0, true, controllerEl);

window.grid = grid;