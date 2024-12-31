import { GameState } from './utils/consts';
import { StoreContext } from './store';
import { useContext } from 'react';
import Round from './views/Round.tsx';
import WordConfirmation from './views/WordConfirmation.tsx';
import Summary from './views/Summary.tsx';
import GameEnded from './views/GameEnded.tsx';
import StartingView from './views/StartingView.tsx';

import './App.css';

function App() {
    const { gameState, roundPlayed } = useContext(StoreContext);

    let content;
    switch (gameState) {
        case GameState.GAME_NOT_STARTED:
            content = <StartingView />;
            break;
        case GameState.ROUND_1:
        case GameState.ROUND_2:
        case GameState.ROUND_3:
            content = <Round />;
            break;
        case GameState.CHECKING:
            content = <WordConfirmation round={roundPlayed} />;
            break;
        case GameState.SUMMARY:
            content = <Summary round={roundPlayed} />;
            break;
        case GameState.GAME_ENDED:
            content = <GameEnded />;
            break;
        default:
            content = <WordConfirmation round={roundPlayed} />;
            break;
    }

    return (
        <div className="app-container">
            {content}
        </div>
    );
}

export default App;