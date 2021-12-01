import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-1.txt")).toString();
}

const data = (await loadData()).split("\n");

const result = data.reduce((payload, next) => {
    next > payload.lastValue && payload.increases++;
    payload.lastValue = next;
    return payload;
}, {lastValue: 0, increases:0})

console.log(result.increases)

