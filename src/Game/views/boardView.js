
export default class BoardView {
    constructor(boardContainer) {
        this._boardElement = boardContainer;
    }

    _createSquares(board) {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                const square = document.createElement("div");
                square.dataset.id = `${x}-${y}`;
                square.dataset.x = `${x}`;
                square.dataset.y = `${y}`;
                // square.innerHTML = `${x}, ${y}`; // by lepiej widzieć indeksy
                square.className += x % 2 == y % 2 ? "light" : "dark";
                square.classList.add("square");
                this._boardElement.appendChild(square);
            }
        }
    }

    _displayPieces(board) {
        // Iterujemy po wszystkich elementach (empty jest pomijany w iteracji) tablicy board
        board.forEach((row, rowIndex) => {
            row.forEach((piece, squareIndex) => {
                this._boardElement.querySelector(
                `[data-id="${rowIndex}-${squareIndex}"]`
                ).innerHTML = piece.display ? piece.display : "ERROR";
            });
        });
    }

    _clearField(position) {
        this._boardElement.querySelector(`[data-id="${position[0]}-${position[1]}"]`).innerHTML = '';
    }

    _setFigure(figure) {
        const ox = figure._x;
        const oy = figure._y;

        this._boardElement.querySelector(`[data-id="${ox}-${oy}"]`).innerHTML = figure.display;
    }

    markSquare(position) {
        this._boardElement
            .querySelector(`[data-id="${position[0]}-${position[1]}"]`)
            .classList.add("marked");
    }

    highlightSquares(squares) {
        squares.forEach(position => {
            this._boardElement
                .querySelector(`[data-id="${position[0]}-${position[1]}"]`)
                .classList.add("highlighted");
        });
    }
    
    // Mark to pole na którym stoi zaznaczona bierka
    removeMark() {
        const marked = this._boardElement.querySelector('.marked') || null;
        if (marked) marked.classList.remove("marked");
    }

    // Highlight to pola po których możemy skakać/bić
    removeHighlight() {
        this._boardElement.querySelectorAll('.highlighted').forEach(square => {
            square.classList.remove('highlighted');
        });
    }

    movePiece(positionStart, figure) {
        // Czyścimy stare pole
        this._clearField(positionStart);

        // Ustawiamy aktualne
        this._setFigure(figure);
    }

    promote(position) {
    }

    init(board) {
        this._createSquares(board);
        this._displayPieces(board);
    }
}
