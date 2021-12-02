import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-2.txt")).toString();
}

const data = (await loadData()).split("\n");

const result = data.reduce(
  (data, current) => {
    const command = current.split(" ");
    switch (command[0]) {
      case "forward":
        data.horizontal += +command[1];
        data.depth += (+command[1] * data.aim);
        break;
      case "down":
        data.aim += +command[1];
        break;
      case "up":
        data.aim += -command[1];
        break;
    }
    return data;
  },
  { horizontal: 0, depth: 0, aim: 0 }
);

console.log(result.depth * result.horizontal);
