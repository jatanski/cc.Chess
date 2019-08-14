import Pawn from "./pieces/pawn";
import Knight from "./pieces/knight";
import Queen from "./pieces/queen";

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

console.log(board); // służy do podejrzenia tablicy w konsoli

export default board;
