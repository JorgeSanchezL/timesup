import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../store';
import { GameState, Round as RoundEnum } from '../utils/consts';
import { Normalise } from '../utils/functions';
import './Round.css';

function Round() {
    const { words: wordsInformation, currentTeam, time, gameState, setGameState, setRoundPlayed } = useContext(StoreContext)

    const [timeLeft, setTimeLeft] = useState(time)

    useEffect(() => {
        if (wordsInformation.pointedWord === "") {
            wordsInformation.nextWord()
        }
    }, [])

    // Función para actualizar el valor del contador
    const handleTimeUpdate = () => {
        setTimeLeft((prevTime) => prevTime - 1)
    }

    useEffect(() => {
        // Llamar a la función handleTimeUpdate cada segundo
        const intervalId = setInterval(handleTimeUpdate, 1000);
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if (!wordsInformation.wordsLeft || timeLeft === 0) {
            switch (gameState) {
                case GameState.ROUND_1:
                    setRoundPlayed(RoundEnum.ROUND_1)
                    break;
                case GameState.ROUND_2:
                    setRoundPlayed(RoundEnum.ROUND_2)
                    break;
                case GameState.ROUND_3:
                    setRoundPlayed(RoundEnum.ROUND_3)
                    break;
            }
            setGameState(GameState.CHECKING)
        }
    }, [wordsInformation.wordsLeft, timeLeft])

    return (
        <main className="round">
            <h1>{currentTeam}</h1>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${Normalise(timeLeft)}%` }}></div>
            </div>
            <p>{timeLeft}</p>
            <p>{wordsInformation.pointedWord}</p>
            <button onClick={() => {
                wordsInformation.guessWord();
                if (wordsInformation.wordsLeft) {
                    wordsInformation.nextWord();
                }
            }}>
                ✔
            </button>
            {gameState !== GameState.ROUND_1 && (
                <button onClick={() => {
                    wordsInformation.viewWord();
                    if (wordsInformation.wordsLeft) {
                        wordsInformation.nextWord();
                    }
                }}>
                    ✖
                </button>
            )}
        </main>
    );
}

export default Round;