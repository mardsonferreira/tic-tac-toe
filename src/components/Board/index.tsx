import React, { useMemo } from "react";
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

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {squares.slice(0, 3).map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onSquareClick={() => handleClick(index)}
                    />
                ))}
            </div>
            <div className="board-row">
                {squares.slice(3, 6).map((value, index) => (
                    <Square
                        key={index + 3}
                        value={value}
                        onSquareClick={() => handleClick(index + 3)}
                    />
                ))}
            </div>
            <div className="board-row">
                {squares.slice(6, 9).map((value, index) => (
                    <Square
                        key={index + 6}
                        value={value}
                        onSquareClick={() => handleClick(index + 6)}
                    />
                ))}
            </div>
        </>
    );
};

export default Board;
