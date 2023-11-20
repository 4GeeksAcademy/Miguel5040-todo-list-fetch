import React from 'react';
import "../../styles/lista.css";
import Elemento from "./elemento";

const Lista = (props) => {

    return (
        <div className='contenedor-principal' style={{ display: props.mostrarLista }}>
            <div className='lista'>
                {props.tareas.map((tarea, index) => (
                    <Elemento tarea={tarea.label} index={index} borrarTarea={props.borrarTarea} />
                ))}
            </div>
            <div className='contador-elementos-lista-contenedor'>
                <div>{props.contador} Tareas pendientes</div>
                <button className='delete-all' onClick={props.borrarLista}>Delete All</button>
            </div>
        </div>
    )
}

export default Lista;