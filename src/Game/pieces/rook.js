import Piece from "./piece";

class Rook extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = 'rook';
        this.display = `<i class="fas fa-chess-rook ${side}"></i>`;
    }

    // wszystkie możliwe ruchy
    findLegalMoves() {
        const x = this._x;
        const y = this._y;
        const allMoves = [
            [x - 7, y], [x - 6, y], [x - 5, y], [x - 4, y], [x - 3, y], [x - 2, y], [x - 1, y],
            [x + 1, y], [x + 2, y], [x + 3, y], [x + 4, y], [x + 5, y], [x + 6, y], [x + 7, y],
            [x, y - 7], [x, y - 6], [x, y - 5], [x, y - 4], [x, y - 3], [x, y - 2], [x, y - 1],
            [x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x, y + 5], [x, y + 6], [x, y + 7]
        ];

        // nie wychodź poza szachownice
        return allMoves.filter(el => {
            return (el[0] >= 0 && el[0] <= 7);
        });
    };


}
export default Rook;
