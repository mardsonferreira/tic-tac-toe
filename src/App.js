import React from "react";

import Game from "./components/Game/index.tsx";

function App() {
    return (
        <div className="game">
            <div className="game-board">
                <Game />
            </div>
        </div>
    );
}

export default App;
