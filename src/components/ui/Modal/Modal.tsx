import { FC } from 'react';
import { tareaStore } from '../../../store/tareasStore';
import styles from './Modal.module.css';

type IModal = {
    handleCloseModal: () => void;
}

export const Modal :FC<IModal> = ({handleCloseModal}) => {

    const tareaActiva = tareaStore((state) => state.tareaActiva);

    return (
        <div className={styles.containerModal}>
            <div className={styles.modal}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
                </div>
                <form className={styles.form}>
                    <div className={styles.containerInput}>
                        <input placeholder='Ingrese un título' type="text" required autoComplete='off' name='titulo' />
                        <textarea placeholder="Descripción" name="descripcion" required />
                        <input type="date" required autoComplete='off' name='fecha' />
                    </div>
                    <div className={styles.containerButtonsActions}>
                        <button onClick={handleCloseModal} className={styles.buttonCancelar} type="button">Cancelar</button>
                        <button className={styles.buttonCrearEditar} type="submit">{tareaActiva ? "Editar" : "Crear"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
