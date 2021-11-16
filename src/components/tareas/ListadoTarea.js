import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/proyectos/proyectoContext';

const ListadoTareas = () => {

    // Extraer proyectos de State Inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtene las Tareas del Proyecto
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>;

    // Desestructuracion de Arreglo para extraer el proyecto actual
    const [proyectoAtual] = proyecto;


    // Elimina un Proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoAtual.id);
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoAtual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0

                    ? (<li className="tarea"><p>No hay Tareas</p></li>)
                    :tareasproyecto.map(tarea => (
                        <Tarea 
                            tarea={tarea}
                        />
                    ))
                }
                
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;