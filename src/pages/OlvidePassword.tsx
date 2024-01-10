import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import { IAlertData } from "../interfaces/IAlertData";
import AxiosClient from "../config/AxiosClient";
import { IErrorResponse } from "../interfaces/IErrorrResponse";


const OlvidePassword = () => {

	const [email, setEmail] = useState('')
	const [alerta, setAlerta] = useState<IAlertData>({ msg: '', error: false })
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email === '' || email.length < 6) {
			setAlerta({
				msg: 'El Email es obligatorio',
				error: true
			})
			return;
		}


		try {
			const { data } = await AxiosClient.post(`/usuarios/olvide-password`, { email });
			setAlerta({
				msg: data.msg,
				error: false
			})

		} catch (error) {
			const err = error as IErrorResponse;
			setAlerta({ msg: err.response.data.msg, error: true });
			setTimeout(() => {
				setAlerta({} as IAlertData);
			}, 3000);
		}

	}

	const { msg } = alerta;
	return (
		<>
			<h1 className="text-sky-600 text-6xl font-black capitalize">
				Recupera tu cuenta y no pierdas tus <span className="text-slate-700">{" "}proyectos</span>
			</h1>

			<div>
				{msg && <Alerta alerta={alerta} />}
			</div>
			<form onSubmit={e => handleSubmit(e)} className="mt-20 bg-white rounded-lg shadow p-10">
				<div className="my-5">
					<label className="block uppercase text-gray-600 text-xl font-bold" htmlFor="email">Email</label>
					<input onChange={e => setEmail(e.target.value)} id="email" autoComplete="off" type="email" placeholder="Email de usuario" className="w-full border p-3 mt-5 rounded-xl bg-gray-50" autoFocus />
				</div>
				<input type="submit" value="Enviar Instrucciones" className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
			</form>

			<nav className="lg:flex lg:justify-between ">
				<Link to="/" className="block text-center my-5 uppercase text-slate-500 text-sm">¿Ya tienes una cuenta? Inicia Sesion</Link>
				<Link to="/registrar" className="block text-center my-5 uppercase text-slate-500 text-sm">¿No tienes cuenta? Registrarte</Link>
			</nav>
		</>
	)
}

export default OlvidePassword