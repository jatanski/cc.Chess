import Pawn from "./pieces/pawn";
import Knight from "./pieces/knight";
import Queen from "./pieces/queen";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";


// klasa inicjująca tablicę, gdzie będą zapisywane pozycje bierek

class Board extends Array {
  createSecondLevel() {
    for (let i = 0; i < 8; i++) {
      this[i] = new Array(8);
    }
  }

  // tutaj tworzycie nowe obiekty waszych bierek i od razu umieszczacie je na szachownicy

  createAndSetPawns(side) {
    const row = side === "white" ? 6 : 1;
    for (let i = 0; i < this[row].length; i++) {
      this[row][i] = new Pawn(row, i, side);
    }
  }

  createAndSetQueen(side) {
    const row = side === "white" ? 7 : 0;
    this[row][3] = new Queen(row, 3, side);
  }

  createAndSetKnight(side) {
    const row = side === "white" ? 7 : 0;
    const startPositionKnight = [1, 6];
    for (let i = 0; i < startPositionKnight.length; i++) {
      this[row][startPositionKnight[i]] = new Knight(
        row,
        startPositionKnight[i],
        side
      );
    }
  }

  // metoda inicjująca

  init() {
    this.createSecondLevel();

    const colors = ["white", "black"];

    for (let i = 0; i < colors.length; i++) {
      this.createAndSetPawns(colors[i]);
      this.createAndSetQueen(colors[i]);
      this.createAndSetKnight(colors[i]);
    }
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

let king_w1 = new King(7,4, "white");
board[king_w1._x][king_w1._y] = king_w1;
let king_b1 = new King(0,4, "black");
board[king_b1._x][king_b1._y] = king_b1;

let queen_w1 = new Queen(7, 3, "white");
board[queen_w1._x][queen_w1._y] = queen_w1;
let queen_b1 = new Queen(0, 3, "black");
board[queen_b1._x][queen_b1._y] = queen_b1;

let bishop_w1 = new Bishop(7, 2, 'white');
board[bishop_w1._x][bishop_w1._y] = bishop_w1;
let bishop_w2 = new Bishop(7, 5, 'white');
board[bishop_w2._x][bishop_w2._y] = bishop_w2;
let bishop_b1 = new Bishop(0, 2, 'black');
board[bishop_b1._x][bishop_b1._y] = bishop_b1;
let bishop_b2 = new Bishop(0, 5, 'black');
board[bishop_b2._x][bishop_b2._y] = bishop_b2;


console.log(board); // służy do podejrzenia tablicy w konsoli

export default board;
