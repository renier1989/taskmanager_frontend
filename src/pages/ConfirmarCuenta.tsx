import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import { IAlertData } from "../interfaces/IAlertData";
import AxiosClient from "../config/AxiosClient";
import { IErrorResponse } from "../interfaces/IErrorrResponse";


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