
import { Button } from '@mui/material'
import { useContext } from 'react'
import { StoreContext } from '../store'
import { GameState, Round, WORDS } from '../utils/consts'
import { WordList } from '../utils/words'

interface Props {
    round: Round
}

function Summary(props: Props) {
    const { setGameState, roundResults, setWords } = useContext(StoreContext)

    let round = 0

    switch (props.round) {
        case Round.ROUND_1:
            round = 0
            break;
        case Round.ROUND_2:
            round = 1
            break;
        case Round.ROUND_3:
            round = 2
            break;
    }

    const keys = Object.keys(roundResults[round])

    return (
        <main>
            {
                keys.map((key, index) => {
                    return (
                        <div key={index}>
                            <h1>{key}</h1>
                            <h3>{roundResults[round][key]}</h3>
                        </div>
                    )
                })
            }
            <Button variant='text' onClick={() => {
                setWords(new WordList(WORDS))
                switch (props.round) {
                    case Round.ROUND_1:
                        setGameState(GameState.ROUND_2)
                        break;
                    case Round.ROUND_2:
                        setGameState(GameState.ROUND_3)
                        break;
                    case Round.ROUND_3:
                        setGameState(GameState.GAME_ENDED)
                        break;
                }
            }} >
                Continuar
            </Button>
        </main>
    )
}

export default Summary
