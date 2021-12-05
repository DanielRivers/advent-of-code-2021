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
  return bingo.bingoResults.reduce((current, board, index) => {
    //test rows
    for (let row = 0; row < 5; row++) {
      if (
        board[row][0] &&
        board[row][1] &&
        board[row][2] &&
        board[row][3] &&
        board[row][4]
      ) {
        current.push(index);
        return current;
      }
    }

    //test columns
    for (let row = 0; row < 5; row++) {
      if (
        board[0][row] &&
        board[1][row] &&
        board[2][row] &&
        board[3][row] &&
        board[4][row]
      )
        current.push(index);
    }

    return current;
  }, []);
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
for (
  var numbercount = 0;
  numbercount <= bingoNumbers.length - 1;
  numbercount++
) {
  const number = bingoNumbers[numbercount];
  if (winner === -1) {
    findNumber(number);
    const winners = checkForWin();
    if (winners.length > 0) {
      if (bingo.bingoBoards.length === 1) {
        const sum = sumUnchecked(0);
        console.log(sum * number);
      }
      for (var i = winners.length - 1; i >= 0; i--) {
        bingo.bingoBoards.splice(winners[i], 1);
        bingo.bingoResults.splice(winners[i], 1);
      }
    }
  }
}
