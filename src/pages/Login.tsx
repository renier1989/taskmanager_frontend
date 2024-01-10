import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IAlertData } from "../interfaces/IAlertData";
import Alerta from "../components/Alerta";
import AxiosClient from "../config/AxiosClient";
import useAuth from "../hooks/useAuth";
// import useAuth from "../hooks/useAuth";


const Login = () => {
  
  const {setAuth} = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState<IAlertData>({ msg: '', error: false })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son requeridos.',
        error: true
      })
      return
    }


    try {
      const { data } = await AxiosClient.post('/usuarios/login', { email, password });
      setAuth(data)
      navigate('/proyectos')
      setAlerta({
        msg: '',
        error: false
      })

      localStorage.setItem('token',data.token);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }
  const { msg } = alerta
  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Inicia Sesion y Administra tus <span className="text-slate-700">{" "}proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className="mt-20 bg-white rounded-lg shadow p-10">
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="email">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} id="email" autoComplete="off" type="email" placeholder="Email de usuario" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" autoFocus />
        </div>
        <div className="my-5">
          <label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="password">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Tu password" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" />
        </div>

        <input type="submit" value="Iniciar Sesion" className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link to="/registrar" className="block text-center my-5 uppercase text-slate-500 text-sm">¿No tienes cuenta? Registrarte</Link>
        <Link to="/olvide-password" className="block text-center my-5 uppercase text-slate-500 text-sm">¿Olvidaste tu Password?</Link>
      </nav>
    </>

  )
}

export default Login