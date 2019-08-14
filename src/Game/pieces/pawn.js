import Piece from "./piece";

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "pawn";
    this.display = `<i data-color=${side} class="fas fa-chess-pawn ${side}"></i>`;
    this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
  }

  // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
  findLegalMoves() {
    const allMoves = Array([this._x + this._vector, this._y]);

    return allMoves.filter(el => {
      return !(el[0] > 7 || el[0] < 0);
    });
  }

  findLegalAttacs() {
    const allAttacs = Array(
      [this._x + this._vector, this._y + 1],
      [this._x + this._vector, this._y - 1]
    );

    return allAttacs.filter(el => {
      return !(el[0] < 0 || el[0] > 7 || el[1] < 0 || el[1] > 7);
    });
  }
}

export default Pawn;
