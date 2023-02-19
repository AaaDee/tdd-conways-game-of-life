import { expect } from "chai";
import { runSimulation } from "../src/Simulator.mjs";
import { trimBoard } from "./utils.mjs";

describe("Runs a simulation", () => {
  it("Runs a blinker", () => {
    const pattern = 'x = 3, y = 3\nbbb$ooo$bbb!';
    const rounds = '1';

    const result = runSimulation(pattern, rounds)
    expect(result).to.equal(trimBoard(
      `.X.
       .X.
       .X.`
    ))
  });
});

