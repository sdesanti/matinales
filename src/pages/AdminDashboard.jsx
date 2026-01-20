// src/pages/AdminDashboard.jsx (OPTIMIZADO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Newspaper, BookOpen, Film, LayoutDashboard, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';

const summaryCards = [
    { 
        id: 'investigadores', 
        title: 'Investigadores', 
        icon: Users, 
        color: 'bg-primary', 
        endpoint: '/investigadores', 
        path: '/admin/investigadores' 
    },
    { 
        id: 'noticias', 
        title: 'Noticias', 
        icon: Newspaper, 
        color: 'bg-info', 
        endpoint: '/noticias', 
        path: '/admin/noticias' 
    },
    { 
        id: 'publicaciones', 
        title: 'Publicaciones', 
        icon: BookOpen, 
        color: 'bg-success', 
        endpoint: '/publicaciones', 
        path: '/admin/publicaciones' 
    },
    { 
        id: 'videos', 
        title: 'Videos', 
        icon: Film, 
        color: 'bg-warning', 
        endpoint: '/videos', 
        path: '/admin/videos' 
    },
];

const AdminDashboard = () => {
    const { get } = useApi();
    const [counts, setCounts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            setIsLoading(true);
            const newCounts = {};
            
            // Ejecutamos todas las peticiones en paralelo
            await Promise.all(summaryCards.map(async (card) => {
                try {
                    const data = await get(card.endpoint); 
                    // Verificamos si la data es un array o si viene envuelta en un objeto
                    const countValue = Array.isArray(data) ? data.length : (data.total || 0);
                    newCounts[card.id] = { count: countValue, error: false };
                } catch (error) {
                    console.error(`Error en ${card.title}:`, error);
                    newCounts[card.id] = { count: '!', error: true };
                }
            }));
            
            setCounts(newCounts);
            setIsLoading(false);
        };
        
        fetchCounts();
    }, [get]);

    return (
        <div className="admin-dashboard-page p-4">
            <header className="d-flex align-items-center mb-5">
                <div className="bg-secondary bg-opacity-10 p-3 rounded-3 me-3">
                    <LayoutDashboard size={32} className="text-secondary" />
                </div>
                <div>
                    <h1 className="h2 mb-0 fw-bold">Panel de Control</h1>
                    <p className="text-muted mb-0">Bienvenido al sistema de gestión de Matinales Chile</p>
                </div>
            </header>

            <h4 className="mb-4 fw-bold">Estado del Contenido</h4>
            <div className="row">
                {summaryCards.map(card => {
                    const status = counts[card.id];
                    const Icon = card.icon;

                    return (
                        <div key={card.id} className="col-md-6 col-lg-3 mb-4">
                            <Link to={card.path} className="text-decoration-none"> 
                                <div className={`card text-white ${card.color} border-0 shadow-sm h-100 transition-all hover-lift`}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="bg-white bg-opacity-25 p-2 rounded">
                                                <Icon size={28} />
                                            </div>
                                            {status?.error && <AlertCircle size={20} className="text-white" />}
                                        </div>
                                        <div>
                                            <h6 className="text-uppercase fw-bold mb-1 opacity-75 small">{card.title}</h6>
                                            {isLoading ? (
                                                <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                            ) : (
                                                <p className="h2 mb-0 fw-bold">{status?.count ?? 0}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-footer bg-black bg-opacity-10 border-0 py-2">
                                        <small className="d-flex align-items-center justify-content-between">
                                            Gestionar módulo <span className="fs-5">→</span>
                                        </small>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4 bg-light">
                        <h5 className="fw-bold mb-3">Acciones Rápidas</h5>
                        <div className="d-flex gap-2 flex-wrap">
                            <Link to="/admin/noticias/nuevo" className="btn btn-outline-info">Redactar Noticia</Link>
                            <Link to="/admin/investigadores/nuevo" className="btn btn-outline-primary">Añadir Investigador</Link>
                            <Link to="/admin/publicaciones/nuevo" className="btn btn-outline-success">Subir Documento</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;