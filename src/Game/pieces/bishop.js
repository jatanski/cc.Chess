import Piece from "./piece"

class Bishop extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = 'bishop';
        this.display = `<i class="fas fa-chess-bishop ${side}"></i>`
    }

    

    checkCollision(possibleMoves, board) {
        let legalMoves = [];
        for (let move of possibleMoves) {
            if (!board[move[0]][move[1]]) {
                legalMoves.push(move);
            }
        }
       
        return legalMoves;
    }



    // metoda zwracająca tablicę możliwych ruchów dla bierki 
    findLegalMoves(board) {
            const allMoves = Array([this._x , this._y]);
        let moves = [];
        const x = this._x
        const y = this._y;

        // dodaje wszytskie możliwe ruchy dla bierki 
        for (let i = 1; i <= 7; i++) {
            allMoves.push([x + i, y + i]);
            allMoves.push([x + i, y - i]);
            allMoves.push([x - i, y + i]);
            allMoves.push([x - i, y - i]);
        }

        // wybiera tylko te ruchy które znajdują się na szachownicy 
        const possibleMove = allMoves.filter((n) => {
            return (n[0] >= 0 && n[0] <= 7 && n[1] >= 0 && n[1] <= 7);
        })
        moves = this.checkCollision(possibleMove, board);
        return moves;
    }

    
}

export default Bishop;