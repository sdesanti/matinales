// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="container text-center my-5 p-5">
            <Frown size={80} className="text-danger mb-4 mx-auto d-block" />
            
            <h1 className="display-1 fw-bold" style={{ color: 'var(--color-principal)' }}>404</h1>
            
            <h2 className="mb-4">Página No Encontrada</h2>
            
            <p className="lead mb-4">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
                Por favor, verifica la URL o usa los enlaces de navegación.
            </p>
            
            <Link to="/" className="btn btn-warning btn-lg text-white">
                Volver a la Página Principal
            </Link>
        </div>
    );
};

export default NotFound;