// import board from "./board";
import Rook from "./pieces/rook";
import Knight from "./pieces/knight";
import Queen from "./pieces/queen";
import Bishop from "./pieces/bishop";

class PromotePawn {
  constructor(pawn, board) {
    this.piece = pawn;
    this.initChoices();
    this.promote(board);
  }

  initChoices() {
    const side = this.piece._side;

    const promotionBox = document.createElement("div");
    promotionBox.className = "promotion-box";
    promotionBox.style.color = side;

    const text = document.createTextNode("Promote your pawn!");
    promotionBox.appendChild(text);

    const icons = document.createElement("div");
    icons.className = "promotion-icons";
    promotionBox.appendChild(icons);

    const promoteToRook = document.createElement("i");
    promoteToRook.className = `fas fa-chess-rook ${side}`;
    promoteToRook.id = "rook";
    const promoteToKnight = document.createElement("i");
    promoteToKnight.className = `fas fa-chess-knight ${side}`;
    promoteToKnight.id = "knight";
    const promoteToBishop = document.createElement("i");
    promoteToBishop.className = `fas fa-chess-bishop ${side}`;
    promoteToBishop.id = "bishop";
    const promoteToQueen = document.createElement("i");
    promoteToQueen.className = `fas fa-chess-queen ${side}`;
    promoteToQueen.id = "queen";

    [promoteToRook, promoteToKnight, promoteToBishop, promoteToQueen].forEach(
      el => icons.appendChild(el)
    );

    const coverBoard = document.createElement("div");
    coverBoard.className = "cover-board";

    document.querySelector(".wrap").appendChild(coverBoard);
    document.querySelector(".wrap").appendChild(promotionBox);
  }

  promote(board) {
    const x = this.piece._x;
    const y = this.piece._y;
    const side = this.piece._side;
    const promotionBox = document.querySelector(".promotion-box");
    const coverBoard = document.querySelector(".cover-board");
    const icons = [...document.querySelector(".promotion-icons").children];

    // dodanie event listenerow
    icons.forEach(figure => {
      figure.addEventListener("click", event => {
        switchFigures(event, board)
      });
    });

    function switchFigures(e, board) {
      let newFigure;
      switch (e.target.id) {
        case "knight":
          newFigure = new Knight(x, y, side);
          break;
        case "rook":
          newFigure = new Rook(x, y, side);
          break;
        case "bishop":
          newFigure = new Bishop(x, y, side);
          break;
        case "queen":
          newFigure = new Queen(x, y, side);
          break;
        default:
          break;
      }

      // podmiana pionka na nowa figure
      board[x][y] = newFigure;

      // zmiana wyswietlanej ikony od razu po wybraniu nowej figury
      document.querySelector(`[data-id="${x}-${y}"]`).innerHTML =
        newFigure.display;

      document.querySelector(".wrap").removeChild(promotionBox);
      document.querySelector(".wrap").removeChild(coverBoard);
    }
  }
}

export default PromotePawn;
