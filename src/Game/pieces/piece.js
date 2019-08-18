// import board from "../board";

// klasa abstrakcyjna, po której dziedziczą wszystkie inne klasy bierek

class Piece {
    constructor(x, y, side) {
        this._x = x;
        this._y = y;
        this._pristine = true;
        this._side = side; // 'black' or 'white'
    }
    
    move(newPosition, board) {
        const newX = newPosition[0];
        const newY = newPosition[1];

        // Przypisuje bierkę do nowego pola
        board[newX][newY] = board[this._x][this._y];

        // Czyści stare pole
        board[this._x][this._y] = null;
        
        // Aktualizuje _x i _y o nową pozycje
        this._x = newX;
        this._y = newY;

        // Oznacza bierke jako ruszoną (ma to znaczenie w przypadku pierwszego ruchui piona lub roszady)
        if(this._pristine) this._pristine = false;

        console.log(board); // Aktualna wersja modelu
    }
}

export default Piece;
