import React from "react";
import "../../styles/elemento.css";

const Elemento = (props) => {

    function borrarTarea() {
        props.borrarTarea(props.tarea)
    }

    return (
        <div className="elemento">
            <div className="texto-elemento">{props.tarea}</div>
            <i className="bi bi-x-lg icono-borrar" onClick={borrarTarea}></i>
        </div>
    )
}

export default Elemento;