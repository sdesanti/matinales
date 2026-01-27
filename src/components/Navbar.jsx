// src/components/Navbar.jsx (CORREGIDO)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { LogIn, LogOut } from 'lucide-react';
import logoImage from '../assets/logo-fondecyt.png'; 

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirigir a la página principal o login después de cerrar sesión
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand custom-brand" to="/">
                    {/* 🚨 Corrección del uso del logo como imagen */}
                    <img src={logoImage} alt="Logo Fondecyt" height="30" /> 
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                         <li className="nav-item">
                            <Link className="nav-link" to="/quienes-somos">Quienes Somos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/investigadores">Investigadores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/noticias">Noticias</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/publicaciones">Publicaciones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/videos">Videos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        {isLoggedIn ? (
                            // Mostrar botón de Logout si está logueado
                            <>
                                <span className="navbar-text me-3 small text-white-50">
                                    Bienvenido, **{user.username}** ({user.role})
                                </span>
                                <button className="btn btn-outline-light" onClick={handleLogout}>
                                    <LogOut size={18} className="me-2" /> Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            // Mostrar botón de Login si no está logueado
                            <Link className="btn btn-outline-light" to="/login">
                                <LogIn size={18} className="me-2" /> Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;