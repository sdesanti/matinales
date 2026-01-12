/// src/pages/Publicaciones.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE_URL = 'http://localhost:3001';

const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const Publicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublicaciones = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/publicaciones`); 
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
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
    }, []);

    if (isLoading) return <div className="text-center p-5">Cargando publicaciones...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;

    return (
        <div className="container my-5">
            <h1 className="mb-5 custom-h1 text-center">Nuestras Publicaciones Académicas</h1>

            <div className="list-group">
                {publicaciones.map((pub, index) => {
                    
                    // 1. CORRECCIÓN DE IMAGEN: Usamos 'imagen' (nombre en DB)
                    const portadaSrc = pub.imagen 
                        ? `${API_BASE_URL}${pub.imagen}` 
                        : '/placeholder-book.svg';

                    // 2. CORRECCIÓN DE PDF: Usamos 'urlDescarga' (nombre en DB)
                    const linkDescarga = pub.urlDescarga 
                        ? (pub.urlDescarga.startsWith('http') ? pub.urlDescarga : `${API_BASE_URL}${pub.urlDescarga}`)
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
                                {/* Columna 1: Portada con tamaño fijo para evitar desalineación */}
                                <div className="col-auto d-none d-sm-block">
                                    <div style={{ width: '85px', height: '115px', overflow: 'hidden' }} className="rounded shadow-sm border">
                                        <img 
                                            src={portadaSrc} 
                                            alt={pub.titulo}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    </div>
                                </div>

                                {/* Columna 2: Detalles */}
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

                                    {/* Resumen limitado para mantener la alineación visual */}
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