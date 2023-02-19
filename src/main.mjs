import { runSimulation } from "./Simulator.mjs";

const pattern = process.argv[2];
const rounds= process.argv[3];
console.log(runSimulation(pattern, rounds))