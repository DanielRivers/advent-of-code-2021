import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-3.txt")).toString();
}

const data = (await loadData()).split("\n");

function reduce(dataLoad) {
    return dataLoad.reduce((payload, next) => {
      next.split("").forEach((number, index) => {
        if (!payload[index]) payload[index] = 0;
        payload[index] += +number;
      });
      return payload;
    }, []);
} 

function filterDown(mostCommon) {
    let filterData = data;
    let index = 0
    while (filterData.length > 1)  {
        const frequencyMap = reduce(filterData);
        filterData = filterData.filter((item) => {
            if (mostCommon) {
                return +item[index] == frequencyMap[index] >= filterData.length / 2 ? 1 : 0;
            } else {
                return +item[index] == frequencyMap[index] >= filterData.length / 2 ? 0 : 1;
            }
        }, []);
        index++
    }
    return filterData[0];
}

const o2 = filterDown(true);
const co2 = filterDown(false);

console.log(parseInt(o2, 2) * parseInt(co2, 2));

