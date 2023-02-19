import { expect } from "chai";
import { Parser } from "../src/Parser.mjs";
import { trimBoard } from "./utils.mjs";

describe("Empty initial states", () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  })

  it("Prints empty 3x3 board", () => {
    const initialState = 'x = 3, y = 3';
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `...
        ...
        ...`
      )
    );
  });

  it("Prints empty 2x4 board", () => {
    const initialState = 'x = 2, y = 4';
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `....
        ....`
      )
    );
  });
});


describe("Comments", () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  })

  it("Comments are ignored", () => {
    const initialState = 
    `# IGNORE THIS
    x = 3, y = 3`;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `...
        ...
        ...`
      )
    );
  });
});

describe("Non-empty initial states", () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  })

  it("Prints a completely written out board", () => {
    const initialState = 
    `x = 3, y = 3
    bbb$bob$bbb!`
    ;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `...
        .X.
        ...`
      )
    );
  });
});

describe("Padding dead cells to initial states", () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  })

  it("Appends empty cells to end of non-final row", () => {
    const initialState = 
    `x = 2, y = 2
    b$bb!`
    ;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `..
        ..`
      )
    );
  });

  it("Appends empty cells to end of final row", () => {
    const initialState = 
    `x = 2, y = 2
    bb$b!`
    ;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `..
        ..`
      )
    );
  });

  it("Appends empty rows to the end", () => {
    const initialState = 
    `x = 3, y = 2
    bb!`
    ;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `..
        ..
        ..`
      )
    );
  });
});

describe("Handling numeric coefficients", () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  })

  it("Handles numeric coefficients correctly for small amount of alive cells", () => {
    const initialState = 
    `x = 2, y = 2
    2o$bb!`
    ;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `XX
        ..`
      )
    );
  });

  it("Handles numeric coefficients correctly for large amount of dead cells", () => {
    const initialState = 
    `x = 1, y = 10
    10b!`
    ;
    const numberORounds = 0;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `..........`
      )
    );
  });
});

describe("Running rounds", () => {
  let parser;
  beforeEach(() => {
    parser = new Parser();
  })

  it("Runs one round of Blinker correctly", () => {
    const initialState = 
    `x = 3, y = 3
    bbb$ooo$bbb!`
    ;
    const numberORounds = 1;

    const result = parser.runInput(initialState, numberORounds);

    expect(result).to.equal(
      trimBoard(
       `.X.
        .X.
        .X.`
      )
    );
  });
});