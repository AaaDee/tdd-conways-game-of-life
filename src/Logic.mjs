export function isAliveNextRound(isAliveNow, livingNeighbours) {
  if (isAliveNow) {
    return livingCellSurvives(livingNeighbours);
  } else {
    return deadCellBecomesAlive(livingNeighbours);
  }
}

function livingCellSurvives(livingNeighbours) {
  return livingNeighbours === 2 || livingNeighbours === 3;
}

function deadCellBecomesAlive(livingNeighbours) {
  return livingNeighbours === 3;
}