import WordCheckbox from '../components/WordCheckbox';
import { StoreContext } from '../store';
import { useContext } from 'react';
import { GameState, Round } from '../utils/consts';
import { WordState } from '../utils/words';

interface Props {
    round: Round
}

function WordConfirmation(props: Props) {
    const { teams, currentTeam, nextTeam, setGameState, words: wordList, setRoundResults } = useContext(StoreContext)

    return (
        <main className="word-confirmation">
            {wordList.words.map((word, index) => {
                if (wordList.getWordState(word) === WordState.VIEWED_NOT_GUESSED) {
                    return (
                        <div key={index}>
                            <WordCheckbox value={word} confirmated={false} />
                        </div>
                    )
                } else if (wordList.getWordState(word) === WordState.VIEWED_GUESSED) {
                    return (
                        <div key={index}>
                            <WordCheckbox value={word} confirmated={true} />
                        </div>
                    )
                } else return null
            })}
            <button onClick={() => {
                wordList.confirmWordList(currentTeam)

                if (!wordList.wordsLeft) {
                    // Calcular el resultado de la ronda
                    let result: { [key: string]: number } = {}
                    teams.map((team) => result[team] = 0)
                    wordList.words.map((word) => {
                        if (result[wordList.getWordTeam(word)] === undefined) {
                            result[wordList.getWordTeam(word)] = 1
                        } else {
                            result[wordList.getWordTeam(word)] += 1
                        }
                    })
                    setRoundResults(result, props.round)
                    wordList.reset()
                    setGameState(GameState.SUMMARY)
                    nextTeam()
                } else {
                    switch (props.round) {
                        case Round.ROUND_1:
                            setGameState(GameState.ROUND_1)
                            break;
                        case Round.ROUND_2:
                            setGameState(GameState.ROUND_2)
                            break;
                        case Round.ROUND_3:
                            setGameState(GameState.ROUND_3)
                            break;
                    }
                    wordList.nextWord()
                    nextTeam()
                }
            }}>
                Confirmar
            </button>
        </main>
    )
}

export default WordConfirmation
