import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-3.txt")).toString();
}

const data = (await loadData()).split("\n");

const result = data.reduce((payload, next) => {
  next.split('').forEach((number, index) => {
    if (!payload[index]) payload[index] = 0;
    payload[index] += +number
  })
  return payload 
}, [])

const epsilon = parseInt(result
  .map((value) => (value > data.length / 2 ? 0 : 1))
  .join(""), 2);
const gamma = parseInt(result
  .map((value) => (value > data.length / 2 ? 1 : 0))
  .join(""), 2);  
console.log(epsilon * gamma)

