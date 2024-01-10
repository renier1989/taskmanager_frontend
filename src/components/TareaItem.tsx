import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyecto from "../hooks/useProyectos"
import { TTarea } from "../interfaces/TareaType"

type TareaItemProps = {
    tarea: TTarea
}

export const TareaItem = ({ tarea }: TareaItemProps) => {
    const { handleModalEtidarTarea, handleModalEliminarTarea, completarTarea } = useProyecto()
    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea
    const admin = useAdmin()

    return (
        <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl font-bold">{nombre} </p>
                <p className="mb-1 text-sm uppercase text-gray-500">{descripcion} </p>
                <p className="mb-1 text-xl font-semibold">{formatearFecha(fechaEntrega)} </p>
                <p className="mb-1 text-gray-600"> Prioridad : {prioridad} </p>
                {estado && <p className="text-xs font-semibold bg-green-600 text-white p-1 rounded-md">Completado por: <span className="text-sm">{tarea.completado?.nombre}</span> </p>}
            </div>
            <div className="flex gap-1 flex-col lg:flex-row mt-5 md:mt-0 w-full md:justify-end sm:w-1/4 md:flex-col">
                <button type="button" className={`${estado ? 'bg-green-600' : 'bg-gray-600'} py-2 px-4 text-white font-bold text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300 `}
                    onClick={() => completarTarea(_id)}

                >
                    {estado ? 'Completa' : 'Incompleta'}
                </button>
                {admin && (
                    <>
                        <button type="button" className="py-2 px-4 text-white font-bold bg-sky-600 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleModalEtidarTarea(tarea)}
                        >
                            Editar
                        </button>
                        <button type="button" className="py-2 px-4 text-white font-bold bg-red-600 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleModalEliminarTarea(tarea)}
                        >
                            Eliminar
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
