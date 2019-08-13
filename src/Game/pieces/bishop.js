import Piece from "./piece"

class Bishop extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = 'bishop';
        this.display = `<i class="fas fa-chess-bishop ${side}"></i>`
    }


    findLegalMoves() {
        const allMoves = [];
        const x = this._x
        const y = this._y;

        for (let i = 1; i <= 7; i++) {
            allMoves.push([x + i, y + i]);
            allMoves.push([x + i, y - i]);
            allMoves.push([x - i, y + i]);
            allMoves.push([x - i, y - i]);
        }

        const possibleMove = allMoves.filter((n) => {
            return (n[0] >= 0 && n[0] <= 7 && n[1] >= 0 && n[1] <= 7);
        })
        console.log(possibleMove);
    }
}

export default Bishop;