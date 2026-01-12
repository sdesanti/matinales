// src/components/AdminSidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, BookOpen, Film, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

// Las clases 'active' deben reflejar el estilo activo que definiste en tu CSS
const getNavLinkClass = ({ isActive }) => 
    `list-group-item list-group-item-action py-2 ${isActive ? 'active custom-admin-active' : 'custom-admin-inactive'}`;

const AdminSidebar = () => {
    const { logout } = useAuth(); // Función de logout del contexto

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark custom-admin-sidebar" style={{ width: '280px', height: '100vh', position: 'fixed' }}>
            
            <h4 className="text-center mb-4 border-bottom pb-3">
                <LayoutDashboard size={24} className="me-2 text-warning" />
                Panel Admin
            </h4>

            <ul className="nav nav-pills flex-column mb-auto list-group">
                
                {/* 1. Dashboard Principal */}
                <li className="nav-item">
                    <NavLink to="/admin" end className={getNavLinkClass}>
                        <LayoutDashboard size={20} className="me-2" />
                        Dashboard
                    </NavLink>
                </li>

                {/* 2. Noticias */}
                <li className="nav-item">
                    <NavLink to="/admin/noticias" className={getNavLinkClass}>
                        <Newspaper size={20} className="me-2" />
                        Gestión de Noticias
                    </NavLink>
                </li>

                {/* 3. Investigadores */}
                <li className="nav-item">
                    <NavLink to="/admin/investigadores" className={getNavLinkClass}>
                        <Users size={20} className="me-2" />
                        Gestión de Investigadores
                    </NavLink>
                </li>

                {/* 4. Publicaciones */}
                <li className="nav-item">
                    <NavLink to="/admin/publicaciones" className={getNavLinkClass}>
                        <BookOpen size={20} className="me-2" />
                        Gestión de Publicaciones
                    </NavLink>
                </li>
                
                {/* 5. Videos */}
                <li className="nav-item">
                    <NavLink to="/admin/videos" className={getNavLinkClass}>
                        <Film size={20} className="me-2" />
                        Gestión de Videos
                    </NavLink>
                </li>

                {/* Puedes añadir un separador */}
                <li><hr className="dropdown-divider my-3" /></li>

                {/* 6. Enlace de Cerrar Sesión */}
                <li>
                    <button 
                        onClick={logout} 
                        className="btn btn-outline-danger w-100 mt-2"
                        aria-label="Cerrar Sesión"
                    >
                        <LogOut size={20} className="me-2" />
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;