import board from "./board";

// klasa tworząca interfejs aplikacji

class Setup {
  createSquares() {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const square = document.createElement("div");
        square.id = `${x},${y}`;
        // square.innerHTML = `${x}, ${y}`; // by lepiej widzieć indeksy
        square.className += x % 2 == y % 2 ? "light" : "dark";
        square.classList.add("square");
        document.getElementById("board").appendChild(square);
      }
    }
  }
}

export default Setup;
