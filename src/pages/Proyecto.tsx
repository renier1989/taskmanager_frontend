/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { useEffect } from "react"
import { Loader } from "../components/Loader"
import { EditarIcon } from "../components/icons/EditarIcon"
import { ButtonEliminarProyecto } from "../components/ButtonEliminarProyecto"
import { PlusIcon } from "../components/icons/PlusIcon"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import { TareaItem } from "../components/TareaItem"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import { Colaborador } from '../components/Colaborador';
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import useAdmin from "../hooks/useAdmin"
import io, { Socket } from "socket.io-client"
import { TTarea } from "../interfaces/TareaType"
import { IFProyecto } from "../interfaces/IProyectos"
let socket:Socket;

type ProyectoParams = {
  id?: string
}
export const Proyecto = () => {

  const params = useParams<ProyectoParams>()
  const { obtenerProyecto, proyecto, cargando, handleModalTarea,submitTareasProyectos,deleteTareasProyectos,editarTareasProyectos } = useProyecto()
  const admin = useAdmin()

  useEffect(() => {
    const getProyecto = () => {
      if (typeof params.id !== 'undefined') {
        if (params.id) {
          obtenerProyecto(params.id);
        }
      }
    }
    getProyecto()
  }, [params.id])

  // este primer useEffect es unicamente para crear la conexion la primera vez que se visita el poryecto y pasamas el id
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('abrir-proyecto', params.id);
  }, [])

  // este useEffect no tendra dependencias para que este en escucha constante de eventos de socket.io
  useEffect(() => {
    // cada vez que se agregar una nueva tarea, la envio al provider para que la actualize en la funcion
    socket.on('tarea-agregada', (tareaNueva:TTarea)=>{
      if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyectos(tareaNueva)
      }
    })
    // cuando se elimina una tarea
    socket.on('tarea-eliminada', (tareaEliminada:TTarea)=>{
      if(tareaEliminada.proyecto === proyecto._id){
        deleteTareasProyectos(tareaEliminada)
      }
    })
    // cuando se edita una tarea
    socket.on('tarea-editada', (tareaEditada:TTarea)=>{
      if((tareaEditada.proyecto as IFProyecto)._id === proyecto._id){
        editarTareasProyectos(tareaEditada)
      }
    })
    // cuando se completa una tarea
    socket.on('tarea-completada', (tareaCompleta:TTarea)=>{
      if((tareaCompleta.proyecto as IFProyecto)._id === proyecto._id){
        editarTareasProyectos(tareaCompleta)
      }
    })
  })
  
  


  const { nombre, _id } = proyecto
  

  if (cargando) return (
    <>
      <Loader />
      <Loader />
      <Loader />
    </>)

  return  (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-4xl font-black"> {nombre}</h1>

        {admin && (
          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
            <div className="md:self-center p-2 rounded-md bg-sky-600 text-white cursor-pointer font-semibold transition-all duration-300 hover:shadow-lg">
              <Link className="flex items-center gap-2" to={`/proyectos/editar/${params.id}`}>
                <EditarIcon />
                Editar
              </Link>
            </div>
            <ButtonEliminarProyecto id={_id} />
          </div>

        )}

      </div>

      {admin && (
        <button onClick={handleModalTarea} className="bg-sky-500 text-white px-5 py-2 uppercase rounded-md w-full md:w-auto text-sm font-bold text-center mt-5 hover:shadow-md transition-all duration-500 flex gap-2 items-center">
          <PlusIcon />
          Nueva Tarea
        </button>
      )}

      <p className="font-bold  text-xl mt-10">Tareas del Proyecto</p>
      
      <div className="bg-white  shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ?
          proyecto.tareas?.map(tarea => <TareaItem key={tarea._id} tarea={tarea} />)
          :
          <p className="my-5 p-10 text-center">No se han registrado tareas en este proyecto!</p>}
      </div>


      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Colaboradores</p>
            <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`} className="self-center p-2 rounded-md bg-sky-600 text-white cursor-pointer font-semibold transition-all duration-300 hover:shadow-lg">Agreagar</Link>
          </div>

          <div className="bg-white  shadow mt-10 rounded-lg">
            {proyecto.colaboradores?.length ?
              proyecto.colaboradores?.map(colaborador =>
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              )
              :
              <p className="my-5 p-10 text-center">No se han registrado colaboradores a este proyecto!</p>}
          </div>
        </>
      )}



      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )







}
