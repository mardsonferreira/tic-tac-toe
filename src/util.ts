let scores = {
    X: 10,
    O: -10,
    tie: 0,
};

function equals3(a: string, b: string, c: string) {
    return a === b && b === c && a !== "";
}

function checkWinner(board: Array<Array<string>>) {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots === 0) {
        return "Draw";
    } else {
        return winner;
    }
}

function convertSquares(squares: Array<string>) {
    let board = [];
    let n = 3;

    for (let i = 0; i < n; i++) {
        board[i] = squares.slice(i * n, i * n + n);
    }

    return board;
}

const bestMove = (squares: Array<string>) => {
    let board = convertSquares(squares);

    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
                board[i][j] = "X";
                let score = minimax(board, 0, false);
                board[i][j] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    return move;
};

function minimax(
    board: Array<Array<string>>,
    depth: number,
    isMaximizing: boolean
) {
    let result = checkWinner(board);
    if (result) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    board[i][j] = "X";
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    board[i][j] = "O";
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

const calculateWiner = (squares: Array<string>) => {
    let board = convertSquares(squares);
    return checkWinner(board);
};

export { calculateWiner, bestMove };
