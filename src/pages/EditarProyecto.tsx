import { Link, useNavigate, useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { FomularioProyecto } from "../components/FomularioProyecto";
import { ButtonEliminarProyecto } from "../components/ButtonEliminarProyecto";
import useAdmin from "../hooks/useAdmin";
import Alerta from "../components/Alerta";

type EditarProyectoParams = {
    id?: string;
}

export const EditarProyecto = () => {
    const params = useParams<EditarProyectoParams>()
    const { obtenerProyecto, proyecto, cargando, alerta, mostrarAlerta } = useProyecto()
    const admin = useAdmin()
    const navigate = useNavigate()

    

    useEffect(() => {
        const getProyecto = () => {
            if (typeof params.id !== 'undefined') {
                if (params.id) {
                    obtenerProyecto(params.id);
                }
            }
        }
        getProyecto()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    if (!admin) {
        mostrarAlerta({
            msg: 'Acceso no autorizado',
            error: true
        })
        navigate('/proyectos');
    }

    const { nombre, _id } = proyecto

    if (cargando) return (<><Loader /><Loader /></>)

    return (
        admin ?
            <>
                <div className="flex flex-col md:flex-row  justify-between items-center">
                    <h1 className=" mb-5 md:mb-0 text-4xl font-black">Editar Proyecto : {nombre}</h1>

                    <ButtonEliminarProyecto id={_id} />
                </div>

                <div className="mt-10 flex justify-center">
                    <FomularioProyecto />
                </div>
            </>
            :
            <>
                <Alerta alerta={alerta} />
                <Link className="flex items-center justify-center text-center font-bold text-sky-600 uppercase" to='/proyectos'>Volver a proyectos</Link>
            </>
    )
}
