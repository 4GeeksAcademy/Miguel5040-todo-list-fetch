import React, { useState } from 'react';
import "../../styles/input.css";

const Input = (props) => {

    const [texto, setTexto] = useState('');

    function enterKeyHandler(event) {
        if (event.key === 'Enter') {
            props.agregarTarea(texto);
            setTexto("");
        }
    }

    return (
        <div className='contenedor-input'>
            <input
                type='text'
                placeholder='What need to be done?'
                onChange={e => setTexto(e.target.value)}
                value={texto}
                onKeyDown={enterKeyHandler}
            />
        </div>
    )
}

export default Input;