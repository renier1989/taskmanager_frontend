/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import useProyecto from "../hooks/useProyectos"
import Alerta from "./Alerta"

export const FormularioColaborador = () => {

    const [emailColaborador, setEmailColaborador] = useState<string>('')
    const { alerta, mostrarAlerta, submitColaborador } = useProyecto()



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!emailColaborador) {
            mostrarAlerta({
                msg: 'El Email del colaborador de obligatorio. ',
                error: true
            })
            return;
        }
        submitColaborador(emailColaborador)
    }
    const { msg } = alerta
    return (
        <form onSubmit={handleSubmit} className=" bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
            {msg && <Alerta alerta={alerta} />}
            <div className='mt-5'>
                <label htmlFor="email-colaborador" className="text-gray-700 uppercase font-bold text-sm">Email Colaborador</label>
                <input value={emailColaborador} onChange={e => setEmailColaborador(e.target.value)} placeholder="Email del usuario" type="email" id="email-colaborador" className="border rounded-md w-full p-2 mt-2 placeholder-gray-400" />
            </div>
            <input type="submit" className='p-3 rounded-md w-full font-bold mt-5 cursor-pointer uppercase text-white text-center bg-sky-600 hover:shadow-lg transition-all duration-500' value="Buscar Colaborador" />
        </form>
    )
}
