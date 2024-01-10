import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const Sidebar = () => {
    const { auth }= useAuth()
  return (
    <aside className="md:w-1/3 lg:w-1/4 xl:w-1/6  px-5 py-10">
        <p className="text-xl font-bold">Hola: {auth.nombre} </p>

        <Link to="nuevo-proyecto"
        className="bg-sky-600 font-bold w-full p-3 text-white uppercase block mt-5  rounded-md  text-center hover:shadow-lg transition duration-400"
        >
            Nuevo Proyecto
        </Link>
    </aside>
  )
}
