import { FC } from 'react';
import { ITarea } from '../../../types/ITarea'
import styles from './CardList.module.css'

type ICardList = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;
}


export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {

    const eliminarTarea = () => {
        console.log("Eliminar", tarea)
    };

    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    };

    return (
        <div className={styles.cardList}>
            <div className={styles.cardList__info}>
                <h3>Título: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>Fecha Limite: <b>{tarea.fechaLimite}</b></p>
            </div>
            <div className={styles.cardList__buttons}>
                <button className={styles.buttonEditar} onClick={editarTarea}>Editar</button>
                <button className={styles.buttonEliminar} onClick={eliminarTarea}>Eliminar</button>
            </div>
        </div>
    )
}
