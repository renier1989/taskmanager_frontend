/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { FormularioColaborador } from "../components/FormularioColaborador"
import { Link, useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import { Loader } from "../components/Loader"
import Alerta from "../components/Alerta"

type FormularioColaboradorParams = {
    id?: string
}

export const NuevoColaborador = () => {
    const params = useParams<FormularioColaboradorParams>()
    const { obtenerProyecto, alerta, cargando, proyecto, colaborador, cargandoColaborador, agregarColaborador } = useProyecto()
    useEffect(() => {
        if (params.id) {
            obtenerProyecto(params.id)
        }
    }, [params])


    if (!proyecto?._id) {
        return (
            <>
                <Alerta alerta={alerta} />
                <Link className="flex items-center justify-center text-center font-bold text-sky-600 uppercase" to='/proyectos'>Volver a proyectos</Link>
            </>
        )
    }

    if (cargando) return (
        <>
            <Loader />
            <Loader />
            <Loader />
        </>)

    return (
        <>
            <h1 className="text-4xl font-black">Agreagar Colaborador(a) al proyecto : <small className=" text-gray-600">{proyecto.nombre}</small> </h1>
            <div className="mt-10 flex  justify-center">
                <FormularioColaborador />
            </div>

            {cargandoColaborador ? <Loader /> :
                colaborador?._id &&
                (

                    <div className="flex  justify-center mt-10">
                        <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                            <h2 className="font-bold text-2xl text-center mb-10">Resultado</h2>
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold uppercase">
                                    {colaborador.nombre}
                                </p>
                                <button className="p-2 text-sm font-semibold rounded-md  cursor-pointer uppercase text-white text-center bg-slate-400 hover:shadow-lg transition-all duration-500"
                                    onClick={() => agregarColaborador({ email: colaborador.email })}
                                >Agregar al Proyecto</button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}
