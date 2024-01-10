import useProyecto from "../hooks/useProyectos"
import { EliminarIcon } from "./icons/EliminarIcon"

interface ButtonEliminarProyectoProps {
    id: string
}

export const ButtonEliminarProyecto = ({ id }: ButtonEliminarProyectoProps) => {
    const { eliminarProyecto } = useProyecto()
    const handleClick = () => {
        if (confirm('Desea eliminar este proyecto?')) {
            eliminarProyecto(id)
        }
    }

    return (
        <>
            <div className="md:self-center p-2 rounded-md bg-red-600 text-white cursor-pointer font-semibold transition-all duration-300 hover:shadow-lg">
                <button
                    onClick={handleClick}
                    type="button" className="flex gap-2">
                    <EliminarIcon />
                    Eliminar
                </button>
            </div>
        </>
    )
}
