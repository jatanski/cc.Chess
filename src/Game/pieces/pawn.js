import Piece from "./piece";

class Pawn extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = "pawn";
        this.display = `<i data-color=${side} class="fas fa-chess-pawn ${side}"></i>`;
        this._vector = this._side == "white" ? -1 : 1; // 1 to góra -1 to dół
    }

    // Filtrowanie ruchów wykraczających poza szachownice
    filterOutBoardMoves(possibleMoves) {
        return possibleMoves.filter(el => {
            return !(el[0] > 7 || el[0] < 0);
        });
    }

    // Filtrowanie ruchów kolizyjnych (przy ruchu piona jest bez znaczenia czy to swój czy wróg)
    // possibleMoves interface : [ [x, y] ] lub [ [x, y], [x, y] ]
    filterCollisionMoves(possibleMoves, board) {
        if (possibleMoves.length < 1 ) return possibleMoves;

        let legalMoves = [];

        for(let moveCords of possibleMoves) {
            const x = moveCords[0];
            const y = moveCords[1];

            if (board[x][y]) {
                break;
            } else {
                legalMoves.push(moveCords);
            }
        }

        return legalMoves;
    }

    filterSelfAttacs(possibleMoves, board) {

    }

    // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
    findLegalMoves(board) {
        let legalMoves;
        const allMoves = Array([this._x + this._vector, this._y]);

        // Dla pierwszego ruchu możliwość ruchu o 2
        if(this._pristine) {
            allMoves.push([this._x + (this._vector * 2), this._y]) 
        }

        legalMoves = this.filterOutBoardMoves(allMoves);
        legalMoves = this.filterCollisionMoves(allMoves, board);

        return legalMoves;
    }

    findLegalAttacs() {
        let legalAttacs;

        const allAttacs = Array(
            [this._x + this._vector, this._y + 1],
            [this._x + this._vector, this._y - 1]
        );

        legalAttacs = allAttacs.filter(el => {
            return !(el[0] < 0 || el[0] > 7 || el[1] < 0 || el[1] > 7);
        });

        return legalAttacs;
    }
}

export default Pawn;
