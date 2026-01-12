// src/pages/AdminDashboard.jsx (CORREGIDO - Usando useApi y rutas simplificadas)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Newspaper, BookOpen, Film, LayoutDashboard, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos useApi

// NO necesitamos la URL base aquí, useApi la maneja.
// Si tu useApi tiene la base como 'http://localhost:3001', esto está bien.

// Definición de las "Tarjetas" de Resumen (Endpoints simplificados)
const summaryCards = [
    { 
        id: 'investigadores', 
        title: 'Investigadores', 
        icon: Users, 
        color: 'bg-primary', 
        endpoint: '/investigadores', // 🚨 Endpoint simplificado
        path: '/admin/investigadores' 
    },
    { 
        id: 'noticias', 
        title: 'Noticias', 
        icon: Newspaper, 
        color: 'bg-info', 
        endpoint: '/noticias', // 🚨 Endpoint simplificado
        path: '/admin/noticias' 
    },
    { 
        id: 'publicaciones', 
        title: 'Publicaciones', 
        icon: BookOpen, 
        color: 'bg-success', 
        endpoint: '/publicaciones', // 🚨 Endpoint simplificado
        path: '/admin/publicaciones' 
    },
    { 
        id: 'videos', 
        title: 'Videos', 
        icon: Film, 
        color: 'bg-warning', 
        endpoint: '/videos', // 🚨 Endpoint simplificado
        path: '/admin/videos' 
    },
];

const AdminDashboard = () => {
    const { get } = useApi(); // 🚨 Usamos el método GET del hook useApi
    const [counts, setCounts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Función para obtener el conteo de ítems de cada endpoint
    const fetchCounts = async () => {
        setIsLoading(true);
        const newCounts = {};
        
        await Promise.all(summaryCards.map(async (card) => {
            try {
                // 🚨 Usamos get(card.endpoint) que gestiona el prefijo /api y el token
                const data = await get(card.endpoint); 
                
                // Asumimos que el endpoint devuelve un array que podemos contar
                newCounts[card.id] = { count: data.length, error: null };
            } catch (error) {
                console.error(`Error al cargar ${card.title}:`, error);
                // Si el error es 401/403, useApi.js ya debería manejar el logout
                newCounts[card.id] = { count: 'N/A', error: true };
            }
        }));
        
        setCounts(newCounts);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCounts();
    }, [get]); // 🚨 Agregamos 'get' como dependencia de useEffect (es estable gracias a useCallback)

    // ... El componente DashboardCard no necesita cambios, ya recibe 'path'

    const DashboardCard = ({ title, count, icon: Icon, color, isError, path }) => (
        <div className="col-md-6 col-lg-3 mb-4">
            <Link to={path} style={{ textDecoration: 'none' }}> 
                <div className={`card text-white ${color} shadow hover-scale-up`} style={{ transition: 'transform 0.2s' }}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Icon size={40} className="mb-2" />
                                <h5 className="card-title text-uppercase">{title}</h5>
                                {isLoading ? (
                                    <div className="spinner-border text-white" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                ) : isError ? (
                                    <p className="h3 mb-0 d-flex align-items-center"><AlertCircle size={24} className="me-2" /> Error</p>
                                ) : (
                                    <p className="h1 mb-0">{count}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-white bg-opacity-25 border-0">
                        <small>Ver detalles y gestionar &rarr;</small>
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <div className="admin-dashboard-page p-4">
            <div className="d-flex align-items-center mb-5">
                <LayoutDashboard size={32} className="me-3 text-secondary" />
                <h1>Dashboard de Administración</h1>
            </div>

            {/* ... resto del contenido */}
            <h2 className="mb-4">Resumen de Contenido</h2>
            <div className="row">
                {summaryCards.map(card => (
                    <DashboardCard
                        key={card.id}
                        title={card.title}
                        icon={card.icon}
                        color={card.color}
                        count={counts[card.id]?.count || '...'}
                        isError={counts[card.id]?.error}
                        path={card.path} 
                    />
                ))}
            </div>
            {/* ... resto del contenido */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card shadow-sm p-4">
                        <h4>Guía Rápida de Módulos</h4>
                        <ul>
                            <li>**Investigadores:** Gestión de perfiles, roles y fotos.</li>
                            <li>**Noticias:** Creación, edición y publicación de artículos con imágenes.</li>
                            <li>**Publicaciones:** Mantenimiento del catálogo de *papers*, enlaces de descarga y portadas.</li>
                            <li>**Videos:** Inserción de URLs de contenido multimedia (YouTube, Vimeo) y miniaturas.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;