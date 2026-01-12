// src/App.jsx (VERSIÓN FINAL Y SIMPLIFICADA CON RUTAS ANIDADAS)

import { Routes, Route, Outlet } from 'react-router-dom'
// Importaciones de Layouts y Componentes
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'; // Para proteger /admin/*
import AdminLayout from './layouts/AdminLayout'; // Para la estructura con Sidebar

// VISTAS PÚBLICAS
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Investigadores from './pages/Investigadores'
import Publicaciones from './pages/Publicaciones'
import Noticias from './pages/Noticias'
import Videos from './pages/Videos'
import PerfilInvestigador from './pages/PerfilInvestigador'
import DetalleNoticia from './pages/DetalleNoticia'
import DetallePublicacion from './pages/DetallePublicacion'
import DetalleVideo from './pages/DetalleVideo'
import Login from './pages/Login';
import NotFound from './pages/NotFound'; // Usaremos esta en el 404

// VISTAS ADMIN
import AdminDashboard from './pages/AdminDashboard';
import AdminInvestigadoresManagement from './pages/AdminInvestigadoresManagement';
import AdminNoticiasManagement from './pages/AdminNoticiasManagement';
import AdminPublicacionesManagement from './pages/AdminPublicacionesManagement';
import AdminVideosManagement from './pages/AdminVideosManagement';

import './index.css'

// 🌐 Componente Wrapper para el Layout Público (Navbar/Footer)
const PublicLayoutWrapper = () => (
    <>
        <Navbar />
        <div className="main-container">
            {/* Aquí se renderizarán las rutas hijas */}
            <Outlet /> 
        </div>
        <Footer />
    </>
);

function App() {
    return (
        <Routes>
            
            {/* ----------------------------------------------------------------- */}
            {/* 🌐 GRUPO 1: RUTAS PÚBLICAS (Anidadas bajo PublicLayoutWrapper) 🌐 */}
            {/* ----------------------------------------------------------------- */}
            <Route element={<PublicLayoutWrapper />}>
                {/* Rutas de contenido (Estas SÍ necesitan Navbar/Footer) */}
                <Route path="/" element={<Home />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/investigadores" element={<Investigadores />} />
                <Route path="/publicaciones" element={<Publicaciones />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/videos" element={<Videos />} />
                
                {/* Rutas de detalle */}
                <Route path="/investigadores/:id" element={<PerfilInvestigador />} />
                <Route path="/noticias/:id" element={<DetalleNoticia />} />
                <Route path="/publicaciones/:id" element={<DetallePublicacion />} />
                <Route path="/videos/:id" element={<DetalleVideo />} />

                {/* Ruta 404 para URLs dentro del layout público */}
                <Route path="*" element={<NotFound />} />
            </Route>
            
            
            {/* ----------------------------------------------------------------- */}
            {/* 🔑 GRUPO 2: LOGIN Y RUTAS PROTEGIDAS 🔒 */}
            {/* ----------------------------------------------------------------- */}
            
            {/* Ruta de Login (Fuera de los layouts para evitar conflictos) */}
            <Route path="/login" element={<Login />} /> 

            {/* 🚨 RUTAS PROTEGIDAS: Todas las rutas bajo /admin/* */}
            {/* La ruta PROTECTED ROUTE envuelve a ADMIN LAYOUT */}
            <Route element={<ProtectedRoute />}>
                
                {/* La ruta ADMIN LAYOUT (con Sidebar) envuelve las rutas de gestión */}
                <Route path="/admin" element={<AdminLayout />}>
                    
                    {/* DASHBOARD - La ruta raíz del Admin: /admin */}
                    <Route index element={<AdminDashboard />} /> 
                    
                    {/* GESTIÓN DE MÓDULOS (Las rutas quedan como /admin/noticias, /admin/videos, etc.) */}
                    <Route path="investigadores" element={<AdminInvestigadoresManagement />} />
                    <Route path="noticias" element={<AdminNoticiasManagement />} />
                    <Route path="publicaciones" element={<AdminPublicacionesManagement />} />
                    <Route path="videos" element={<AdminVideosManagement />} />

                    {/* Ruta 404 para cualquier URL bajo /admin/xxx que no exista */}
                    <Route path="*" element={<NotFound />} /> 
                </Route>
            </Route>
            
            {/* RUTA FINAL DE FALLBACK (Si la URL no coincide con nada, ej. si el 404 no estaba en el wrapper) */}
            {/* Dado que incluiste el 404 en el PublicLayoutWrapper, esta ruta se vuelve opcional/redundante. */}
            {/* <Route path="*" element={<NotFound />} /> */}
            
        </Routes>
    )
}

export default App;