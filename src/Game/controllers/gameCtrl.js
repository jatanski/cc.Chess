
export default class GameCtrl {   
    constructor(BoardView, BoardModel, boardContainerId) {
        this._boardContainer = document.querySelector(`#${boardContainerId}`);
        this._boardModel = new BoardModel;
        this._boardView = new BoardView(this._boardContainer);
        this._markedFigure = null;
        this._turn = 'white';
        this._check = {};
        this._play = true;
    }

    _setListeners() {
        this._boardContainer.addEventListener('click', ev => {
            
            const squarePosition = ev.target
                .closest('.square')
                .dataset.id.split('-')
                .map(el => {
                    return +el;
                });

            this._controllClick(squarePosition);
        });
    }

    _checkIfCheck() {
        let enemyKingPosition;
        const allYourPossibleMoves = [];

        this._boardModel.forEach(row => {
            row.forEach(figure => {
                if (figure == null) return 

                // Znajdź przeciwnego króla
                if (figure.name === 'king' && figure._side !== this._turn) {
                    enemyKingPosition = [figure._x, figure._y];
                }

                // Sprawdź wszystkie możliwe ataki wszystkich figur gracza, który własnie wykonał ruch
                if (figure._side === this._turn) {
                    if(figure.name === 'pawn') {
                        // Pion jest tak napisany, że sprawdza w klasie czy atak jest możliwy,
                        // dlatego _getAttacks zwróci wartość tylko w momencie gdy obok piona cos stoi
                        allYourPossibleMoves.push(...this._getAttacks(figure))
                    } else {
                        allYourPossibleMoves.push(...this._getMoves(figure))
                    }
                }
            })
        })

        // Po każdym ruchu sprawdzamy czy pozycja przeciwnego króla znajduje się w możliwych kolejnej tury
        const isKingInDanger = positions => positions.join() === enemyKingPosition.join();
        if (allYourPossibleMoves.some(isKingInDanger)) {
            this._check.isCheck = true;
            this._check.onKingPosition = enemyKingPosition;
            this._boardView.markCheck(enemyKingPosition);
        } else {
            this._check = {}
            this._boardView.removeCheck();
        };

        return this._check.isCheck;
    }

    _findAllEnemyPossibleAttacks() {
        const allPossibleAttacks = [];
        this._boardModel.forEach(row => {
            row.forEach(figure => {
                if (figure == null) return 

                // Sprawdź wszystkie możliwe ataki przeciwnika
                if (figure._side !== this._turn) {
                    if(figure.name === 'pawn') {
                        allPossibleAttacks.push(...this._getAttacks(figure))
                    } else {
                        allPossibleAttacks.push(...this._getMoves(figure))
                    }
                }
            })
        })
        return allPossibleAttacks;
    }

    _findKingMovesWhenCheck() {
        const legalMoves = [];
        const king = this._boardModel[this._check.onKingPosition[0]][this._check.onKingPosition[1]];
        const enemyAttacks = this._findAllEnemyPossibleAttacks();
        const kingMoves = this._getMoves(king);

        kingMoves.forEach(position => {
            const samePosition = enemyAttacks.some(attackPosition => {
                return attackPosition.join() === position.join();;
            })
            if(samePosition) return
            legalMoves.push(position);
        });

        if (legalMoves.length < 1) {
            const who = (this._turn === 'white') ? 'black' : 'white';
            this._endGame(who);
        }
        return legalMoves;
    }

    _controllClick(position) {
        // Nie rób nic, jeżeli koniec gry
        if(!this._play) return;

        const x = position[0];
        const y = position[1];

        const boardElement = this._boardModel[x][y] || null;

        /* Musiałem to zrobić w taki sposób, bo jak się okazuje stosowanie obiektów 
        razem z operatorami logicznymi wcale nie jest takie logiczne... */
        const gotBoardElement = Boolean(boardElement);
        const gotMarkedFigure = Boolean(this._markedFigure);

        switch (true) {

            // Brak zaznaczenia / kliknięta figura
            case (!gotMarkedFigure && gotBoardElement) : 

                // Uproszczenie, ale trudno, nie ma czasu
                if (this._check.isCheck && boardElement.name !== 'king' ) return;

                if (this._turn !== boardElement._side) return;
                this._handleMark(boardElement);
            break;

            // Zaznaczona / kliknięta pusta
            case (gotMarkedFigure && !gotBoardElement):
                this._handleMove(position);
            break;

            // Zaznaczona / kliknięta figura przeciwnika
            case (gotMarkedFigure && gotBoardElement && this._isEnemy(boardElement)):
                this._handleAttack(position);
            break;

            default:
                this._clearState();
        }
    }
    
    _afterMoveOrAttack() {
        this._checkIfCheck();
        this._turn = (this._turn === 'white') ? 'black' : 'white';
        this._clearTimeIntervals();
        this._setTimeInterval(this._turn);

        if (this._check.isCheck) this._findKingMovesWhenCheck();
    }

    _isEnemy(figure) {
        return (this._markedFigure._side !== figure._side) ? true : false;
    }

    _getMoves(figure) {
        const moves = figure.findLegalMoves(this._boardModel);
        return moves;
    }

    _getKingMoves(figure) {
        const allLegalMoves = [];
        const moves = figure.findLegalMoves(this._boardModel);

        if(moves.length < 1) return;

        const allEnemyAttacks = this._findAllEnemyPossibleAttacks();

        moves.forEach(position => {
            const samePosition = allEnemyAttacks.some(enemyAttackPos => {
                return enemyAttackPos.join() === position.join();;
            })
            if(samePosition) return
            allLegalMoves.push(position);
        });

        return allLegalMoves;
    }

    _getAttacks(figure) {
        return figure.findLegalAttacks(this._boardModel);
    }

    _clearState() {
        this._markedFigure = null;
        this._boardView.removeHighlight();
        this._boardView.removeMark();
        this._boardView.removeAttacks();
    }

    _displayMoves(figure) {
        let moves;

        if(this._check.isCheck && figure.name === 'king') {
            moves = this._findKingMovesWhenCheck();
        } else if (figure.name === 'king') {
            moves = this._getKingMoves(figure);
        } else {
            moves = this._getMoves(figure);
        }

        this._boardView.highlightSquares(moves);
        this._boardView.markSquare([figure._x, figure._y]);

        if (figure.name === 'pawn') {
            let attacks = this._getAttacks(figure);
            attacks = figure._showAttackOnlyIfPossible(attacks, this._boardModel);
            this._boardView.highlightAttacks(attacks);
        }
    }

    _handleMark(figure) {
        this._markedFigure = figure;
        this._displayMoves(figure);
    }

    _filterEnemyKingPosition(moves) {
        let kingPosition;
        const oppositeKingColor = (this._markedFigure._side === 'white') ? 'black' : 'white';

        this._boardModel.forEach(row => {
            row.forEach(figure => {
                if(figure && figure.name === 'king' && figure._side === oppositeKingColor) {
                    kingPosition = [figure._x, figure._y]
                }
            })
        });

        return moves.filter(el => {
            return !(el[0] == kingPosition[0] && el[1] == kingPosition[1]); 
        })
    }

    /* Metody _handleMove i _handleAttack są praktycznie identyczne,
    jednak oddzielenie ich pozwala trochę lepiej zrozumieć kod,
    ponadto w przyszłości zaimplementowanie roszady */ 

    _handleMove(position) {
        let moves;

        if (this._check.isCheck && this._markedFigure.name === 'king') {
            moves = this._findKingMovesWhenCheck();

        } else if (this._markedFigure.name === 'king') {
            moves = this._getKingMoves(this._markedFigure);

        } else {
            moves = this._getMoves(this._markedFigure);
        }

        // Jeżeli kliknięte pole znajduje się w tabeli mozliwych ruchów to rusz, jak nie odznacz
        const moveIndex = moves.findIndex(move => move.join() === position.join() );

        if (moveIndex > -1) {

            const oldPosition = [this._markedFigure._x, this._markedFigure._y];

            // Aktualizuje model
            this._markedFigure.move(position, this._boardModel);

            // Aktualizuje widok - przesyłamy _markedFigure, ponieważ posiada zaktualizowane _x oraz _y
            this._boardView.movePiece(oldPosition, this._markedFigure)

            this._afterMoveOrAttack();
        }

        // Po ruchu lub kliknięcu w niewłaściwe pole
        this._clearState();
    }

    _handleAttack(position) {

        let attacks;

        if (this._markedFigure.name === 'pawn') {
            attacks = this._markedFigure.findLegalAttacks(this._boardModel);

        } else if (this._markedFigure.name === 'king') {
            attacks = this._getKingMoves(this._markedFigure);

        } else {
            // Figury (bez piona) atakują te same pola po ktorych się poruszają
            attacks = this._getMoves(this._markedFigure); 
        }

        // Nie bijemy króla
        attacks = this._filterEnemyKingPosition(attacks);

        const attackIndex = attacks.findIndex(attack => attack.join() === position.join() );

        if (attackIndex > -1) {     

            const oldPosition = [this._markedFigure._x, this._markedFigure._y];

            // Aktualizuje model
            this._markedFigure.move(position, this._boardModel);

            // Aktualizuje widok - przesyłamy _markedFigure, ponieważ posiada zaktualizowane _x oraz _y
            this._boardView.movePiece(oldPosition, this._markedFigure)
            
            this._afterMoveOrAttack();
        }

        // Po biciu lub kliknięcu w niewłaściwe pole
        this._clearState();
    }

    _initTimers(gameDurationInMinutes) {
        const currentTime = Date.now();
        const gameDurationTimeStamp = (currentTime + gameDurationInMinutes * 60 * 1000) - currentTime;
        this.timeBlack = gameDurationTimeStamp / 1000;
        this.timeWhite = gameDurationTimeStamp / 1000;
        this._setTimeInterval('white');
    }

    _setTimeInterval(side) {
        if (side === 'white') {
            this.timeWhiteInterval = setInterval(() => {
                this.timeWhite--;
                if(this.timeWhite < 0) return this._endGame('black');
                this._boardView.updateTime(this._boardView.timerWhite, this.timeWhite);
            }, 1000)
        } else {
            this.timeBlackInterval = setInterval(() => {
                this.timeBlack--;
                if(this.timeBlack < 0) return this._endGame('white');
                this._boardView.updateTime(this._boardView.timerBlack, this.timeBlack);
            }, 1000)
        }
    }

    _clearTimeIntervals() {
        clearInterval(this.timeBlackInterval);
        clearInterval(this.timeWhiteInterval);
    }
    
    _endGame(winnerSide) {
        this._clearTimeIntervals();
        this._play = false;

        // wyświetlanie okna informującego o zwycięstwie jednej ze stron

        var endGameMsg = document.createElement('div');
        var wrapContainer = document.querySelector('.wrap');
        var msgContent = `Gratulacje!
            Wygrywają  ${(winnerSide === 'white') ? 'białe' : 'czarne'}`;
        var txtNode = document.createTextNode(msgContent);
        var divBefore = document.getElementById("before");

        endGameMsg.appendChild(txtNode);
        wrapContainer.insertBefore(endGameMsg, divBefore);

        endGameMsg.style.zIndex = '2';
        endGameMsg.style.fontFamily = 'Lexend Peta';
        endGameMsg.style.fontSize = '1.7rem';
        endGameMsg.style.position = 'absolute'; 
        endGameMsg.style.color = 'rgb(202, 190, 190)';
        endGameMsg.style.backgroundColor = 'rgba(0, 0, 0, 0.671)';
        endGameMsg.style.padding = '20px';
        endGameMsg.style.textJustify = 'center';
        console.log(endGameMsg);
    }

    init() {
        console.log('Inicjalizacja controllera...');
        
        this._boardModel.init();
        this._boardView.init(this._boardModel);
        this._setListeners();
        this._initTimers(2);

        console.log(this._boardModel); // służy do podejrzenia tablicy w konsoli
    }
} 
