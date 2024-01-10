import { IFProyecto } from "./IProyectos";

export type TTarea = {
    _id: string;
    nombre: string
    descripcion : string;
    estado?:string;
    fechaEntrega: string;
    prioridad:string;
    proyecto:string | IFProyecto;
    completado?:{nombre:string};
}