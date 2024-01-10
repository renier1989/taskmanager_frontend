import { Link } from 'react-router-dom';

import { IFProyecto } from '../interfaces/IProyectos';
import useAuth from '../hooks/useAuth';
interface props {
    proyecto: IFProyecto
}

export const PreviewProyecto = ({ proyecto }: props) => {
    const { auth } = useAuth()
    const { _id, cliente, nombre, creador } = proyecto
    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
            <div className='flex items-center gap-2'>
                <p className='flex-1 '>{nombre}
                    <span className='text-sm text-gray-500 uppercase'>
                        {' '}{cliente}
                    </span>
                </p>
                {auth._id !== creador &&
                    <p className='px-2 py-1 bg-green-500 text-white ml-3 text-sm font-semibold rounded-md'>Colaborador</p>
                }
            </div>
            <Link className='text-center mt-5 md:mt-0 text-gray-600 hover:text-gray-800 uppercase text-sm font-bold' to={`${_id}`}> Ver Proyecto </Link>
        </div>
    )
}
