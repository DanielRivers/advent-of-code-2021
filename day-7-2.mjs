import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-7.txt")).toString();
}

let data = (await loadData()).split("\n")[0].split(",").map(value => +value);

const [start, end] = data.reduce((range, number) => [Math.min(range[0], number), Math.max(range[1], number)], [0, 0])
const fuelGuage = new Array(end - start).fill(0);

for (let position = start; position < end; position++) {
    data.forEach(crab => {
        let distance = Math.abs(crab - position);
        while (distance > 0) {
            fuelGuage[position] += distance--;
        }
    })
}

console.log(
  fuelGuage.reduce((smallest, number) => Math.min(smallest, number), fuelGuage[0])
);