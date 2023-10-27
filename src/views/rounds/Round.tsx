import { GameState } from '../../utils/consts';
import { Button, LinearProgress } from '@mui/material'
import { Normalise } from '../../utils/functions'
import { useContext, useEffect, useState } from 'react'
import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material'
import { StoreContext } from '../../store'
import { Round as RoundEnum } from '../../utils/consts';

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
        <main>
            <h1>{currentTeam}</h1>
            <LinearProgress variant="determinate" value={Normalise(timeLeft)} />
            <p>{timeLeft}</p>
            <p>{wordsInformation.pointedWord}</p>
            <Button variant='text' onClick={() => {
                wordsInformation.guessWord()
                if (wordsInformation.wordsLeft) {
                    wordsInformation.nextWord()
                }
            }} >
                <CheckCircleOutlined fontSize='large' />
            </Button>
            {
                gameState !== GameState.ROUND_1 ?
                    <Button variant='text' onClick={() => {
                        wordsInformation.viewWord()
                        if (wordsInformation.wordsLeft) {
                            wordsInformation.nextWord()
                        }
                    }} >
                        <CancelOutlined fontSize='large' />
                    </Button>
                    :
                    <></>
            }

        </main>
    )
}

export default Round
