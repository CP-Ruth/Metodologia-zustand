import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareasStore"
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tareas";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";


export const useTareas = () => {

    const { tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea } = tareaStore(
        useShallow((state) => ({
            tareas: state.tareas,
            setArrayTareas: state.setArrayTareas,
            agregarNuevaTarea: state.agregarNuevaTarea,
            eliminarUnaTarea: state.eliminarUnaTarea,
            editarUnaTarea: state.editarUnaTarea,
        })))

    const getTareas = async () => {
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    };

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea);
        try {
            await postNuevaTarea(nuevaTarea);
            Swal.fire("Exito", "Tarea creada correctamente", "success");
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!);
            console.log("Error al crear tarea", error);
        }
    }

    const putTareaEditar = async (tareaActualizada: ITarea) => {
        const antesDeEditar = tareas.find((el) => el.id === tareaActualizada.id);
        editarUnaTarea(tareaActualizada);
        try {
            await editarTarea(tareaActualizada);
            Swal.fire("Exito", "Tarea editada correctamente", "success");
        } catch (error) {
            if (antesDeEditar) {
                editarUnaTarea(antesDeEditar);
            }
            console.log("Error al editar tarea", error);
        }
    }

    const eliminarTarea = async (idTarea: string) => {
        const antesDeEditar = tareas.find((el) => el.id === idTarea);
        const confirm = await Swal.fire({
            title: "¿Estas seguro?",
            text: "No podras revertir esta accion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        
        if (!confirm.isConfirmed) return;
        eliminarUnaTarea(idTarea);

        try {
            await eliminarTareaPorID(idTarea);
            Swal.fire("Exito", "Tarea eliminada correctamente", "success");
        } catch (error) {
            if (antesDeEditar) {
                agregarNuevaTarea(antesDeEditar);
            }
            console.log("Error al eliminar tarea", error);
        }
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas,
    };
}
