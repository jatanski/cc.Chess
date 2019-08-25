import Piece from "./piece";

class King extends Piece {
    constructor(x, y, side) {
        super(x, y, side);
        this.name = "king";
        this.display = `<i class="fas fa-chess-king ${side}"></i>`;
    }

    //move - pozycja mozliwych ruchow (wlacznie z kolizjami)

    //board[move[0]][move[1]] - pionki na planszy na pozycjach z move, jak nie ma
    //to null

    //colissionFilter - filtruje zajete pola z wyjatkiem tych, nalezacych do pionkow przeciwnych
    collisionFilter(possibleMoves, board) {
        const clearedMoves = [];
        let side = this._side;
        let enemySide;
        if (side == 'white') {
            enemySide = 'black';
        } else {
            enemySide = 'white';
        }

        const enemyKingPos = (this.checkForKing(board, enemySide));
        const enemyKingPosX = enemyKingPos[0];
        const enemyKingPosY = enemyKingPos[1];

        let blockedByEnemy = [
            [enemyKingPosX+1, enemyKingPosY+1],
            [enemyKingPosX+1, enemyKingPosY-1],
            [enemyKingPosX-1, enemyKingPosY+1],
            [enemyKingPosX-1, enemyKingPosY-1],
            [enemyKingPosX, enemyKingPosY+1],
            [enemyKingPosX, enemyKingPosY-1],
            [enemyKingPosX+1, enemyKingPosY],
            [enemyKingPosX-1, enemyKingPosY]
        ];
        //console.log(enemyKingPos);
        for (let move of possibleMoves) {
            const xPos = move[0];
            const yPos = move[1];
            const piecesInfo = board[xPos][yPos];
                if (!(piecesInfo && piecesInfo._side == side)) { 
                        clearedMoves.push(move);
                    }
                }
        
        for (let i=0; i<clearedMoves.length; i++){
            for (let j=0; j<blockedByEnemy.length; j++){
                if ((clearedMoves[i][0] == blockedByEnemy[j][0] && clearedMoves[i][1] == blockedByEnemy[j][1])){
                    clearedMoves.splice(i,1);
                }
            }
   
        }
            return clearedMoves;
    }
       
    //szuka krolow na szachownicy, jak side = white, to wtedy bialego
    checkForKing(board, side='white') {
        let enemyKingPos = [];
        for (let i=0; i<board.length; i++){
            for (let j=0; j<board.length; j++){
                if(board[i][j] && board[i][j].name == 'king' && board[i][j]._side == side){
                    enemyKingPos = [i,j]
                }     
            }
        }
        return enemyKingPos;
    }

    

    // główna metoda, w której trzeba zapisać wszystkie możliwe ruchy danej bierki.
    findLegalMoves(board) {
        const x = this._x;
        const y = this._y;

        //aktualna pozycja
        const cord = [x,y];
        
        let possibleMoves =[];
        
        //tworzy tablice wektorow x,y z mozliwymi rozwiazaniami (zaczyna od lewego, gornego rogu)
        for (let i = (cord[0]-1); i<(cord[0]+2); i++){
            for (let j = (cord[1]-1); j<(cord[1]+2); j++){

                //sprawdza czy poza plansza (x>=0, xM=7, y>=0, x<=7) oraz usuwa z listy mozliwych ruchow pole, na ktorym aktualnie stoi
                if (((i<=7 && i>=0) && (j<=7 && j>=0)) && !(i==cord[0] && j==cord[1])) {
                    possibleMoves.push([i,j])
                }
            }
        }
        possibleMoves = this.collisionFilter(possibleMoves, board);
        this.checkForKing(board);
        return possibleMoves;
    }
}
export default King;