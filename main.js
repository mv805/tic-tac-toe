const player = (playerNumber, marker) => {
    return { playerNumber, marker };
}

const gameBoard = (() => {

    const _player1 = player(1, 'X');
    const _player2 = player(2, 'O');
    let _currentPlayer = _player1;

    const _board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const _displayBoard = {

        'cell-1': [0, 0],
        'cell-2': [0, 1],
        'cell-3': [0, 3],
        'cell-4': [1, 0],
        'cell-5': [1, 1],
        'cell-6': [1, 3],
        'cell-7': [2, 0],
        'cell-8': [2, 1],
        'cell-9': [2, 3]

    };

    const _markBoard = (player, row, column) => {
        _board[row][column] = _player.marker;
    }

    const _getCellPos = (cellId) => {
        return _displayBoard[`${cellId}`];
    }

    const getBoard = () => {
        return _board;
    }

    const markCell = (e) => {
        // console.log('in markCell');
        // console.log(`${e.target.id}`);
        console.log(_getCellPos(e.target.id));
        e.target.textContent = _currentPlayer.marker;
        _markBoard(_currentPlayer, _getCellPos(e.target.id)[0], _getCellPos(e.target.id)[1]);

        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
        } else {
            _currentPlayer = _player1;
        }
    }

    const getCurrentPlayer = () => {
        return _currentPlayer;
    }

    return { getBoard, getCurrentPlayer, markCell };

})();


const boardCells = document.querySelectorAll('.marker-cell');
for (const cell of boardCells) {
    cell.addEventListener('click', gameBoard.markCell);
}