console.log("train js");

function FootballPoints(wins, draws, losses) {
  return `${3 * wins + 1 * draws + 0 * losses}`;
}

console.log(FootballPoints(3, 4, 2));
