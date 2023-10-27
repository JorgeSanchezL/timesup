
import { Button } from '@mui/material'
import { useContext } from 'react'
import { StoreContext } from '../store'
import { GameState } from '../utils/consts'
import { CombineScores } from '../utils/functions'

function GameEnded() {
    const { setGameState, roundResults } = useContext(StoreContext)

    const combinedResults = CombineScores(roundResults)

    const keys = Object.keys(combinedResults)

    return (
        <main>
            <h1>
                Fin del juego
            </h1>
            {
                keys.map((key, index) => {
                    return (
                        <div key={index}>
                            <h2>{key}</h2>
                            <h4>{combinedResults[key]}</h4>
                        </div>
                    )
                })
            }
            <Button variant='text' onClick={() => {
                setGameState(GameState.GAME_NOT_STARTED)
            }} >
                Volver al inicio
            </Button>
        </main>
    )
}

export default GameEnded
