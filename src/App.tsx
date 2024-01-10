import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePassword from "./pages/OlvidePassword"
import NuevaPassword from "./pages/NuevaPassword"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import { AuthProvider } from "./context/AuthContext"
import PrivateLayout from "./layouts/PrivateLayout"
import Proyectos from "./pages/Proyectos"
import NuevoProyecto from "./pages/NuevoProyecto"
import { ProyectosProvider } from "./context/ProyectosContext"
import { Proyecto } from "./pages/Proyecto"
import { EditarProyecto } from "./pages/EditarProyecto"
import { NuevoColaborador } from "./pages/NuevoColaborador"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            {/* rutas publicas */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevaPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            {/* rutras privadas */}
            <Route path="/proyectos" element={<PrivateLayout />}>
              <Route index element={<Proyectos />} />
              <Route path="nuevo-proyecto" element={<NuevoProyecto />} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
              {/* este componente que va a menejar las rutas dinamicas de los proyecto siempre deberia ir al final  */}
              <Route path=":id" element={<Proyecto />} /> 
              <Route path="editar/:id" element={<EditarProyecto />} /> 
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
