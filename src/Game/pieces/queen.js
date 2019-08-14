import Piece from "./piece";

class Queen extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = "queen";
        this.display = `<i class="fas fa-chess-queen ${side}"></i>`;
    }

    // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
    findLegalMoves() {
        const x = this._x;
        const y = this._y;
        const allMoves = [];

    //dodaje kolejne ruchy po skosie i prosto
        for (let i = 1; i <= 7; i++) {
            //po przekątnych
            allMoves.push([x + i, y + i]);
            allMoves.push([x - i, y - i]);
            allMoves.push([x - i, y + i]);
            allMoves.push([x + i, y - i]);
            //prawo, lewo, góra, dół
            allMoves.push([x + i, y]);
            allMoves.push([x - i, y]);
            allMoves.push([x, y + i]);
            allMoves.push([x, y - i]);
        }

        // sprawdza czy ruch nie wychodzi poza granice szachownicy, bierze tablicę jako argument, zwraca true lub false
        const stayOnBoard = move => move.every(num => num >= 0 && num <= 7);

        // wybiera tylko te ruchy, które mieszczą się w granicach szachownicy
        const possibleMoves = allMoves.filter(stayOnBoard);

        return possibleMoves;
    }
}

export default Queen;