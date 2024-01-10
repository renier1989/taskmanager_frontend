import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import { IAlertData } from "../interfaces/IAlertData";
import AxiosClient from "../config/AxiosClient";


const ConfirmarCuenta = () => {

  const params = useParams()
  const { id } = params;
  const [alerta, setAlerta] = useState<IAlertData>({ msg: '', error: false })
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);


  useEffect(() => {
    const confirmarToken = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await AxiosClient(url);

        setAlerta({
          msg: data.msg,
          error: false,
        })

        setCuentaConfirmada(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }
    }
    return () => { confirmarToken() }

  }, [id])

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 text-6xl font-black capitalize">
        Confirma tu cuenta y empieza a crear tus <span className="text-slate-700">{" "}proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg bg-white rounded-xl px-5 py-10">
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 uppercase text-slate-500 text-sm"> Inicia Sesion</Link>
        )}

      </div>
    </>
  )
}

export default ConfirmarCuenta