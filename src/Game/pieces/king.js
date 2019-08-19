import Piece from "./piece";

class King extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = "king";
        this.display = `<i class="fas fa-chess-king ${side}"></i>`;
    }

    collisionFilter(possibleMoves, board) {
        const clearedMoves = [];
        for (let move of possibleMoves) {
            const x = move[0];
            const y = move[1];
            const piece = board[x][y];
            if (!piece) {
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
        const cord = [x,y];
        
        let possibleMoves =[];
        
        //tworzy tablice wektorow x,y z mozliwymi rozwiazaniami (zaczyna od lewego, gornego rogu)
        for (let i = (cord[0]-1); i<(cord[0]+2); i++){
            for (let j = (cord[1]-1); j<(cord[1]+2); j++){

                //sprawdza czy poza plansza (x>=0, xM=7, y>=0, x<=7) oraz usuwa z listy mozliwych ruchow pole, na ktorym aktualnie stoi
                if (((i<=7 && i>=0) && (j<=7 && j>=0)) && !(i==cord[0] && j==cord[1])) {
                    possibleMoves.push([i,j])
                }
            }
        }
        possibleMoves = this.collisionFilter(possibleMoves, board);
        return possibleMoves;
    }
}
export default King;