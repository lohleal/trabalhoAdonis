import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from './pages/login'
import Error from './pages/error'
import Home from './pages/home'
import Cursos from './pages/cursos'
import CursosCreate from './pages/cursos/create'
import CursosEdit from './pages/cursos/edit'
import Transferencias from './pages/transferencias'
import TransferenciasCreate from './pages/transferencias/create'
import TransferenciasEdit from './pages/transferencias/edit'
import Alunos from './pages/alunos'
import AlunosCreate from './pages/alunos/create'
import AlunosEdit from './pages/alunos/edit'
import Matriculas from './pages/matriculas'
import MatriculasCreate from './pages/matriculas/create'
import MatriculasEdit from './pages/matriculas/edit'
import Transferencia from "./pages/transferencias"

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login", 
        element: <Login />,
    },
    {
        path: "/error", 
        element: <Error />,
    },
    { 
        path: "/home", 
        element: <Home />,
    },
    {
        path: "/cursos", 
        element: <Cursos />,
    },
    {
        path: "/cursos/create", 
        element: <CursosCreate />,
    },
    {
        path: "/cursos/edit", 
        element: <CursosEdit />,
    },
    {
        path: "/transferencias", 
        element: <Transferencias />,
    },
    {
        path: "/transferencias/create", 
        element: <TransferenciasCreate />,
    },
    {
        path: "/transferencias/edit", 
        element: <TransferenciasEdit />,
    },
    {
        path: "/alunos", 
        element: <Alunos />,
    },
    {
        path: "/alunos/create", 
        element: <AlunosCreate />,
    },
    {
        path: "/alunos/edit", 
        element: <AlunosEdit />,
    },
    {
        path: "/matriculas", 
        element: <Matriculas />,
    },
    {
        path: "/matriculas/create", 
        element: <MatriculasCreate />,
    },
    {
        path: "/matriculas/edit", 
        element: <MatriculasEdit />,
    },
])

export default router