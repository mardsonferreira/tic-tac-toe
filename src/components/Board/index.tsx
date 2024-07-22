import React, { memo, useMemo } from "react";
import Square from "../Square";

interface BoardProps {
    xIsNext: boolean;
    squares: Array<string>;
    onPlay: (squares: Array<string>) => void;
}

const calculateWinner = (squares: Array<string>) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
};

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
    const handleClick = (i: number): void => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";

        onPlay(nextSquares);
    };

    const winner = useMemo(() => calculateWinner(squares), [squares]);
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${xIsNext ? "X" : "O"}`;

    const renderSquares = () => {
        const rows = [];
        for (let i = 0; i < 3; i++) {
            const rowSquares = [];
            for (let j = 0; j < 3; j++) {
                rowSquares.push(
                    <Square
                        key={i * 3 + j}
                        value={squares[i * 3 + j]}
                        onSquareClick={() => handleClick(i * 3 + j)}
                    />
                );
            }
            rows.push(
                <div key={i} className="board-row">
                    {rowSquares}
                </div>
            );
        }
        return rows;
    };

    return (
        <>
            <div className="status">{status}</div>
            {renderSquares()}
        </>
    );
};

export default memo(Board);
