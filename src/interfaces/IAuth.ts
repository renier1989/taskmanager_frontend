import { TAuth } from "./AuthType";

export interface IAuthContext {
    cargando: boolean;
    auth: TAuth;
    setAuth: (auth:TAuth)=>void;
    cerrarSesionAuth: ()=>void;
    // setAuth: React.Dispatch<React.SetStateAction<TAuth>>
}

export interface IAuthProvider {
    children: JSX.Element | JSX.Element[];
}