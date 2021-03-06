import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer si un proyecto esta Activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener la función del context de la tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, 
        errortarea, 
        agregarTarea, 
        validarTarea, 
        obtenerTareas, 
        actualizarTarea,
        limpiarTarea,
    } = tareasContext

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);


    // State del formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: '',
    });

    // Extraer el nombre del proyecto
    const { nombre } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Desestructuracion de Arreglo para extraer el proyecto actual
    const [proyectoAtual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Revisar si es edicion o nueva tarea
        if(tareaseleccionada === null) {
            // Tarea nueva
            // Agregar la tarea la nueva tarea al state de tareas
            tarea.proyectoId = proyectoAtual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            // Actualizar tarea existente
           actualizarTarea(tarea);

           // Eliminar tarea seleccionada del state
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoAtual.id);


        // Reiniciar el formulario
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div> 
     );
}
 
export default FormTarea;