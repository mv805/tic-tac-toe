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
    const player1Indicator = document.querySelector('#player-1');
    const player2Indicator = document.querySelector('#player-2');
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



    return { toggleCurrentPlayer, getCurrentPlayer };

})();

const gameBoard = (() => {

    const _board = [
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

    const addGameMarker = (e) => {

        if (e.target.textContent != '') {
            return;
        }

        _addMarkerToDocument(e);
        console.table(_board);

        gameState.toggleCurrentPlayer();

    }

    const _markBoard = (row, column) => {
        _board[row][column] = gameState.getCurrentPlayer().marker;
    }

    const _getCellPos = (cellId) => {
        return _displayBoard[`${cellId}`];
    }

    const _addMarkerToDocument = (e) => {

        console.log(`Position - [${_getCellPos(e.target.id)[0]}, ${_getCellPos(e.target.id)[1]}]`);
        e.target.textContent = gameState.getCurrentPlayer().marker;
        _markBoard(_getCellPos(e.target.id)[0], _getCellPos(e.target.id)[1]);

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

    return { addGameMarker, checkWinStatus };

})();


const boardCells = document.querySelectorAll('.marker-cell');
for (const cell of boardCells) {
    cell.addEventListener('click', gameBoard.addGameMarker);
}