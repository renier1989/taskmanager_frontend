import { useEffect, useState } from 'react';
import useProyecto from '../hooks/useProyectos';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

type FormularioParams = {
    id?: string;
}

export const FomularioProyecto = () => {
    const params = useParams<FormularioParams>()
    const [id, setId] = useState<string>('');
    const [nombre, setNombre] = useState<string>('')
    const [descripcion, setDescripcion] = useState<string>('')
    const [fechaEntrega, setFechaEntrega] = useState<string>('')
    const [cliente, setCliente] = useState<string>('')

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyecto()

    useEffect(() => {
        if (params.id ) {
            setId(proyecto._id)
            setNombre(proyecto.nombre);
            setDescripcion(proyecto.descripcion);
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
            setCliente(proyecto.cliente);
        }else{
            setId('')
        }
    }, [params, proyecto])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorias',
                error: true
            })
            return
        }
        // aqui envio los datos del formulario para registrar el nuevo poryecto
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente })
        // limpio el formulario
        setId('');
        setNombre('');
        setDescripcion('');
        setCliente('');
        setFechaEntrega('');
    }

    const { msg } = alerta

    return (
        <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            {msg && <Alerta alerta={alerta} />}
            <div className='mt-5'>
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" id="nombre" className="border rounded-md w-full p-2 mt-2 placeholder-gray-400" placeholder="Nombre del proyecto" />
            </div>
            <div className='mt-5'>
                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripción</label>
                <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} id="descripcion" className="border rounded-md w-full p-2 mt-2 placeholder-gray-400" placeholder="Descripción del proyecto" />
            </div>
            <div className='mt-5'>
                <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha de Entrega</label>
                <input value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} type="date" id="fecha-entrega" className="border rounded-md w-full p-2 mt-2 placeholder-gray-400" />
            </div>
            <div className='mt-5'>
                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre Cliente</label>
                <input value={cliente} onChange={e => setCliente(e.target.value)} type="text" id="cliente" className="border rounded-md w-full p-2 mt-2 placeholder-gray-400" placeholder="Nombre del proyecto" />
            </div>

            <input type="submit" value={id ? 'Actualizar Proyecto': 'Crear Proyecto'} className='bg-sky-600 w-full uppercase rounded-md text-white font-bold p-3 cursor-pointer hover:shadow-lg transition duration-300 mt-5' />
        </form>
    )
}
