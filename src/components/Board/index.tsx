import React, { memo } from "react";
import Square from "../Square";

import { calculateWinner } from "../../util";

import "./styles.css";

interface BoardProps {
    xIsNext: boolean;
    squares: Array<string>;
    onPlay: (squares: Array<string>) => void;
}


const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
    const handleClick = (i: number): void => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";

        onPlay(nextSquares);
    };

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
            rows.push(rowSquares);
        }
        return rows;
    };

    return <div className="board">{renderSquares()}</div>;
};

export default memo(Board);
