import board from "../board";

// klasa abstrakcyjna, po której dziedziczą wszystkie inne klasy bierek

class Piece {
  constructor(x, y, side) {
    this._x = x;
    this._y = y;
    this._side = side; //'black' or 'white'
  }
  move(newPosition) {
    const newX = newPosition[0];
    const newY = newPosition[1];

    //zapisuje nowe pola
    board[newX][newY] = board[this._x][this._y];

    //czyści stare pole
    board[this._x][this._y] = null;
    document.querySelector(`[data-id="${this._x}-${this._y}"]`).innerHTML = "";

    //ustawia bierke na nowym polu
    this._x = newX;
    this._y = newY;

    document.querySelector(
      `[data-id="${newX}-${newY}"]`
    ).innerHTML = this.display;

    console.log(board);
  }
}

export default Piece;
