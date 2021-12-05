import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-5.txt")).toString();
}

const data = (await loadData()).split("\n");

const ventMap = data.reduce((ventMap, current) => {
    const [start, end] = current.split(' -> ')
    const [startX, startY] = start.split(",");
    const [endX, endY] = end.split(",");

    let plotStartX = +startX;
    let plotStartY = +startY;
    const plotEndX = +endX;
    const plotEndY = +endY;

    if (ventMap[plotStartY] === undefined)
        ventMap[plotStartY] = new Array(10).fill(0);
    if (ventMap[plotStartY][plotStartX] === undefined)
        ventMap[plotStartY][plotStartX] = 0;
    ventMap[plotStartY][plotStartX]++;
    
    while (plotStartX !== plotEndX || plotStartY !== plotEndY) {
        if (plotStartX < plotEndX) plotStartX++;
        if (plotStartY < plotEndY) plotStartY++
        if (plotStartX > plotEndX) plotStartX--;
        if (plotStartY > plotEndY) plotStartY--;

        if (ventMap[plotStartY] === undefined) ventMap[plotStartY] = new Array(10).fill(0);

        if (ventMap[plotStartY][plotStartX] === undefined)
            ventMap[plotStartY][plotStartX] = 0;

        ventMap[plotStartY][plotStartX]++;
    };
        
    return ventMap;
}, [])

const count = ventMap.reduce((count, row) => {
    row.forEach(element => {
        if (element > 1) count++
    });
    return count
}, 0)

console.log(count);
