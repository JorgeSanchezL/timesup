import { useContext } from 'react';
import { StoreContext } from '../store';
import { GameState } from '../utils/consts';
import { CombineScores } from '../utils/functions';

import './GameEnded.css';

function GameEnded() {
    const { setGameState, roundResults } = useContext(StoreContext);

    const combinedResults = CombineScores(roundResults);

    const keys = Object.keys(combinedResults);

    return (
        <main className="game-ended">
            <h1>Fin del juego</h1>
            {keys.map((key, index) => (
                <div key={index} className="result">
                    <h2>{key}</h2>
                    <h4>{combinedResults[key]}</h4>
                </div>
            ))}
            <button
                onClick={() => {
                    setGameState(GameState.GAME_NOT_STARTED);
                }}
            >
                Volver al inicio
            </button>
        </main>
    );
}

export default GameEnded;