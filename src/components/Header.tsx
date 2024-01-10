import { Link } from "react-router-dom"
import useProyecto from "../hooks/useProyectos"
import Busqueda from "./Buscador"
import useAuth from "../hooks/useAuth"

export const Header = () => {
    const { handleBuscador } = useProyecto()
    const { cerrarSesionProyectos } = useProyecto()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionProyectos();
        cerrarSesionAuth();
        localStorage.removeItem('token');
    }
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                    <Link to="/proyectos">
                        TaskManager
                    </Link>
                </h2>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <button className="font-bold uppercase"
                        onClick={handleBuscador}
                    >Buscar Proyecto</button>
                    <Link
                        to="/proyectos"
                        className="font-bold uppercase "
                    >Proyectos</Link>
                    <button type="button" className="text-sm text-white bg-sky-600 rounded-md font-bold p-2"
                    onClick={handleCerrarSesion}
                    >Cerrar Sesion</button>
                </div>
            </div>
            <Busqueda />
        </header>
    )
}
