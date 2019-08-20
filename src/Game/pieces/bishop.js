import Piece from "./piece"

class Bishop extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = 'bishop';
        this.display = `<i class="fas fa-chess-bishop ${side}"></i>`
    }

    //funkcja szukająca przeszkód po x-- i y++
    find1(board) {
        let legalMoves = [];
        let x = this._x-1;
        let y = this._y + 1;
        let side = this._side;
        
        for (var i = 1; i <= 7; i++) {
            if (x < 0 || y > 7 || (board[x][y] && board[x][y]._side === side)) {
                break;
            } else if (x < 0 || y > 7 || (board[x][y] && board[x][y]._side !== side)) {
                legalMoves.push([x, y]);
                break;
            } else {
                legalMoves.push([x, y]);
            }
            x -= 1;
            y += 1;
        }
        
        return legalMoves;
    }

    //funkcja szukająca przeszkód po x-- i y--
    find2(board) {
        let legalMoves = [];
        let x = this._x - 1;
        let y = this._y - 1;
        let side = this._side;

        for (var i = 1; i <= 7; i++) {
            if (x < 0 || y < 0 || (board[x][y] && board[x][y]._side === side)) {
                break;
            } else if (x < 0 || y < 0 || (board[x][y] && board[x][y]._side !== side)) {
                legalMoves.push([x, y]);
                break;
            } else {
                legalMoves.push([x, y]);
            }
            x -= 1;
            y -= 1;
        }

        return legalMoves;
    }

    //funkcja szukająca przeszkód po x++ i y++
    find3(board) {
        let legalMoves = [];
        let x = this._x + 1;
        let y = this._y + 1;
        let side = this._side;

        for (var i = 1; i <= 7; i++) {
            if (x > 7 || y > 7 || (board[x][y] && board[x][y]._side === side)) {
                break;
            } else if (x > 7 || y > 7 || (board[x][y] && board[x][y]._side !== side)) {
                legalMoves.push([x, y]);
                break;
            } else {
                legalMoves.push([x, y]);
            }
            x += 1;
            y += 1;
        }

        return legalMoves;
    }

    //funkcja szukająca przeszkód po x++ i y--
    find4(board) {
        let legalMoves = [];
        let x = this._x + 1;
        let y = this._y - 1;
        let side = this._side;

        for (var i = 1; i <= 7; i++) {
            if (x > 7 || y < 0 || (board[x][y] && board[x][y]._side === side)) {
                break;
            } else if (x > 7 || y < 0 || (board[x][y] && board[x][y]._side !== side)) {
                legalMoves.push([x, y]);
                break;
            } else {
                legalMoves.push([x, y]);
            }
            x += 1;
            y -= 1;
        }

        return legalMoves;
    }

    // sprawdza kolizje ze swoimi oraz przeciwnikami
    checkCollision(board) {
        let legalMoves = [];

        legalMoves.push(...this.find1(board))
        legalMoves.push(...this.find2(board))
        legalMoves.push(...this.find3(board))
        legalMoves.push(...this.find4(board))
        
        return legalMoves;
    }
    // metoda zwracająca tablicę możliwych ruchów dla bierki 
    findLegalMoves(board) {
        const allMoves =[];
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
        
        return this.checkCollision(board);
    }

    
}

export default Bishop;