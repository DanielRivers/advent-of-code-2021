import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-1.txt")).toString();
}

const data = (await loadData()).split("\n");

const result = data.reduce(
  (payload, next, index) => {
    const sum = +next + +data[index + 1] + +data[index + 2];
    sum > payload.lastValue && payload.increases++;
    payload.lastValue = sum;
    return payload;
  },
  { lastValue: 0, increases: -1 }
);

console.log(result.increases);
