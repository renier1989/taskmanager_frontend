import {  createContext, useEffect, useState } from "react";
import { TAuth, authValues } from '../interfaces/AuthType';
import AxiosClient from "../config/AxiosClient";
import { useNavigate } from "react-router-dom";
import { IAuthContext, IAuthProvider } from "../interfaces/IAuth";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }:IAuthProvider) => {
// const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const navigate = useNavigate();
    const [auth, setAuth] = useState<TAuth>(authValues as TAuth);
    const [cargando , setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const tokenLS = localStorage.getItem('token');
            if (!tokenLS) {
                setCargando(false);
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenLS}`
                }
            }

            try {
                const { data } = await AxiosClient('/usuarios/perfil', config)
                setAuth(data)
                // navigate('/proyectos')
                
            } catch (error) {
                setAuth(authValues)
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [navigate])

    const cerrarSesionAuth = () => {
        setAuth(authValues)
    }

    return <AuthContext.Provider value={{
        cargando,
        auth,
        setAuth,
        cerrarSesionAuth,
    }}>
        {children}
    </AuthContext.Provider>
}

export {
    AuthProvider
}

export default AuthContext