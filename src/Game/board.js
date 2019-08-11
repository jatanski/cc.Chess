import Pawn from "./pieces/pawn";

// klasa inicjująca tablicę, gdzie będą zapisywane pozycje bierek

class Board extends Array {
  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      board[i] = new Array(8);
    }
  }
}

const board = new Board(8);
board.createSecondLevel();

// tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy
let pawn = new Pawn(6, 0, "white");
board[pawn._x][pawn._y] = pawn;

console.log(board); // służy do podejrzenia tablicy w konsoli

export default board;
