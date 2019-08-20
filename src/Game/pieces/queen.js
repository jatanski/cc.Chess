import Piece from "./piece";

class Queen extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = "queen";
        this.display = `<i class="fas fa-chess-queen ${side}"></i>`;
    }

    //blokowanie ruchów kolizyjnych
    collisions(possibleMoves, board) {
        const legalMoves = [];
        for (let move of possibleMoves) {
            // console.log(move)
            const x = move[0];
            const y = move[1];
            const side = this._side;
            if (!board[x][y]) {
                legalMoves.push(move);
            } else if (board[x][y]._side !== side) {
                legalMoves.push(move);
                break;
            } else {
                break;
            }
        }
        return legalMoves;
    }

    // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
    findLegalMoves(board) {
        const x = this._x;
        const y = this._y;
        const allMoves = [];
        const moves = {
            topLeft: [],
            top: [],
            topRight: [],
            right: [],
            bottomRight: [],
            bottom: [],
            bottomLeft: [],
            left: []
        };

        //dodaje kolejne ruchy po skosie i prosto i sprawdza iuch poprawność, iteracja jest przerywana w momencie kidy na polu znajduje się pionek
        for (let i = 1; i <= 7; i++) {
            //po przekątnych
            moves.topRight.push([x + i, y + i]);
            moves.bottomLeft.push([x - i, y - i]);
            moves.topLeft.push([x - i, y + i]);
            moves.bottomRight.push([x + i, y - i]);
            //prawo, lewo, góra, dół
            moves.right.push([x + i, y]);
            moves.left.push([x - i, y]);
            moves.top.push([x, y + i]);
            moves.bottom.push([x, y - i]);
        }

        const stayOnBoard = move => move.every(num => num >= 0 && num <= 7);
        // pętla po właściwościach obiektu (kierunkach) sprawdzająca kolizje
        for (let movesInDirection in moves) {
            moves[movesInDirection] = moves[movesInDirection].filter(stayOnBoard);
            const ruchyKonkretnegoKierunkuBezKolizji = this.collisions(moves[movesInDirection], board);
            allMoves.push(...ruchyKonkretnegoKierunkuBezKolizji);
        }

        // sprawdza czy ruch nie wychodzi poza granice szachownicy, bierze tablicę jako argument, zwraca true lub false

        // wybiera tylko te ruchy, które mieszczą się w granicach szachownicy
        const possibleMoves = allMoves.filter(stayOnBoard);

        return possibleMoves;
    }

}

export default Queen;