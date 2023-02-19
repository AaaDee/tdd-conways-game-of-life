import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { trimBoard, setBoard } from "./utils.mjs";

describe("Empty board", () => {
  it("Prints empty 3x3 board", () => {
    const board = new Board(3, 3);

    expect(board.toString()).to.equal(
      trimBoard(
       `...
        ...
        ...`
      )
    );
  });

  it("Prints empty 2x4 board", () => {
    const board = new Board(2,4);

    expect(board.toString()).to.equal(
      trimBoard(
       `....
        ....`
      )
    );
  });
});

describe("Setting grid", () => {
  it("Sets grid from input", () => {
    const board = new Board(3, 3);

    setBoard(board,
      `...
       .X.
       ...`
    )

    expect(board.toString()).to.equal(
      trimBoard(
       `...
        .X.
        ...`
      )
    );
  });
});

describe("Cell logic", () => {
  let board;
  
  beforeEach(() => {
    board = board = new Board(3, 3);
  })

  it("Tick on empty board does nothing", () => {
    board.tick()
    expect(board.toString()).to.equal(
      trimBoard(
       `...
        ...
        ...`
      )
    );
  });

  it("Single living cell dies", () => {
    setBoard(board,
      `...
       .X.
       ...`
    )

    board.tick();

    expect(board.toString()).to.equal(
      trimBoard(
       `...
        ...
        ...`
      )
    );
  });

  it("Living cell with two neighbours survives", () => {
    setBoard(board,
      `X..
       .X.
       ..X`
    )

    board.tick();

    expect(board.toString()).to.equal(
      trimBoard(
       `...
        .X.
        ...`
      )
    );
  });

  it("Living cell with three neighbours survives", () => {
    setBoard(board,
      `XX.
       XX.
       ...`
    )

    board.tick();

    expect(board.toString()).to.equal(
      trimBoard(
       `XX.
        XX.
        ...`
      )
    );
  });

  it("Dead cell with three neighbours becomes a live cell", () => {
    setBoard(board,
      `X..
       ...
       X.X`
    )

    board.tick();

    expect(board.toString()).to.equal(
      trimBoard(
       `...
        .X.
        ...`
      )
    );
  });
});


describe("Multiple rounds", () => {
  let board;
  
  beforeEach(() => {
    board = board = new Board(3, 3);
  })

  it("Running a blinker for two rounds returns the original state", () => {
    setBoard(board,
      `.X.
       .X.
       .X.`
    )

    board.run(2);

    expect(board.toString()).to.equal(
      trimBoard(
       `.X.
        .X.
        .X.`
      )
    );
  });

});


