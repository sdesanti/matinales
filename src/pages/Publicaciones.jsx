// src/pages/Publicaciones.jsx (CORREGIDO)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; 

// URL Base para archivos (Imágenes y PDFs)
const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const Publicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 🚨 Usamos nuestro hook personalizado
    const { get } = useApi();

    const fetchPublicaciones = async () => {
        setIsLoading(true);
        try {
            // 🚨 El hook ya sabe que debe ir a /api/publicaciones
            const data = await get('/publicaciones'); 
            setPublicaciones(data);
            setError(null);
        } catch (err) {
            console.error("Fallo al cargar publicaciones:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicaciones();
    }, [get]);

    if (isLoading) return <div className="text-center p-5">Cargando publicaciones...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;

    return (
        <div className="container my-5">
            <h1 className="mb-5 custom-h1 text-center">Nuestras Publicaciones Académicas</h1>

            <div className="list-group">
                {publicaciones.map((pub, index) => {
                    
                    // Portada: Siempre HTTPS
                    const portadaSrc = pub.imagen 
                        ? (pub.imagen.startsWith('http') ? pub.imagen : `${SERVER_BASE_URL}${pub.imagen}`)
                        : '/placeholder-book.svg';

                    // PDF: Si es ruta relativa (empieza con /uploads), le ponemos la base de Fly
                    const linkDescarga = pub.urlDescarga 
                        ? (pub.urlDescarga.startsWith('http') ? pub.urlDescarga : `${SERVER_BASE_URL}${pub.urlDescarga}`)
                        : null;

                    return (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="list-group-item list-group-item-action mb-3 shadow-sm border-0 p-3"
                            style={{ borderRadius: '12px' }}
                        >
                            <div className="row g-3 align-items-center">
                                <div className="col-auto d-none d-sm-block">
                                    <div style={{ width: '85px', height: '115px', overflow: 'hidden' }} className="rounded shadow-sm border">
                                        <img 
                                            src={portadaSrc} 
                                            alt={pub.titulo}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                                        <h5 className="mb-1 text-primary fw-bold" style={{ fontSize: '1.15rem' }}>
                                            {pub.titulo}
                                        </h5>
                                        {linkDescarga && (
                                            <a 
                                                href={linkDescarga} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn btn-sm btn-success flex-shrink-0 ms-md-3 mt-2 mt-md-0"
                                            >
                                                <Download size={16} className="me-1" /> Descargar PDF
                                            </a>
                                        )}
                                    </div>

                                    <p className="mb-1 small text-muted">
                                        <strong>Autores:</strong> {pub.autores || 'Equipo de Investigación'}
                                    </p>

                                    <div className="text-secondary mb-2" style={{ fontSize: '0.85rem' }}>
                                        <Calendar size={14} className="me-1" />
                                        {formatDate(pub.fecha)} 
                                    </div>

                                    <p className="mb-2 text-dark small" style={{ 
                                        display: '-webkit-box',
                                        WebkitLineClamp: '3',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textAlign: 'justify'
                                    }}>
                                        {pub.resumen}
                                    </p>
                                    
                                    <Link to={`/publicaciones/${pub.id}`} className="small fw-bold text-decoration-none">
                                        Leer más detalles &raquo;
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Publicaciones;