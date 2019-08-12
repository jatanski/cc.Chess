import board from "./board";

export default class BoardView {
    constructor(boardElement) {
        this._boardElement = boardElement;
        this._squares = this._boardElement.querySelectorAll('.square');
    }

    _displayPieces() {
        // Iterujemy po wszystkich elementach (empty jest pomijany w iteracji) w tablicy board
        board.forEach((row, rowIndex) => {
            row.forEach((piece, squareIndex) => {
                this._boardElement.querySelector(`[data-id="${rowIndex}-${squareIndex}"]`).innerHTML = (piece.display) ? piece.display : 'ERROR';
            });
        });
    }

    _setListeners() {
        this._boardElement.addEventListener('click', (ev) => {
            const position = ev.target.closest('.square').dataset.id.split('-').map(el => {
                return +el;
            });
            console.log(position);
            return position;
        })
    }

    highlightSquares(...squares) {
        if (!(squares[0] instanceof Array)) {
            squares = [[...squares]];
        }
        squares.forEach(position => {
            this._boardElement.querySelector(`[data-id="${position[0]}-${position[1]}"]`).classList.add('highlighted');
        })
    }

    removeHighlight() {
        this._boardElement.querySelectorAll('.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
    }

    tests() {
        this.highlightSquares([1, 1], [1, 2]);
        this.highlightSquares(1,3);
        setTimeout(() => {
            this.removeHighlight();
        }, 2000);
    }

    init() {
        this._displayPieces();
        this._setListeners();
        // this.tests();
    }
}
