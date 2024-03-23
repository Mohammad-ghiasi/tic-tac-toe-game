document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

        if (cell.textContent !== '' || !gameActive) return;

        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            status.textContent = `It's a draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    };

    const checkWin = (player) => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    };

    const checkDraw = () => {
        return [...cells].every(cell => {
            return cell.textContent !== '';
        });
    };

    const restartGame = () => {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
});
