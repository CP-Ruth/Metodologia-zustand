import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareasStore"
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tareas";
import { ITarea } from "../types/ITarea";


export const useTareas = () => {

    const {tareas, setArrayTareas } = tareaStore(useShallow((state)=>({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas
    })))

    const getTareas = async () => {
            const data = await getAllTareas();
            if (data) setArrayTareas(data);
        };
    
    const crearTarea = async (nuevaTArea:ITarea) => {
        await postNuevaTarea(nuevaTArea);
    }

    const putTareaEditar = async (tareaActualizada: ITarea) => {
        await editarTarea(tareaActualizada);
    }

    const eliminarTarea = async (idTarea: string) => {
        await eliminarTareaPorID(idTarea);
    }

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea
    };
}
