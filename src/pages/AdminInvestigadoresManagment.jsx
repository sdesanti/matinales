// src/pages/AdminInvestigadoresManagement.jsx

import React from 'react';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos useApi

const AdminInvestigadoresManagement = () => {
    return (
        <div className="admin-page-content">
            <h2 className="mb-4">Gestión de Investigadores</h2>
            <p className="lead">
                Bienvenido al área de administración de Investigadores. 
                Aquí podrás agregar nuevos miembros, editar sus perfiles o eliminar investigadores existentes.
            </p>
            
            {/* Placeholder para el botón de Agregar Nuevo */}
            <button className="btn btn-primary mb-4">
                + Agregar Nuevo Investigador
            </button>

            {/* Placeholder para la tabla */}
            <div className="card p-3">
                <h5>Lista de Investigadores Actuales</h5>
                <p className="text-muted">
                    (Aquí irá la tabla de datos conectada a la API de investigadores)
                </p>
                {/* Contenido futuro: Tabla con acciones de Editar/Eliminar */}
            </div>
        </div>
    );
};

export default AdminInvestigadoresManagement;