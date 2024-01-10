import useProyecto from "../hooks/useProyectos"
import { TColaborador } from "../interfaces/ColaboradorType"

interface props {
    colaborador: TColaborador
}

export const Colaborador = ({ colaborador }: props) => {
    const { nombre, email } = colaborador
    const {handleModalEliminarColaborador} = useProyecto()
    return (
        <div className="flex items-center justify-between py-5 px-5">
            <div>
                <p className="font-bold text-xl">{nombre}</p>
                <p className="text-sm font-semibold text-gray-700">{email}</p>
            </div>
            <div>
                <button className="py-2 px-4 text-white font-bold bg-red-600 text-sm uppercase rounded-lg hover:shadow-lg transition-shadow duration-300"
                onClick={()=> handleModalEliminarColaborador(colaborador)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}
