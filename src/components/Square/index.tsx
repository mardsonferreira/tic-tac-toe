import React from "react";

import "./styles.css";

interface SquareProps {
    value: string
    onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick}) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};

export default Square;
