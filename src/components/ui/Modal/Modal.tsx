import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { tareaStore } from '../../../store/tareasStore';
import styles from './Modal.module.css';
import { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';

type IModal = {
    handleCloseModal: () => void;
}

const initialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: ""
}

export const Modal: FC<IModal> = ({ handleCloseModal }) => {

    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);
    const { crearTarea, putTareaEditar } = useTareas();

    const [formValues, setFormValues] = useState<ITarea>(initialState);

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva);
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Evita que se recargue la página
        if (tareaActiva) {
            putTareaEditar(formValues);
        } else {
            crearTarea({ ...formValues, id: new Date().toDateString() });
        };

        setTareaActiva(null);
        handleCloseModal();
    };

    return (
        <div className={styles.containerModal}>
            <div className={styles.modal}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.containerInput}>
                        <input
                            placeholder='Ingrese un título'
                            type="text" required
                            onChange={handleChange}
                            value={formValues.titulo}
                            autoComplete='off'
                            name='titulo' />
                        <textarea
                            placeholder="Descripción"
                            name="descripcion" required
                            onChange={handleChange}
                            value={formValues.descripcion} />
                        <input
                            type="date" required
                            onChange={handleChange}
                            autoComplete='off'
                            name='fechaLimite'
                            value={formValues.fechaLimite}
                        />

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
