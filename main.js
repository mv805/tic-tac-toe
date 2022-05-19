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
    let _currentPlayer = _player1;

    const toggleCurrentPlayer = () => {

        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
        } else {
            _currentPlayer = _player1;
        }
    }

    const getCurrentPlayer = () => {
        return _currentPlayer;
    }

    const getPlayer = (playerNumberSpecified) => {
        if (playerNumberSpecified === 1) {
            return _player1;
        } else if (playerNumberSpecified === 2) {
            return _player2;
        } else {
            return;
        }
    }

    return { toggleCurrentPlayer, getCurrentPlayer, getPlayer };

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

    const getBoard = () => {
        return _board;
    }

    const _markBoard = (player, row, column) => {
        _board[row][column] = player.marker;
    }

    const _getCellPos = (cellId) => {
        return _displayBoard[`${cellId}`];
    }

    const _addMarkerToDocument = (e) => {
        console.log(`Position - [${_getCellPos(e.target.id)[0]}, ${_getCellPos(e.target.id)[1]}]`);
        e.target.textContent = gameState.getCurrentPlayer().marker;
        _markBoard(gameState.getCurrentPlayer(), _getCellPos(e.target.id)[0], _getCellPos(e.target.id)[1]);
    }

    return { getBoard, addGameMarker };

})();


const boardCells = document.querySelectorAll('.marker-cell');
for (const cell of boardCells) {
    cell.addEventListener('click', gameBoard.addGameMarker);
}