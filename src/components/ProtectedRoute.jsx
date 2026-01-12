// src/components/ProtectedRoute.jsx (VERSIÓN MEJORADA)

import React from 'react';
// 🚨 Importar useLocation
import { Navigate, Outlet, useLocation } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const ProtectedRoute = () => {
    const { isLoggedIn, isLoading } = useAuth(); // Cambio isAuthenticated por isLoggedIn para consistencia
    // 🚨 Obtener la ubicación actual
    const location = useLocation(); 

    if (isLoading) {
        return <div className="text-center p-5">Verificando sesión...</div>;
    }

    if (!isLoggedIn) {
        // 🚨 CAMBIO CLAVE: Pasar la ubicación actual en el estado 'from'
        return <Navigate to="/login" state={{ from: location }} replace />; 
    }

    return <Outlet />; 
};

export default ProtectedRoute;