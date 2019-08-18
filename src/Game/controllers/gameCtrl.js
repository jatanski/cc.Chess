
export default class GameCtrl {   
    constructor(BoardView, BoardModel, boardContainerId) {
        this._boardContainer = document.querySelector(`#${boardContainerId}`);
        this._boardModel = new BoardModel;
        this._boardView = new BoardView(this._boardContainer);
        this._markedFigure = null;
        this._turn = 'white';
    }

    _setListeners() {
        this._boardContainer.addEventListener('click', ev => {
            
            // if (this.prevElement) this.removeHighlight(this.prevElement);
            
            const squarePosition = ev.target
                .closest('.square')
                .dataset.id.split('-')
                .map(el => {
                    return +el;
                });

            // console.log(squarePosition);
            
            this._controllClick(squarePosition);
            // this.displayMoves(position, ev.target);
        });
    }

    _controllClick(position) {
        const x = position[0];
        const y = position[1];

        const boardElement = this._boardModel[x][y] || null;

        /* Musiałem to zrobić w taki sposób, bo jak się okazuje stosowanie obiektów 
        razem z operatorami logicznymi wcale nie jest takie logiczne... */
        const gotBoardElement = Boolean(boardElement);
        const gotMarkedFigure = Boolean(this._markedFigure);

        // // Tour
        // const yourTurn = this._turn === boardElement._side;
        // if (!yourTurn) return;;

        switch (true) {

            // Brak zaznaczenia / kliknięta figura
            case (!gotMarkedFigure && gotBoardElement) : 
                console.log('Zaznaczam figurę');
                this._handleMark(boardElement);
            break;

            // Zaznaczona / kliknięta pusta
            case (gotMarkedFigure && !gotBoardElement):
                console.log('Próbuje ruszyć');
                this._handleMove(position);
            break;

            // Zaznaczona / kliknięta figura przeciwnika
            case (gotMarkedFigure && gotBoardElement && this._isEnemy(boardElement)):
                console.log('Próbuję bić');
                this._handleAttack(position);
            break;

            default:
                this._clearState();
        }
    }

    _isEnemy(figure) {
        return (this._markedFigure._side !== figure._side) ? true : false;
    }

    _getMoves(figure) {
        return figure.findLegalMoves(this._boardModel);
    }

    _clearState() {
        this._markedFigure = null;
        this._boardView.removeHighlight();
        this._boardView.removeMark();
    }

    _displayMoves(figure) {
        const moves = this._getMoves(figure);
        this._boardView.highlightSquares(moves);
        this._boardView.markSquare([figure._x, figure._y]);
    }

    _handleMark(figure) {
        this._markedFigure = figure;
        this._displayMoves(figure);
    }

    _handleMove(position) {
        const moves = this._getMoves(this._markedFigure);
        
        // Jeżeli kliknięte pole znajduje się w tabeli mozliwych ruchów to rusz, jak nie odznacz
        const moveIndex = moves.findIndex(move => move.join() === position.join() );

        if (moveIndex > -1) {
            console.log('RUSZAM!')

            const oldPosition = [this._markedFigure._x, this._markedFigure._y];

            // Aktualizuje model
            this._markedFigure.move(position, this._boardModel);

            // Aktualizuje widok - przesyłamy _markedFigure, ponieważ posiada zaktualizowane _x oraz _y
            this._boardView.movePiece(oldPosition, this._markedFigure)

        }

        // Po ruchu lub kliknięcu w niewłaściwe pole
        this._clearState();
    }

    _handleAttack(position) {
        let attacks;

        if (this._markedFigure.name === 'pawn') {
            attacks = this._markedFigure.findLegalAttacs();
        } else {
            // Figury (bez piona) atakują te same pola po ktorych się poruszają
            attacks = this._getMoves(this._markedFigure); 
        }

        const attackIndex = attacks.findIndex(attack => attack.join() === position.join() );

        if (attackIndex > -1) {     
            console.log('BIJE!')

            const oldPosition = [this._markedFigure._x, this._markedFigure._y];

            // Aktualizuje model
            this._markedFigure.move(position, this._boardModel);

            // Aktualizuje widok - przesyłamy _markedFigure, ponieważ posiada zaktualizowane _x oraz _y
            this._boardView.movePiece(oldPosition, this._markedFigure)
        }

        // Po biciu lub kliknięcu w niewłaściwe pole
        this._clearState();
    } 
    
    init() {
        console.log('Inicjalizacja controllera...');
        
        this._boardModel.init();
        this._boardView.init(this._boardModel);
        this._setListeners();

        console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
    }
} 