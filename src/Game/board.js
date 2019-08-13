import Pawn from "./pieces/pawn";
import Knight from "./pieces/knight"
import Bishop from "./pieces/bishop"

// klasa inicjująca tablicę, gdzie będą zapisywane pozycje bierek

class Board extends Array {
  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  createAndSetPawns(side) {
    const row = (side === 'white') ? 1 : 6;
    for(let i = 0; i < this[row].length; i++ ) {
      this[row][i] = new Pawn(row, i, side);
    }
  }

  init() {
    this.createSecondLevel();
    this.createAndSetPawns('white');
    this.createAndSetPawns('black');
  }
}

const board = new Board(8);
board.init();

// tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy

let knight_w1 = new Knight(7, 1, "white");
board[knight_w1._x][knight_w1._y] = knight_w1;
let knight_w2 = new Knight(7, 6, "white");
board[knight_w2._x][knight_w2._y] = knight_w2;
let knight_b1 = new Knight(0, 1, "black");
board[knight_b1._x][knight_b1._y] = knight_b1;
let knight_b2 = new Knight(0, 6, "black");
board[knight_b2._x][knight_b2._y] = knight_b2;

let bishop_w1 = new Bishop(7, 2, 'white');
board[bishop_w1._x][bishop_w1._y] = bishop_w1;
let bishop_w2 = new Bishop(7, 5, 'white');
board[bishop_w2._x][bishop_w2._y] = bishop_w2;
let bishop_b1 = new Bishop(0, 2, 'black');
board[bishop_b1._x][bishop_b1._y] = bishop_b1;
let bishop_b2 = new Bishop(0, 5, 'black');
board[bishop_b2._x][bishop_b2._y] = bishop_b2;

bishop_b1.findLegalMoves();
bishop_b2.findLegalMoves();
bishop_w1.findLegalMoves();
bishop_w2.findLegalMoves();
console.log(board); // służy do podejrzenia tablicy w konsoli

export default board;
