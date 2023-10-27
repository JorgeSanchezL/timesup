
import { Button, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { StoreContext } from '../store'
import { GameState } from '../utils/consts'

function StartingView() {
    const { setTeams, setGameState } = useContext(StoreContext)

    const [team1, setTeam1] = useState("")
    const [team2, setTeam2] = useState("")

    return (
        <main>
            <h1>Bienvenido al Time's Up</h1>
            <div>
                <TextField
                    id="standard-basic"
                    label="Equipo 1"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTeam1(event.target.value);
                    }}
                />
            </div>
            <div>
                <TextField
                    id="standard-basic"
                    label="Equipo 2"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTeam2(event.target.value);
                    }}
                />
            </div>
            <div>
                <Button disabled={team1 === team2 || team1 === "" || team2 === ""} variant='text' onClick={() => {
                    setTeams([team1, team2])
                    setGameState(GameState.ROUND_1)
                }} >
                    Iniciar
                </Button>
            </div>
        </main>
    )
}

export default StartingView
