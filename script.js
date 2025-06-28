
document.addEventListener('DOMContentLoaded', () => {
    
    const startButton = document.getElementById('startbtn');
    const resetButton = document.getElementById('resetButton');
    const gameContent = document.querySelector('.game-content');
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.querySelector('.status');
    const currentPlayerDisplay = document.querySelector('.current-player');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const tieSound = document.getElementById('tieSound');

    
    let currentPlayer = 'x';
    let gameActive = false;
    let board = Array(9).fill(null);

   
    const initGame = () => {
        gameContent.style.display = 'block';
        startButton.style.display = 'none';
        gameActive = true;
        currentPlayer = 'x';
        board.fill(null);
        currentPlayerDisplay.textContent = 'X';
        currentPlayerDisplay.style.color = 'var(--accent-blue)';
        statusDiv.textContent = '';
        statusDiv.classList.remove('winner');
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner', 'winning-cell');
        });
    };


    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return {
                    winner: board[a],
                    winningPattern: pattern
                };
            }
        }

        return board.every(cell => cell !== null) ? { winner: 'tie' } : null;
    };


    const findWinningPattern = (player) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.find(pattern => 
            pattern.every(index => board[index] === player)
        );
    };

    // Handle Cell Click
    const handleCellClick = (e) => {
        if (!gameActive) return;

        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index]) return;

        // Make move
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        clickSound.currentTime = 0;
        clickSound.play();

        // Check game state
        const result = checkWinner();

        if (result) {
            gameActive = false;
            
            if (result.winner === 'tie') {
                statusDiv.textContent = "It's a tie!";
                statusDiv.classList.add('winner');
                tieSound.currentTime = 0;
                tieSound.play();
            } else {
                statusDiv.textContent = `Player ${result.winner.toUpperCase()} wins!`;
                statusDiv.classList.add('winner');
                winSound.currentTime = 0;
                winSound.play();
                
                
                if (result.winningPattern) {
                    result.winningPattern.forEach(index => {
                        cells[index].classList.add('winning-cell');
                    });
                }
            }
        } else {
            
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            currentPlayerDisplay.textContent = currentPlayer.toUpperCase();
            currentPlayerDisplay.style.color = currentPlayer === 'x' ? 'var(--accent-blue)' : 'var(--accent-teal)';
        }
    };

    
    const resetGame = () => {
        gameActive = true;
        currentPlayer = 'x';
        board.fill(null);
        currentPlayerDisplay.textContent = 'X';
        currentPlayerDisplay.style.color = 'var(--accent-blue)';
        statusDiv.textContent = '';
        statusDiv.classList.remove('winner');
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner', 'winning-cell');
        });
    };

    
    startButton.addEventListener('click', initGame);
    resetButton.addEventListener('click', resetGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});