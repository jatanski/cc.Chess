import Pawn from "./pieces/pawn";
import Knight from "./pieces/knight"

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

let knight_w1 = new Knight(7, 1, "white");
board[knight_w1._x][knight_w1._y] = knight_w1;
let knight_w2 = new Knight(7, 6, "white");
board[knight_w2._x][knight_w2._y] = knight_w2;
let knight_b1 = new Knight(0, 1, "black");
board[knight_b1._x][knight_b1._y] = knight_b1;
let knight_b2 = new Knight(0, 6, "black");
board[knight_b2._x][knight_b2._y] = knight_b2;

console.log(board); // służy do podejrzenia tablicy w konsoli

export default board;
