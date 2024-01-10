import Alerta from "../components/Alerta";
import { PreviewProyecto } from "../components/PreviewProyecto";
import useProyecto from "../hooks/useProyectos"
// import { useEffect } from "react";
// import io from "socket.io-client"

// let socket;

function Proyectos() {
  const { proyectos,alerta } = useProyecto()

  // useEffect(() => {
  //   // esto es para poder abrir una conexion on el servidor de socket.io
  //   socket = io(import.meta.env.VITE_BACKEND_URL);
  //   // EL PRIMER PARAMETRO SE EL NOMBRE DEL EVENTO
  //   // EL SEGUNDO PARAMETRO SON LOS PARAMETROS O VARIABLES QUE SE ENVIAR AL SERVER
  //   socket.emit('prueba','Renier Vargas ');

  //   socket.on('respuesta',(data)=>{
  //     console.log(data);
  //   })

  // }
  // // ,[] // si se define el arreglo de dependencias solo se ejecuta una vez, aqui se recomienda no declararlo para que este escuchando todo el tiempo
  // )
  

  return (
    <>
      <h1 className="text-4xl  font-black">Proyectos</h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto key={proyecto.nombre} proyecto={proyecto} />
          ))
          :
          <p className=" text-center text-gray-600 uppercase p-5">No hay proyectos aun!</p>
        }
      </div>
    </>
  )
}

export default Proyectos