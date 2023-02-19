import { Parser } from "./Parser.mjs";

export function runSimulation(pattern, rounds) {
  const parser = new Parser();
  const result = parser.runInput(pattern, Number.parseInt(rounds));
  return result;
}
