import { TColaborador } from "./ColaboradorType";
import { IAlertData } from "./IAlertData";
import { TProyecto } from "./ProyectoType";
import { TTarea } from './TareaType';

export interface IFProyecto {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
  creador: string;
  tareas: TTarea[];
  colaboradores: TColaborador[];
}

export interface IProyectosContext {
  proyectos: IFProyecto[];
  alerta: IAlertData;
  mostrarAlerta: (alerta: IAlertData) => void;
  submitProyecto: (proyecto: TProyecto) => void;
  obtenerProyecto: (id: string) => void;
  proyecto: IFProyecto;
  cargando: boolean;
  eliminarProyecto: (id: string) => void;
  modalFormularioTarea:boolean;
  handleModalTarea: ()=>void;
  submitTarea: (tarea: TTarea) => void;
  handleModalEtidarTarea: (tarea:TTarea)=>void;
  tarea: TTarea;
  modalEliminarTarea : boolean;
  handleModalEliminarTarea: (tarea:TTarea)=>void;
  eliminarTarea: ()=>void;
  submitColaborador : (email:string)=>void;
  colaborador: TColaborador;
  cargandoColaborador: boolean;
  agregarColaborador : (email:{email:string})=>void;
  handleModalEliminarColaborador: (colaborador: TColaborador)=>void;
  modalEliminarColaborador: boolean;
  eliminarColaborador : ()=>void;
  completarTarea : (id:string)=>void
  buscador: boolean;
  handleBuscador: ()=>void;
  cerrarSesionProyectos: ()=>void;

  // socket.io functions
  submitTareasProyectos: (tarea:TTarea)=>void;
  deleteTareasProyectos: (tarea:TTarea)=>void;
  editarTareasProyectos: (tarea:TTarea)=>void;
  completarTareasProyectos: (tarea:TTarea)=>void;

  // mostrarAlerta: React.Dispatch<React.SetStateAction<IAlertData>>
}

export interface IProyectosProvider {
  children: JSX.Element | JSX.Element[];
}

