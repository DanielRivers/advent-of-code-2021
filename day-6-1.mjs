import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-6.txt")).toString();
}

let data = (await loadData()).split("\n")[0].split(",");

const DAYS_TO_RUN = 256;
let newFish = [];

for (let day = 0; day < DAYS_TO_RUN; day++) {
  for (let index = 0; index < data.length; index++) {
    if (data[index] === 0) {
      newFish.push(8);
      data[index] = 6;
    } else {
      data[index] = --data[index];
    }
  }
  data = data.concat(newFish);
  newFish = [];
}

console.log(data.length);