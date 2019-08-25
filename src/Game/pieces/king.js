import Piece from "./piece";

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "king";
    this.display = `<i class="fas fa-chess-king ${side}"></i>`;
    this.smallCastling = false;
    this.bigCastling = false;
  }

  checkWhiteCastlingLegal(possibleMoves, board) {
    const legalMoves = possibleMoves;
    if (this._side === "black") return legalMoves;
    if (board[7][4] && this._pristine) {
      if (
        !board[this._x][this._y + 1] &&
        !board[this._x][this._y + 2] &&
        board[this._x][this._y + 3]._pristine &&
        board[this._x][this._y + 3].name === "rook"
      ) {
        legalMoves.push([this._x, this._y + 2, "smallWhiteCastling"]);
        return legalMoves;
      } else if (
        !board[this._x][this._y - 1] &&
        !board[this._x][this._y - 2] &&
        !board[this._x][this._y - 3] &&
        board[this._x][this._y - 4]._pristine &&
        board[this._x][this._y - 4].name === "rook"
      ) {
        legalMoves.push([this._x, this._y - 2, "bigWhiteCastling"]);
        return legalMoves;
      } else return legalMoves;
    } else return legalMoves;
  }

  checkBlackCastlingLegal(possibleMoves, board) {
    const legalMoves = possibleMoves;
    if (this._side === "white") return legalMoves;
    if (board[0][4] && this._pristine) {
      if (
        !board[this._x][this._y + 1] &&
        !board[this._x][this._y + 2] &&
        board[this._x][this._y + 3]._pristine &&
        board[this._x][this._y + 3].name === "rook"
      ) {
        legalMoves.push([this._x, this._y + 2, "smallBlackCastling"]);
        return legalMoves;
      } else if (
        !board[this._x][this._y - 1] &&
        !board[this._x][this._y - 2] &&
        !board[this._x][this._y - 3] &&
        board[this._x][this._y - 4]._pristine &&
        board[this._x][this._y - 4].name === "rook"
      ) {
        legalMoves.push([this._x, this._y - 2, "bigBlackCastling"]);
        return legalMoves;
      } else return legalMoves;
    } else return legalMoves;
  }

  //move - pozycja mozliwych ruchow (wlacznie z kolizjami)

  //board[move[0]][move[1]] - pionki na planszy na pozycjach z move, jak nie ma
  //to null

  //colissionFilter - filtruje zajete pola z wyjatkiem tych, nalezacych do pionkow przeciwnych
  collisionFilter(possibleMoves, board) {
    const clearedMoves = [];
    let side = this._side;
    for (let move of possibleMoves) {
      const x = move[0];
      const y = move[1];
      const piecesInfo = board[x][y];
      if (!(piecesInfo && piecesInfo._side == side)) {
        clearedMoves.push(move);
      }
    }
    return clearedMoves;
  }

  // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
  findLegalMoves(board) {
    const x = this._x;
    const y = this._y;

    //aktualna pozycja
    const cord = [x, y];

    let possibleMoves = [];

    //tworzy tablice wektorow x,y z mozliwymi rozwiazaniami (zaczyna od lewego, gornego rogu)
    for (let i = cord[0] - 1; i < cord[0] + 2; i++) {
      for (let j = cord[1] - 1; j < cord[1] + 2; j++) {
        //sprawdza czy poza plansza (x>=0, xM=7, y>=0, x<=7) oraz usuwa z listy mozliwych ruchow pole, na ktorym aktualnie stoi
        if (
          i <= 7 &&
          i >= 0 &&
          (j <= 7 && j >= 0) &&
          !(i == cord[0] && j == cord[1])
        ) {
          possibleMoves.push([i, j]);
        }
      }
    }

    possibleMoves = this.collisionFilter(possibleMoves, board);
    possibleMoves = this.checkWhiteCastlingLegal(possibleMoves, board);
    possibleMoves = this.checkBlackCastlingLegal(possibleMoves, board);
    console.log(possibleMoves);
    return possibleMoves;
  }
}
export default King;
