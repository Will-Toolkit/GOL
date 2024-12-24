import GOLController from "./GOLController.js";

const neighbors = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1]
];

function clamp(set, min, max) {
  return Math.min(Math.max(set, min), max);
}

class GOLGrid {
  constructor(element, width = 3, height = 3, percentFilled, wraps, controllerTarget) {
    this.el = element;
    this.width = width;
    this.height = height;
    this.chance = percentFilled;

    this.rules = {
      wraps: wraps,
      startThreshold: [3, 3],
      stayThreshold: [2, 3]
    };

    this.init();
    this.controller = new GOLController(controllerTarget, this);
  }

  init() {
    this.el.style.setProperty("--cellColumns", `${this.width}`);
    this.array = [];
    this.oldArray = [];
    this.elems = [];
    for (let i = 0; i < this.height; i++) {
      this.array[i] = [];
      this.elems[i] = [];
      for (let j = 0; j < this.width; j++) {
        const isOn =
          Math.floor(Math.random() * 100) < this.chance ? true : false;
        this.array[i][j] = isOn;

        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        if (isOn) {
          newCell.classList.add("active");
        }

        const curX = j;
        const curY = i;

        newCell.addEventListener("mousedown", () => {
          this.toggleCell(curX, curY);
        });

        this.elems[i][j] = newCell;
        this.el.append(newCell);
      }
    }
  }

  clear() {
    while (this.el.lastElementChild) {
      this.el.removeChild(this.el.lastElementChild);
    }
    this.init();
  }

  getCell(x, y, arrayType) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      console.error(`getCell: x and/or y aren't integers
x: ${x}
y: ${y}`);
      return null;
    }
    
    const target = arrayType == "old" ? this.oldArray : this.array;

    return target[y][x];
  }

  setCell(x, y, setTo) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      console.error(`setCell: x and/or y aren't integers
  x: ${x}
  y: ${y}`);
      return null;
    }

    this.array[y][x] = setTo;


    if (setTo === true) {
      this.elems[y][x].classList.add("active");
    } else {
      this.elems[y][x].classList.remove("active");
    }
  }

  toggleCell(x, y) {
    if (this.getCell(x, y, null) == true) {
      this.setCell(x, y, false);
    } else {
      this.setCell(x, y, true);
    }
  }

  step() {
    this.copyToOld();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.height; j++) {
        this.checkLogic(j, i);
      }
    }
  }

  /*
  Clamps a number between 0 and max.
  If it's outside the threshold, it wraps around to the other side of the number.
  e.g. wrapClamp(9, 8) returns 1.
  wrapClamp(-4, 8) returns 4.
  Built to work with indices of arrays (so 0 based)
  */
  wrapClamp(value, max) {
    if (value < 0) {
      return this.wrapClamp(max + value, max);
    } else if (value > max - 1) {
      return this.wrapClamp(value - max, max);
    } else {
      return value;
    }
  }

  getRelCoords(coord, relCoord) {
    if (this.rules.wraps) {
      return {
        x: this.wrapClamp(coord.x + relCoord.x, this.width),
        y: this.wrapClamp(coord.y + relCoord.y, this.height)
      };
    } else {
      return {
        empty: true
      };
    }
  }

  checkNeighbor(coord, relCoord, arrayType = null) {
    const neighbor = this.getRelCoords(coord, relCoord);
    if (neighbor?.empty == true) {
      return false;
    } else {
      return this.getCell(neighbor.x, neighbor.y, arrayType);
    }
  }

  copyToOld() {
    this.oldArray = [];
    for (let i = 0; i < this.array.length; i++) {
      this.oldArray[i] = this.array[i].slice();
    }
  }

  checkLogic(targetX, targetY) {
    const coord = {x: targetX, y: targetY};
    let totalLiveNeighbors = 0;
    neighbors.forEach((relArray) => {
      let relCoord = {x: relArray[0], y: relArray[1]};
      if (this.checkNeighbor(coord, relCoord, "old") == true) {
        totalLiveNeighbors += 1;
      }
    });
    
    // console.log(`Cell at ${coord.x},${coord.y} has ${totalLiveNeighbors} live neighbors`);

    let clamping;
    // If cell is currently alive
    if (this.getCell(coord.x, coord.y) == true) {
      clamping = this.rules.stayThreshold;
    }
    // Else, if cell is currently dead
    else {
      clamping = this.rules.startThreshold;
    }

    if (totalLiveNeighbors == clamp(totalLiveNeighbors, clamping[0], clamping[1])) {
      this.setCell(coord.x, coord.y, true);
    } else {
      this.setCell(coord.x, coord.y, false);
    }
  }
}

export default GOLGrid;
