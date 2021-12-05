import { promises as fs } from "fs";

async function loadData() {
  return (await fs.readFile("inputs/day-4.txt")).toString();
}

const data = (await loadData()).split("\n\n");
const bingoNumbers = data[0].split(",");
data.shift();

const bingo = data.reduce(
  (payload, current, index) => {
    const bingeCardLines = current.split("\n");
    payload.bingoBoards[index] = [];
    payload.bingoResults[index] = [];
    bingeCardLines.forEach((line) => {
      const lineNumbers = line.split(" ").filter((n) => n);
      payload.bingoBoards[index].push(lineNumbers);
      payload.bingoResults[index].push(new Array(5).fill(false));
    });
    return payload;
  },
  { bingoBoards: [], bingoResults: [] }
);

function findNumber(number) {
  bingo.bingoBoards.forEach((board, boardIndex) => {
    board.forEach((line, lineIndex) => {
      line.forEach((lineNumber, lineNumberIndex) => {
        if (+number === +lineNumber) {
          bingo.bingoResults[boardIndex][lineIndex][lineNumberIndex] = true;
        }
      });
    });
  });
}

function checkForWin() {
  return bingo.bingoResults.findIndex((board) => {
    let boardResult;
    //test rows
    boardResult = board.map((row) => {
      return row.reduce((current, result) => {
        return current && result;
      }, true);
    });
    if (boardResult.filter((result) => result).length === 1) return true;
    //test columns
    for (let row = 0; row < 5; row++) {
      if (
        bingo.bingoResults[0][0][row] &&
        bingo.bingoResults[0][1][row] &&
        bingo.bingoResults[0][2][row] &&
        bingo.bingoResults[0][3][row] &&
        bingo.bingoResults[0][4][row]
      )
        return true;
    }
  });
}

function sumUnchecked(board) {
  const sumResults = bingo.bingoResults[board];
  const sumBoard = bingo.bingoBoards[board];
  return sumBoard.reduce((sum, current, index) => {
    for (let column = 0; column < 5; column++) {
      if (!sumResults[index][column]) {
        sum += +current[column];
      }
    }
    return sum;
  }, 0);
}

let winner = -1;
bingoNumbers.forEach((number) => {
  if (winner === -1) {
    findNumber(number);
    winner = checkForWin();
    if (winner >= 0) {
      const sum = sumUnchecked(winner);

      console.log(sum * number);
    }
  }
});
