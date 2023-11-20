import React, { useEffect, useState } from "react";
import Input from "./input";
import Lista from "./lista";

//create your first component
const Home = () => {

	const [tareas, setTareas] = useState([]);
	const [mostrarLista, setMostrarLista] = useState("");
	const [mostrarMensaje, setMostrarMensaje] = useState("");

	//Funcion para verificar si el usuario existe, en caso de que no, crear uno nuevo.
	async function verificarUsuarioExiste(respuesta) {
		try {
			if (respuesta.status === 404) {
				fetch("https://playground.4geeks.com/apis/fake/todos/user/Alberto",
					{
						method: "POST",
						body: JSON.stringify([]),
						headers: {
							'Content-Type': 'application/json'
						}
					});
				alert("Su usuario se ha eliminado por problemas del servidor, sus tareas se han borrado, vuelva a recargar la pagina");
			}
		} catch (error) {
			alert("API caida, porfavor vuelva a intentarlo nuevamente mas tarde")
		}
	}

	//Funcion para peticion HTTP con el metodo GET, para extraer informacion del usuario de la API
	async function solicitarData() {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Alberto");
			verificarUsuarioExiste(response);
			const data = await response.json();
			setTareas(data);
		} catch (error) {
			alert("Ups, parece que hubo un error, vuelva a intentarlo")
		}
	}

	//Funcion para actualizar valores en la API
	async function actualizarTareasApi(tareasActualizadas) {

		try {
			if (tareasActualizadas.length === 0) {
				await fetch("https://playground.4geeks.com/apis/fake/todos/user/Alberto",
					{
						method: "PUT",
						body: JSON.stringify([{ "done": false, "label": "example task" }]),
						headers: {
							'Content-Type': 'application/json'
						}
					});
				return true
			}

			await fetch("https://playground.4geeks.com/apis/fake/todos/user/Alberto",
				{
					method: "PUT",
					body: JSON.stringify(tareasActualizadas),
					headers: {
						'Content-Type': 'application/json'
					}
				});

			return true;

		} catch (error) {
			alert("Parece que ha habido un error al actualizar la informacion, vuelva a intentarlo");
		}
	}

	//Funcion para actualizar valores en la lista en base a la data de la API
	async function agregarTarea(texto) {
		try {
			const tareaFormatoApi = { "done": false, "label": texto };
			const tareasActualizadas = [...tareas, tareaFormatoApi];
			const actualizacion = await actualizarTareasApi(tareasActualizadas);
			if (actualizacion) {
				await solicitarData();
			}
		} catch (error) {
			alert("Parece que ha habido un error al agregar la tarea, vuelva a intentarlo");
		}
	}

	//Funcion para borrar valores de la API y actulizar la lista.
	async function borrarTarea(texto) {
		try {
			const tareasActualizadas = tareas;
			const index = tareasActualizadas.findIndex(value => value.label === texto);
			tareasActualizadas.splice(index, 1);
			const actualizacion = await actualizarTareasApi(tareasActualizadas);
			if (actualizacion) {
				await solicitarData();
			}
		} catch (error) {
			alert("Parece que ha habido un error al borrar la tarea, vuelva a intentarlo");
		}
	}

	//Funcion para borrar lista de la API
	async function borrarLista() {
		try {
			await fetch("https://playground.4geeks.com/apis/fake/todos/user/Alberto",
				{
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json'
					}
				});

			await fetch("https://playground.4geeks.com/apis/fake/todos/user/Alberto",
				{
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						'Content-Type': 'application/json'
					}
				});

			await solicitarData();
		} catch (error) {
			alert("No se a podido realizar esta accion con exito, vuelva a intentarlo")
		}
	}

	//Funcion para ocultar la tarea por defecto "example task"
	async function ocultarTareaDefault() {
		if (tareas.length === 1 && tareas[0].label === "example task") {
			setMostrarLista("none")
			setMostrarMensaje("block")
			return
		}
		setMostrarLista("block")
		setMostrarMensaje("none")
		if (tareas.length > 1 && tareas[0].label === "example task") {
			tareas.splice(0, 1)
			const actualizacion = await actualizarTareasApi(tareas)
			if (actualizacion) {
				await solicitarData();
			}
		}
		return
	}


	useEffect(() => {
		solicitarData();
	}, []);

	useEffect(() => {
		ocultarTareaDefault();
	}, [tareas])

	return (
		<main>
			<h1>todos</h1>
			<Input agregarTarea={agregarTarea} />
			<Lista tareas={tareas} borrarTarea={borrarTarea} borrarLista={borrarLista} contador={tareas.length} mostrarLista={mostrarLista} />
			<div className="tasks-left" style={{ display: mostrarMensaje }}>No tasks left</div>
		</main>
	);
};

export default Home;
