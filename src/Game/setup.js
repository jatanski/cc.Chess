import board from "./board";
import BoardView from "./boardView";
// klasa tworząca interfejs aplikacji

class Setup {
  constructor() {
    this.boardElement = document.getElementById("board");
  }
  createSquares() {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const square = document.createElement("div");
        square.dataset.id = `${x}-${y}`;
        square.dataset.x = `${x}`;
        square.dataset.y = `${y}`;
        square.innerHTML = `${x}, ${y}`; // by lepiej widzieć indeksy
        square.className += x % 2 == y % 2 ? "light" : "dark";
        square.classList.add("square");
        this.boardElement.appendChild(square);
      }
    }
  }

  renderPieces() {
    this.view = new BoardView(this.boardElement);
    this.view.init();
  }
}

export default Setup;
