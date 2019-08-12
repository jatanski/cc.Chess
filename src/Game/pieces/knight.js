import Piece from "./piece";

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = "knight";
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`;
  }

  // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
  findLegalMoves() {
    const x = this._x;
    const y = this._y;
    const allMoves = 
    [[x+2, y+1], [x+2, y-1], [x-2, y+1], [x-2, y-1],
     [x+1, y+2], [x+1, y-2], [x-1, y+2], [x-1, y-2]];
    
    // sprawdza czy ruch nie wychodzi poza granice szachownicy, bierze tablicę jako argument, zwraca true lub false
    const stayOnBoard = move => move.every(num => num >= 0 && num <= 7);
  
    // wybiera tylko te ruchy, które mieszczą się w granicach szachownicy
    const possibleMoves = allMoves.filter(stayOnBoard);

    return possibleMoves;
  }
}

export default Knight;