// src/layouts/AdminLayout.jsx (VERSIÓN CORREGIDA PARA RUTAS ANIDADAS)
import React from 'react';
import { Outlet } from 'react-router-dom'; // ⬅️ ¡Esto es crucial!
import AdminSidebar from '../components/AdminSidebar'; 

// 🚨 NO IMPORTES: AdminNoticiasManagement, AdminInvestigadoresManagement, etc.

const AdminLayout = () => {

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Sidebar (Es fijo y usa NavLink) */}
            <AdminSidebar />
            
            {/* Espaciador para el Sidebar fijo */}
            <div style={{ width: '280px', flexShrink: 0 }}></div> 

            <main className="flex-grow-1 p-4">
                {/* ⬅️ El Outlet renderiza el componente de la ruta hija actual */}
                <Outlet /> 
            </main>
        </div>
    );
};

export default AdminLayout;