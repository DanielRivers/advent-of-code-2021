import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-6.txt")).toString();
}

let data = (await loadData()).split("\n")[0].split(",");

const DAYS_TO_RUN = 256;

const counts = [
  0,
  0,
  data.filter((fish) => fish === "1").length,
  data.filter((fish) => fish === "2").length,
  data.filter((fish) => fish === "3").length,
  data.filter((fish) => fish === "4").length,
  data.filter((fish) => fish === "5").length,
  data.filter((fish) => fish === "6").length,
  data.filter((fish) => fish === "7").length,
];

for (let day = 0; day < DAYS_TO_RUN; day++) {
    const newFish = counts[0];
    counts[0] = counts[1];
    counts[1] = counts[2];
    counts[2] = counts[3];
    counts[3] = counts[4];
    counts[4] = counts[5];
    counts[5] = counts[6];
    counts[6] = counts[7];
    counts[7] = counts[8] + counts[0];
    counts[8] = newFish;
}

console.log(counts.reduce((curr, data) => data + curr, 0))
