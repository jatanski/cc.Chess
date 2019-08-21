import Piece from "./piece";

class Rook extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = 'rook';
        this.display = `<i class="fas fa-chess-rook ${side}"></i>`;
    }

        // wszystkie możliwe ruchy
    findLegalMoves(board) {
        const x = this._x;
        const y = this._y;
        let side = this._side;
        // console.log(x, y)

    
        // pętle które kolejno sprawdzają możliwe ruchy w oparciu o index szachownicy(przez co z niej nie wychodzi)
        // + czy na polu znajduje się bierka
         const allMoves = [];
        for(let i = x + 1; i <= 7; i++) {
            if (!board[i][y]) {
                allMoves.push([i,y]);
            } else if (board[i][y] && board[i][y]._side !== side) {
                allMoves.push([i, y]);
                break;
            } else break;
        }
        for(let i = x - 1; i >= 0; i--) {
            if (!board[i][y] ) {
                allMoves.push([i,y]);
               // console.log(board[i][y]._side)
            } else if (board[i][y] && board[i][y]._side !== side) {
                allMoves.push([i, y]);
                break;
            } else break;
        }
        
        for(let i = y + 1; i <= 7; i++) {
            if (!board[x][i]) {
                allMoves.push([x,i]);
            } else if (board[x][i] && board[x][i]._side !== side) {
                allMoves.push([x, i]);
                break;
            } else break;
        }
        
        for(let i = y - 1; i >= 0; i--) {
            if (!board[x][i]) {
                allMoves.push([x,i]);
            } else if (board[x][i] && board[x][i]._side !== side) {
                allMoves.push([x, i]);
                break;
            } else break;
        }

            console.log(allMoves)
            return allMoves;
    };
    



}
export default Rook;
