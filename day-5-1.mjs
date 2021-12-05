import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-5.txt")).toString();
}

const data = (await loadData()).split("\n");

const ventMap = data.reduce((ventMap, current) => {
  const [start, end] = current.split(" -> ");
  const [startX, startY] = start.split(",");
  const [endX, endY] = end.split(",");

  if (startX !== endX && startY !== endY) return ventMap;

  let plotStartX = Math.min(+startX, +endX);
  let plotStartY = Math.min(+startY, +endY);
  const plotEndX = Math.max(+startX, +endX);
  const plotEndY = Math.max(+startY, +endY);

  if (ventMap[plotStartY] === undefined)
    ventMap[plotStartY] = new Array(10).fill(0);

  if (ventMap[plotStartY][plotStartX] === undefined)
    ventMap[plotStartY][plotStartX] = 0;

  ventMap[plotStartY][plotStartX]++;

  do {
    if (plotStartX < plotEndX) plotStartX++;
    if (plotStartY < plotEndY) plotStartY++;

    if (ventMap[plotStartY] === undefined)
      ventMap[plotStartY] = new Array(10).fill(0);

    if (ventMap[plotStartY][plotStartX] === undefined)
      ventMap[plotStartY][plotStartX] = 0;

    ventMap[plotStartY][plotStartX]++;
  } while (plotStartX < plotEndX || plotStartY !== plotEndY);

  return ventMap;
}, []);

const count = ventMap.reduce((count, row) => {
  row.forEach((element) => {
    if (element > 1) count++;
  });
  return count;
}, 0);

console.log(count);
