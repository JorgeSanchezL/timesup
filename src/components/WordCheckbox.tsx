import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material'
import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../store'
import { WordState } from '../utils/words'

interface Props {
    value: string
    confirmated: boolean
}

function WordCheckbox(props: Props) {
    const { words } = useContext(StoreContext)

    const [checked, setChecked] = useState(props.confirmated)

    useEffect(() => {
        handleChange({ target: { checked: props.confirmated } } as React.ChangeEvent<HTMLInputElement>)
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
        if (event.target.checked) {
            words.setWordState(props.value, WordState.VIEWED_GUESSED)
        } else {
            words.setWordState(props.value, WordState.VIEWED_NOT_GUESSED)
        }
    }

    return (
        <main>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        icon={<CancelOutlined fontSize='large' />}
                        checkedIcon={<CheckCircleOutlined fontSize='large' />}
                    />}
                label={props.value}
                labelPlacement='start' />
        </main>
    )
}

export default WordCheckbox
