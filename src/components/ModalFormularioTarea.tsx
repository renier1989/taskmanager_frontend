import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyecto from '../hooks/useProyectos'
import Alerta from './Alerta';

const PRIORIDAD: string[] = ['Baja', 'Media', 'Alta'];

const ModalFormularioTarea = () => {

    const [id, setId] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [prioridad, setPrioridad] = useState<string>('');
    const [fechaEntrega, setFechaEntrega] = useState<string>('');

    const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea,proyecto,tarea } = useProyecto()

    useEffect(()=>{
        // esto es para cuando se abra el modal. si hay una tarea entonces es porque estoy editando una
        if(tarea?._id){
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setPrioridad(tarea.prioridad)
            const fechaU = tarea.fechaEntrega?.split('T')[0];
            setFechaEntrega(fechaU)
            return ;
        }else{ // si no hay una tarea. entonces es porque quiero crear una nueva y dejo los campos del formulario vacios
            setId('');
            setNombre('');
            setDescripcion('');
            setPrioridad('');
            setFechaEntrega('');
        }
    },[tarea])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if ([nombre, descripcion, prioridad].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorias',
                error: true
            })
            return;
        }
        

        if(proyecto._id){
            await submitTarea({_id: tarea._id, nombre, descripcion, prioridad,fechaEntrega, proyecto: proyecto._id})
            setId('');
            setNombre('');
            setDescripcion('');
            setPrioridad('');
            setFechaEntrega('');
        }else{
            mostrarAlerta({
                msg: 'El proyecto no es valido!',
                error: true
            })
            return;
        }

        // console.log(proyecto);
        

    }

    const { msg } = alerta

    return (
        <Transition.Root show={modalFormularioTarea} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTarea}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalTarea}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-2xl leading-6 font-bold text-gray-900">
                                        { id ? 'Editar Tarea' : 'Crear Tarea'}
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit} >

                                        {msg && <Alerta alerta={alerta} />}
                                        <div className='my-2'>
                                            <label htmlFor="nombre" className='text-lg font-bold block mt-3'>Nombre Tarea</label>
                                            <input type="text" id="nombre" placeholder='Nombre de la Tarea' className='p-2 border-2 text-gray-600 w-full rounded-md my-2' value={nombre} onChange={e => setNombre(e.target.value)} />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="descripcion" className='text-lg font-bold block mt-3'>Descripción Tarea</label>
                                            <textarea id="descripcion" placeholder='Descripción de la Tarea' className='p-2 border-2 text-gray-600 w-full rounded-md my-2' value={descripcion} onChange={e => setDescripcion(e.target.value)}
                                            />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="fecha-entrega" className='text-lg font-bold block mt-3'>Fecha de Entrega</label>
                                            <input type="date" id="fecha-enterga" placeholder='Nombre de la Tarea' className='p-2 border-2 text-gray-600 w-full rounded-md my-2' value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="prioridad" className='text-lg font-bold block mt-3'>Prioridad Tarea</label>
                                            <select id="prioridad" className='p-2 border-2 text-gray-600 w-full rounded-md my-2' value={prioridad} onChange={e => setPrioridad(e.target.value)}>
                                                <option value="">-- Seleccione la prioridad -- </option>
                                                {PRIORIDAD.map(opcion => (
                                                    <option key={opcion} value={opcion}>{opcion}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <input type="submit" className='p-3 rounded-md w-full font-bold cursor-pointer uppercase text-white text-center bg-sky-600 hover:shadow-lg transition-all duration-500' value={`${id ? 'Editar Tarea': 'Crear Tarea' }`} />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea