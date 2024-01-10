import { useContext } from 'react';
import ProyectosContext from '../context/ProyectosContext';
const useProyecto = () => {
    return useContext(ProyectosContext);
}
export default useProyecto