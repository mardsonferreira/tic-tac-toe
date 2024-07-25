import React, { useState, useMemo } from "react";

import Board from "../Board";
import { Button } from "../Button";

import { calculateWinner } from "../../util";

import "./styles.css";

const Game: React.FC = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    const winner = useMemo(
        () => calculateWinner(history[currentMove]),
        [currentMove, history]
    );

    function handlePlay(nextSquares: Array<string>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function handleGoBack() {
        const nextMove = currentMove > 0 ? currentMove - 1 : currentMove;
        jumpTo(nextMove);
    }

    function handleNewGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    return (
        <div className="game">
            <div className="game-intro">
                Welcome to Tic Tac Toe! Take turns to mark your spot and be the
                first to get three in a row. Let the best player win!
            </div>

            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>

            {winner && (
                <div className="winner">
                    The winner is player <span className="winner-status">{winner}</span>
                </div>
            )}

            <div className="game-footer">
                <Button.Root>
                    <Button.ActionButton onClick={handleGoBack}>
                        Go Back
                    </Button.ActionButton>
                </Button.Root>

                <Button.Root>
                    <Button.ActionButton onClick={handleNewGame}>
                        New Game
                    </Button.ActionButton>
                </Button.Root>
            </div>
        </div>
    );
};

export default Game;
