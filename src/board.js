import Pawn from "./pieces/pawn";

const board = new Array(8);
for (let i = 0; i < 8; i++) {
  board[i] = new Array(8);
}

let pawn = new Pawn(6, 0, "white");
board[pawn.x][pawn.y] = pawn;

console.log(board);

export default board;
