import React, { useState } from 'react';
import { GameState, Round, WORDS } from './utils/consts';
import { WordList } from './utils/words';

export const StoreContext = React.createContext<{
    words: WordList
    setWords: React.Dispatch<React.SetStateAction<WordList>>
    teams: string[]
    setTeams: (teams: string[]) => void
    currentTeam: string
    nextTeam: () => void
    time: number
    setTime: React.Dispatch<React.SetStateAction<number>>
    gameState: GameState
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
    roundResults: { [key: string]: number }[]
    setRoundResults: (result: { [key: string]: number }, round: Round) => void
    roundPlayed: Round
    setRoundPlayed: React.Dispatch<React.SetStateAction<Round>>
}>({
    words: new WordList(WORDS),
    setWords: () => { },
    teams: ["MockTeam1", "MockTeam2"],
    setTeams: () => { },
    currentTeam: "MockTeam1",
    nextTeam: () => { },
    time: 45,
    setTime: () => { },
    gameState: GameState.GAME_NOT_STARTED,
    setGameState: () => { },
    roundResults: [{}],
    setRoundResults: () => { },
    roundPlayed: Round.ROUND_1,
    setRoundPlayed: () => { }
});

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [words, setWords] = useState<WordList>(new WordList(WORDS))

    const [teams, internalSetTeams] = useState<string[]>(["MockTeam1", "MockTeam2"])
    const [currentTeam, setCurrentTeam] = useState<string>(teams[0])
    const [time, setTime] = useState<number>(500)
    const [gameState, setGameState] = useState<GameState>(GameState.GAME_NOT_STARTED)
    const [roundResults, internalSetRoundResults] = useState([{}])
    const [roundPlayed, setRoundPlayed] = useState(Round.ROUND_1)

    const setTeams = (newTeams: string[]) => {
        internalSetTeams(newTeams)
        setCurrentTeam(newTeams[0])
    }

    const nextTeam = () => {
        let nextIndex = teams.indexOf(currentTeam) + 1;
        if (nextIndex >= teams.length) {
            nextIndex = 0;
        }
        setCurrentTeam(teams[nextIndex])
    }

    const setRoundResults = (result: { [key: string]: number }, round: Round) => {
        let roundInt = 0

        switch (round) {
            case Round.ROUND_1:
                roundInt = 0
                break;
            case Round.ROUND_2:
                roundInt = 1
                break;
            case Round.ROUND_3:
                roundInt = 2
                break;
        }

        internalSetRoundResults((prevResults) => {
            prevResults[roundInt] = result
            return prevResults
        })
    }

    return (
        <StoreContext.Provider value={{ words, setWords, teams, setTeams, currentTeam, nextTeam, time, setTime, gameState, setGameState, roundResults, setRoundResults, roundPlayed, setRoundPlayed }}>
            {children}
        </StoreContext.Provider>
    );
};