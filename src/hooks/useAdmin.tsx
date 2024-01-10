import useAuth from "./useAuth"
import useProyecto from "./useProyectos"

const useAdmin = () =>{
    const {proyecto} = useProyecto()
    const {auth} = useAuth()
    return proyecto.creador === auth._id
}

export default useAdmin