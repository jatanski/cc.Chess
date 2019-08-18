import Piece from "./piece";

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "knight";
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`;
  }

  // filtruje ruchy kolidujące z bierkami tego samego koloru
  filterCollisionMoves(possibleMoves, board) {
    const side = this._side;
    const filteredMoves = possibleMoves.filter(function(move) {
      const target = board[move[0]][move[1]];
      return target ? target._side !== side : true;
    });
    return filteredMoves;
  }

  // filtruje ruchy wychodzące poza granice szachownicy
  filterOutOfBoard(possibleMoves) {
    const filteredMoves = possibleMoves.filter(function(move) {
      return move.every(num => num >= 0 && num <= 7);
    });
    return filteredMoves;
  }

  findLegalMoves(board) {
    const x = this._x;
    const y = this._y;
    let legalMoves = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2]
    ];

    legalMoves = this.filterOutOfBoard(legalMoves);
    legalMoves = this.filterCollisionMoves(legalMoves, board);

    return legalMoves;
  }
}

export default Knight;
