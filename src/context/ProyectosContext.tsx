import { createContext, useEffect, useState } from 'react';
import { IFProyecto, IProyectosContext, IProyectosProvider } from '../interfaces/IProyectos';
import { IAlertData } from '../interfaces/IAlertData';
import { TProyecto } from '../interfaces/ProyectoType';
import AxiosClient from '../config/AxiosClient';
import { useNavigate } from 'react-router-dom';
import { TTarea } from '../interfaces/TareaType';
import { TColaborador } from '../interfaces/ColaboradorType';
import io, { Socket } from "socket.io-client";
import useAuth from '../hooks/useAuth';
import { IErrorResponse } from '../interfaces/IErrorrResponse';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let socket: Socket;



const ProyectosContext = createContext<IProyectosContext>({} as IProyectosContext);
const ProyectosProvider = ({ children }: IProyectosProvider) => {
    const { auth } = useAuth()
    const [proyectos, setProyectos] = useState<IFProyecto[]>({} as IFProyecto[])
    const [alerta, setAlerta] = useState<IAlertData>({} as IAlertData)
    const [proyecto, setProyecto] = useState<IFProyecto>({} as IFProyecto)
    const [cargando, setCargando] = useState<boolean>(false)
    const [cargandoColaborador, setCargandoColaborador] = useState<boolean>(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState<boolean>(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState<boolean>(false)
    const [colaborador, setColaborador] = useState<TColaborador>({} as TColaborador)
    const [tarea, setTarea] = useState<TTarea>({} as TTarea)
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState<boolean>(false)
    const [buscador, setBuscador] = useState<boolean>(false)

    const navigate = useNavigate()

    // ESTO ES SOLO PARA ESTABLECER LA CONEXION CON SOKCET.IO LA SE EJECUTA UNA VEZ
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])


    // para llamar los poryectos que el usuario logeado ha creado.
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const tokenLS = localStorage.getItem('token');
                if (!tokenLS) {
                    console.log('no hay token!');
                    return
                }
                const configUrl = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenLS}`
                    }
                }
                const { data } = await AxiosClient('/proyectos', configUrl);
                // console.log(data);
                setProyectos(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [auth])

    const mostrarAlerta = (alerta: IAlertData) => {
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({} as IAlertData)
        }, 4000);
    }

    const submitProyecto = async (proyecto: TProyecto) => {
        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await crearProyecto(proyecto)
        }
    }

    const crearProyecto = async (proyecto: TProyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            // registro el nuevo proyecto en la BD
            const { data } = await AxiosClient.post('/proyectos', proyecto, config);

            setProyectos([...proyectos, data])
            // muestro una alerta del pryecto crado
            setAlerta({
                msg: 'Proyecto creado correctamente.!',
                error: false
            })
            // aqui redirecciono a la vista de los proyectos
            setTimeout(() => {
                setAlerta({} as IAlertData)
                navigate('/proyectos')
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    const editarProyecto = async (proyecto: TProyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            // actualizo el  proyecto en la BD, y retorno el proyecto que fue actualizado
            const { data } = await AxiosClient.put(`/proyectos/${proyecto.id}`, proyecto, config);

            // aqui hago una sincronización de los proyectos con el proyecto que fue acrualizado.
            // al hacerl el map a los proyectos lo que hago es retornar un nuevo arreglo pero sustitulo el editado 
            const proyectosActualizado = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);
            setProyectos(proyectosActualizado);

            // muestro una alerta del pryecto crado
            setAlerta({
                msg: 'Proyecto actualizado correctamente.!',
                error: false
            })
            // aqui redirecciono a la vista de los proyectos
            setTimeout(() => {
                setAlerta({} as IAlertData)
                navigate('/proyectos')
            }, 2000);



        } catch (error) {
            console.log(error);
        }

    }

    const obtenerProyecto = async (id: string) => {
        // console.log(id);
        setCargando(true)
        setAlerta({} as IAlertData)
        setColaborador({} as TColaborador)
        try {
            const tokenLS = localStorage.getItem('token');
            if (!tokenLS) {
                console.log('no hay token!');
                return
            }
            const configUrl = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenLS}`
                }
            }
            const { data } = await AxiosClient(`/proyectos/${id}`, configUrl);
            setProyecto(data.proyecto);

        } catch (error) {
            if (error instanceof Error) {
                // Manejo de errores de TypeScript reconocidos como instancias de Error
                console.error(error.message);
            } else {
                const err = error as IErrorResponse;
                navigate('/proyectos');
                setAlerta({ msg: err.response.data.msg, error: true });
                setTimeout(() => {
                    setAlerta({} as IAlertData);
                }, 3000);
            }
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            // registro el nuevo proyecto en la BD
            const { data } = await AxiosClient.delete(`/proyectos/${id}`, config);
            const proyectosActuales = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActuales)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({} as IAlertData)
                navigate('/proyectos')
            }, 2000);


        } catch (error) {
            console.log(error);

        }

    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({} as TTarea)
    }

    const submitTarea = async (tarea: TTarea) => {
        if (tarea?._id) {
            await editarTarea(tarea);
        } else {
            await crearTarea(tarea);
        }
    }

    const crearTarea = async (tarea: TTarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.post('/tareas', tarea, config)

            setModalFormularioTarea(false)


            // SOKCET.IO
            // paso los datos de la tarea agregada data
            socket.emit('nueva-tarea', data);

        } catch (error) {
            console.log(error);
        }

    }

    const editarTarea = async (tarea: TTarea) => {

        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.put(`/tareas/${tarea._id}`, tarea, config)

            // SOCKET.IO
            socket.emit('editar-tarea', data);

            setAlerta({} as IAlertData)
            setModalFormularioTarea(false)

        } catch (error) {
            console.log(error);

        }

    }

    const handleModalEtidarTarea = (tarea: TTarea) => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = (tarea: TTarea) => {
        setModalEliminarTarea(!modalEliminarTarea)
        modalEliminarTarea ? setTarea({} as TTarea) : setTarea(tarea)
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })


            // SOCKET.IO
            socket.emit('eliminar-tarea', tarea);

            setModalEliminarTarea(false)
            setTarea({} as TTarea)
            setTimeout(() => {
                setAlerta({} as IAlertData)
            }, 3000);

        } catch (error) {
            console.log(error);

        }
    }

    const submitColaborador = async (email: string) => {
        setCargandoColaborador(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.post(`/proyectos/colaboradores/`, { email }, config)
            setColaborador(data)
            setAlerta({} as IAlertData)
        } catch (error) {

            if (error instanceof Error) {
                // Manejo de errores de TypeScript reconocidos como instancias de Error
                console.error(error.message);
            } else {
                const err = error as IErrorResponse;
                setAlerta({ msg: err.response.data.msg, error: true });
                setColaborador({} as TColaborador)
                setTimeout(() => {
                    setAlerta({} as IAlertData);
                }, 3000);
            }

        } finally {
            setCargandoColaborador(false)
        }
    }

    const agregarColaborador = async (email: { email: string }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({} as TColaborador)
        } catch (error) {
            if (error instanceof Error) {
                // Manejo de errores de TypeScript reconocidos como instancias de Error
                console.error(error.message);
            } else {
                const err = error as IErrorResponse;
                setAlerta({ msg: err.response.data.msg, error: true });
                setTimeout(() => {
                    setAlerta({} as IAlertData);
                }, 3000);
            }

            
        }
    }

    const handleModalEliminarColaborador = (colaborador: TColaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)

    }

    const eliminarColaborador = async () => {
        try {

            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, config)


            // actualizo el state del proyecto con los colaboradores 
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setModalEliminarColaborador(false)
            setColaborador({} as TColaborador)
        } catch (error) {
            console.log(error);

        }



    }

    const completarTarea = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await AxiosClient.post(`tareas/estado/${id}`, {}, config);

            // SOCKET.IO
            socket.emit('completar-tarea', data);

            setTarea({} as TTarea)
            setAlerta({} as IAlertData)

        } catch (error) {
            console.log(error);

        }

    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    const cerrarSesionProyectos = () => {
        setProyectos({} as IFProyecto[])
        setProyecto({} as IFProyecto)
        setAlerta({} as IAlertData)
    }

    // SOCKET.IO
    const submitTareasProyectos = (tarea: TTarea) => {
        // creo una nueva const con el proyecto actual para poder cargarle las tareas
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        // cargo al state de proyecto , el proyectoActualizado con las tareas
        setProyecto(proyectoActualizado)
    }

    const deleteTareasProyectos = (tarea: TTarea) => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id)
        setProyecto(proyectoActualizado);
    }

    const editarTareasProyectos = (tareaEdit: TTarea) => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tareaEdit._id ? tareaEdit : tareaState);
        setProyecto(proyectoActualizado)
    }

    const completarTareasProyectos = (tarea: TTarea) => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }

    return (
        <ProyectosContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormularioTarea,
            handleModalTarea,
            submitTarea,
            handleModalEtidarTarea,
            tarea,
            modalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            cargandoColaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            buscador,
            handleBuscador,
            cerrarSesionProyectos,
            // socket.io
            submitTareasProyectos,
            deleteTareasProyectos,
            editarTareasProyectos,
            completarTareasProyectos,
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;