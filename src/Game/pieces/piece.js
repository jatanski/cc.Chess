import board from "../board";

// klasa abstrakcyjna, po której dziedziczą wszystkie inne klasy bierek

class Piece {
  constructor(x, y, side) {
    this._x = x;
    this._y = y;

    this._side = side; //'black' or 'white'
  }
  move([newX, newY]) {
    newX = parseInt(newX);
    newY = parseInt(newY);

    //zapisuje nowe pola
    board[newX][newY] = board[this._x][this._y];

    //czyści stare pole
    board[this._x][this._y] = null;
    document.getElementById(`${this._x},${this._y}`).innerHTML = "";

    //ustawia bierke na nowym polu
    this._x = newX;
    this._y = newY;

    document.getElementById(`${newX},${newY}`).innerHTML = this.display;
  }
}

export default Piece;
