import { Board } from "./Board.mjs";


export class Parser{
  isHeaderRead;
  isPatternRead;
  board;
  height;
  width;

  runInput(initialState, numberORounds) {
    const lines = initialState.split("\n");
    this.isHeaderRead = false;
    this.isPatternRead = false;
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      this.processLine(line);
      if (this.isPatternRead) {
        break;
      }
    }
    this.board.run(numberORounds);
    return this.board.toString();
  }

  processLine(line) {
    if (line[0] === '#') {
      return;
    }
    if (!this.isHeaderRead) {
      this.processHeaderLine(line)
      return;
    } else {
      this.processPatternLine(line)
    }
  }

  processHeaderLine(line) {
    const regex = /\d+/g;
    const dimensions = line.match(regex);
    this.height = dimensions[0]
    this.width = dimensions[1];
    this.board = new Board(this.height, this.width);
    this.isHeaderRead = true;
  }

  processPatternLine(line) {
    const grid = [];
    let row = [];
  
    for (let i = 0; i < line.length; i++) {
      const inputChar = line[i];
      if (inputChar === '!') {
        this.padRow(row);
        grid.push(row);
        this.padGrid(grid);
        break;
      }
      if (inputChar === '$') {
        this.padRow(row);
        grid.push(row);
        row = [];
      }
      if (inputChar === 'b') {
        addDeadCell(row);
        
      }
      if (inputChar === 'o') {
        addLivingCell(row);
      }
      if (isNumber(inputChar)) {
        let coefficient = '';
        while (isNumber(line[i])) {
          coefficient = coefficient + line[i];
          i++;
        }
        const value = Number.parseInt(coefficient)
        const cellType = line[i];
        const addCell = cellType === 'b' ? addDeadCell : addLivingCell;
        for (let j = 0; j < value; j++) {
          addCell(row)
        }
      }
    }
    this.board.setGrid(grid);
    this.isPatternRead = true;
  }

  padRow(row) {
    while (row.length < this.width) {
      row.push('.');
    }
  }

  padGrid(grid) {
    while (grid.length < this.height) {
      const row = [];
      this.padRow(row);
      grid.push(row);
    }
  }
}

function isNumber(inputChar) {
  return !isNaN(Number.parseInt(inputChar))
}
 
function addDeadCell(row) {
  row.push('.');
}

function addLivingCell(row) {
  row.push('X');
}
