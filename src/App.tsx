import { GameState } from './utils/consts';
import './App.css'
import { StoreContext } from './store'
import { useContext } from 'react'
import Round from './views/rounds/Round.tsx';
import WordConfirmation from './views/WordConfirmation.tsx';
import Summary from './views/Summary.tsx';
import GameEnded from './views/GameEnded.tsx';
import StartingView from './views/StartingView.tsx';

function App() {

    const { gameState, roundPlayed } = useContext(StoreContext)

    switch (gameState) {
        case GameState.GAME_NOT_STARTED:
            return <StartingView />
        case GameState.ROUND_1:
        case GameState.ROUND_2:
        case GameState.ROUND_3:
            return <Round />
        case GameState.CHECKING:
            return <WordConfirmation round={roundPlayed} />
        case GameState.SUMMARY:
            return <Summary round={roundPlayed} />
        case GameState.GAME_ENDED:
            return <GameEnded />
        default:
            return <WordConfirmation round={roundPlayed} />
    }
}

export default App
