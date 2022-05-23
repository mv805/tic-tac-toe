const player = (playerNumber, marker) => {

    let _gameWins = 0;

    const addWin = () => {
        _gameWins++;
    }

    const getWins = () => {
        return _gameWins;
    }

    return { playerNumber, marker, getWins, addWin };
}

const gameState = (() => {

    const _player1 = player(1, 'X');
    const _player2 = player(2, 'O');
    const player1Indicator = document.querySelector('#player-1-indicator');
    const player2Indicator = document.querySelector('#player-2-indicator');
    const statusBar = document.querySelector('.game-current-status');

    let _currentPlayer = _player1;

    const toggleCurrentPlayer = () => {

        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
            player1Indicator.classList.remove('player-indicator-active');
            player2Indicator.classList.add('player-indicator-active');
        } else {
            _currentPlayer = _player1;
            player2Indicator.classList.remove('player-indicator-active');
            player1Indicator.classList.add('player-indicator-active');
        }
        statusBar.textContent = `Player ${_currentPlayer.playerNumber} (${_currentPlayer.marker}'s) take your turn`;
    }

    const getCurrentPlayer = () => {
        return _currentPlayer;
    }

    const resetGame = () => {
        _currentPlayer = _player1;
        player2Indicator.classList.remove('player-indicator-active');
        player1Indicator.classList.remove('player-indicator-active');
        player1Indicator.classList.add('player-indicator-active');
        statusIndicator.textContent = 'Player 1 (X\'s) take your turn';
        gameBoard.resetBoard();
        for (const cell of boardCells) {
            cell.addEventListener('click', gameLoop);
            cell.textContent = '';
        }
    }

    return { toggleCurrentPlayer, getCurrentPlayer, resetGame };

})();

const gameBoard = (() => {

    let _board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const _displayBoard = {

        'cell-1': [0, 0],
        'cell-2': [0, 1],
        'cell-3': [0, 2],
        'cell-4': [1, 0],
        'cell-5': [1, 1],
        'cell-6': [1, 2],
        'cell-7': [2, 0],
        'cell-8': [2, 1],
        'cell-9': [2, 2]

    };

    const _markBoard = (row, column) => {
        _board[row][column] = gameState.getCurrentPlayer().marker;
    }

    const _getCellPos = (cellId) => {
        return _displayBoard[`${cellId}`];
    }

    const getBoard = () => {
        return _board;
    }

    const resetBoard = () => {
        _board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ];
    }

    const addMarkerToDocument = (e) => {

        let pos = [_getCellPos(e.target.id)[0], _getCellPos(e.target.id)[1]];
        console.log(`Selected position - [${pos[0]}, ${pos[1]}]`);
        _markBoard(pos[0], pos[1]);
        e.target.textContent = _board[pos[0]][pos[1]];

    }

    const checkWinStatus = (marker) => {

        let matchCount = 0;
        //check row wins
        for (let row = 0; row < _board.length; row++) {
            for (let col = 0; col < _board[row].length; col++) {
                if (_board[row][col] === marker) {
                    matchCount++;
                }
            }
            if (matchCount === 3) {
                return true;
            } else {
                matchCount = 0;
            }
        }
        //check col wins
        for (let col = 0; col < _board[0].length; col++) {
            for (let row = 0; row < _board.length; row++) {
                if (_board[row][col] === marker) {
                    matchCount++;
                }
            }
            if (matchCount === 3) {
                return true;
            } else {
                matchCount = 0;
            }
        }

        //check diagonal wins
        if (_board[0][0] === marker &&
            _board[1][1] === marker &&
            _board[2][2] === marker) {
            return true;
        }

        if (_board[0][2] === marker &&
            _board[1][1] === marker &&
            _board[2][0] === marker) {
            return true;
        }

        return false;
    }

    return { checkWinStatus, addMarkerToDocument, getBoard, resetBoard };

})();

function removeCellClickEvents() {
    for (const cell of boardCells) {
        cell.removeEventListener('click', gameLoop);
    }
}

function gameLoop(e) {
    if (e.target.textContent != '') {
        return;
    }

    gameBoard.addMarkerToDocument(e);
    console.table(gameBoard.getBoard());

    if (gameBoard.checkWinStatus(gameState.getCurrentPlayer().marker)) {
        console.log('game was won');
        gameState.getCurrentPlayer().addWin();
        document.querySelector(`#player-${gameState.getCurrentPlayer().playerNumber}-wins`).textContent = gameState.getCurrentPlayer().getWins();
        removeCellClickEvents();
        statusIndicator.textContent = `Player ${gameState.getCurrentPlayer().playerNumber} is the winner! (Total Wins: ${gameState.getCurrentPlayer().getWins()})`;
        document.querySelector(`#player-${gameState.getCurrentPlayer().playerNumber}-indicator`).classList.remove('player-indicator-active');
    } else {
        gameState.toggleCurrentPlayer();
    }
}

const boardCells = document.querySelectorAll('.marker-cell');
for (const cell of boardCells) {
    cell.addEventListener('click', gameLoop);
}

const statusIndicator = document.querySelector('.game-current-status');
const resetButton = document.querySelector('button');
resetButton.addEventListener('click', gameState.resetGame);


