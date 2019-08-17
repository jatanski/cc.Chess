import board from "./board";

export default class BoardView {
  constructor(boardElement) {
    this.prevElement = null;
    this.currentRound = 'white';
    this._boardElement = boardElement;
    this._squares = this._boardElement.querySelectorAll(".square");
  }

  _displayPieces() {
    // Iterujemy po wszystkich elementach (empty jest pomijany w iteracji) w tablicy board
    board.forEach((row, rowIndex) => {
      row.forEach((piece, squareIndex) => {
        this._boardElement.querySelector(
          `[data-id="${rowIndex}-${squareIndex}"]`
        ).innerHTML = piece.display ? piece.display : "ERROR";
      });
    });
  }

  _setListeners() {
    this._boardElement.addEventListener("click", ev => {
      if (this.prevElement) this.removeHighlight(this.prevElement);
      const position = ev.target
        .closest(".square")
        .dataset.id.split("-")
        .map(el => {
          return +el;
        });
      console.log(position);
      this.displayMoves(position, ev.target);
      return position;
    });
  }
  _setListenersToSquare() {
    const squares = Array.from(this._boardElement.children);
    squares.forEach(square => {
      square.addEventListener("click", () => {
        this._markFigure(square);
        this._tryMove(square);
      });
    });
  }

  // zaznacza figurę, która została dotknięta
  _markFigure(square) {
    const startPosition = this._getPostionFromSquare(square);
    board.forEach(row => {
      row.forEach(piece => {
        if (piece)
          if (piece._x === startPosition[0] && piece._y === startPosition[1]) {
            const legalMoves = piece.findLegalMoves();
            sessionStorage.setItem(
              "positionFigure",
              JSON.stringify(startPosition)
            );
            sessionStorage.setItem("legalMoves", JSON.stringify(legalMoves));
          }
      });
    });
  }

  //próbuje wykonać ruch, jeżeli klinięte wole jest wśród legalnych posunięć to wykonuje ruch
  _tryMove(square) {
    const newPosition = this._getPostionFromSquare(square);

    if(!sessionStorage.getItem("legalMoves")) return;

    let legalMovesArray = sessionStorage.getItem("legalMoves");
    legalMovesArray = JSON.parse(legalMovesArray);


    let startPosition = sessionStorage.getItem("positionFigure");
    startPosition = JSON.parse(startPosition);


    legalMovesArray.forEach(legalMoves => {
      if (
        newPosition[0] === legalMoves[0] &&
        newPosition[1] === legalMoves[1]
      ) {
        console.log("poruszam się");
        board.forEach(row => {
          row.forEach(piece => {
            if (piece && piece._side === this.currentRound)
              if (
                piece._x === startPosition[0] &&
                piece._y === startPosition[1]
              ) {
                piece.move(newPosition);
                sessionStorage.removeItem("legalMoves");
                sessionStorage.removeItem("positionFigure");
                this.currentRound = this.currentRound === 'white' ? 'black':'white';
              }
          });
        });
      }
    });
  }

  // zmienia typ z string na number
  _getPostionFromSquare(square) {
    const positionX = parseInt(square.dataset.x);
    const positionY = parseInt(square.dataset.y);
    return [positionX, positionY];
  }

  displayMoves(position, el) {
    let figure = null;
    if(el.nodeName == "I")
      figure = el;
    else
      figure = el.childNodes[0];

    if (figure.classList && figure.classList.contains(this.currentRound)) {
      this.highlightSquares(position);
      this.prevElement = position;
      board[position[0]][position[1]].findLegalMoves().forEach(p => this.highlightSquares(p));
    }
  }

  tests() {
    this.highlightSquares([1, 1], [1, 2]);
    this.highlightSquares(1, 3);
    setTimeout(() => {
      this.removeHighlight();
    }, 2000);
  }

  highlightSquares(...squares) {
    if (!(squares[0] instanceof Array)) {
      squares = [[...squares]];
    }
    squares.forEach(position => {
      this._boardElement
        .querySelector(`[data-id="${position[0]}-${position[1]}"]`)
        .classList.add("highlighted");
    });
  }

  removeHighlight() {
    this._boardElement.querySelectorAll(".highlighted").forEach(el => {
      el.classList.remove("highlighted");
    });
  }

  tests() {
    this.highlightSquares([1, 1], [1, 2]);
    this.highlightSquares(1, 3);
    setTimeout(() => {
      this.removeHighlight();
    }, 2000);
  }

  init() {
    this._displayPieces();
    this._setListeners();
    // this.tests();

    this._setListenersToSquare();
  }
}
