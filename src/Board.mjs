import _ from "lodash";
import { isAliveNextRound } from "./Logic.mjs";

export class Board {
  grid;
  height;
  width;

  constructor(height, width) {
    this.grid = [];
    this.height = height;
    this.width = width;

    for (let i = 0; i < height; i++) {
      const row = [];

      for(let j = 0; j < width; j++) {
        row.push('.');
      }

      this.grid.push(row);
    }
  }

  toString() {
    let ans = '';
    this.grid.forEach((row, index) => {
      if (index > 0) ans += '\n';
      row.forEach(point => {
        ans += point;
      })
    })
    return ans;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  tick() {
    const newGrid = _.cloneDeep(this.grid);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        newGrid[i][j] = this.getNewValue(i, j);
      }
    }
    this.grid = newGrid;
  }

  getNewValue(x, y) {
    const isAlive = this.isAlive(x, y);
    const aliveNeighbours = this.calculateAliveNeighbours(x, y);
    return isAliveNextRound(isAlive, aliveNeighbours) ? 'X' : '.';
  }

  calculateAliveNeighbours(x, y) {
    let neighbours = 0;

    if (this.isAlive(x - 1, y - 1)) neighbours++;
    if (this.isAlive(x - 1, y)) neighbours++;
    if (this.isAlive(x - 1, y + 1)) neighbours++;
    if (this.isAlive(x, y - 1)) neighbours++;
    if (this.isAlive(x, y + 1)) neighbours++;
    if (this.isAlive(x + 1, y - 1)) neighbours++;
    if (this.isAlive(x + 1, y)) neighbours++;
    if (this.isAlive(x + 1, y + 1)) neighbours++;
    
    return neighbours;
  }

  isAlive(x, y) {
    if (x < 0) return false;
    if (y < 0) return false;
    if (x >= this.height) return false;
    if (y >= this.width) return false;

    return this.grid[x][y] === 'X';
  }

  run(rounds) {
    for (let i = 0; i < rounds; i++) {
      this.tick();
    }
  }
}
