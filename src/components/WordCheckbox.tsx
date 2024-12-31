import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../store';
import { WordState } from '../utils/words';
import './WordCheckbox.css';

interface Props {
    value: string;
    confirmated: boolean;
}

function WordCheckbox(props: Props) {
    const { words } = useContext(StoreContext);
    const [checked, setChecked] = useState(props.confirmated);

    useEffect(() => {
        handleChange({ target: { checked: props.confirmated } } as React.ChangeEvent<HTMLInputElement>);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            words.setWordState(props.value, WordState.VIEWED_GUESSED);
        } else {
            words.setWordState(props.value, WordState.VIEWED_NOT_GUESSED);
        }
    };

    return (
        <div className="word-checkbox">
            <input
                type="checkbox"
                id={props.value}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={props.value}>
                {props.value}
            </label>
        </div>
    );
}

export default WordCheckbox;