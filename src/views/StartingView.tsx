
import { useContext, useState } from 'react'
import { StoreContext } from '../store'
import { GameState } from '../utils/consts'

import './StartingView.css';

function StartingView() {
    const { setTeams, setGameState } = useContext(StoreContext);

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");

    return (
        <main className="starting-view">
            <h1>Bienvenido al Time's Up</h1>
            <div>
                <label htmlFor="team1">Equipo 1</label>
                <input
                    id="team1"
                    type="text"
                    value={team1}
                    onChange={(event) => setTeam1(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="team2">Equipo 2</label>
                <input
                    id="team2"
                    type="text"
                    value={team2}
                    onChange={(event) => setTeam2(event.target.value)}
                />
            </div>
            <div>
                <button
                    disabled={team1 === team2 || team1 === "" || team2 === ""}
                    onClick={() => {
                        setTeams([team1, team2]);
                        setGameState(GameState.ROUND_1);
                    }}
                >
                    Iniciar
                </button>
            </div>
        </main>
    );
}

export default StartingView;