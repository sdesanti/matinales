// src/pages/DetalleNoticia.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; // ✅ Hook integrado

const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
        return dateString;
    }
};

const DetalleNoticia = () => {
    const { id } = useParams(); 
    const [noticia, setNoticia] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { get } = useApi(); // 🚨 Hook para llamadas limpias

    useEffect(() => {
        const fetchNoticia = async () => {
            setIsLoading(true);
            try {
                // 🚨 El hook maneja los errores 404 y el JSON automáticamente
                const data = await get(`/noticias/${id}`);
                setNoticia(data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar noticia:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (id) fetchNoticia();
    }, [id, get]);

    if (isLoading) return <div className="text-center p-5 mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger text-center p-4 m-5">Error: {error}</div>;
    if (!noticia) return <div className="text-center p-5">La noticia no existe.</div>;

    const imagenSrc = noticia.imagen 
        ? `${SERVER_BASE_URL}${noticia.imagen}` 
        : '/placeholder-detail.jpg';

    return (
        <div className="container my-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                
                <Link to="/noticias" className="btn btn-outline-primary mb-4 shadow-sm">
                    <ArrowLeft size={20} className="me-2" />
                    Volver a Noticias
                </Link>

                <div className="card shadow-lg p-4 p-md-5 border-0 rounded-4">
                    
                    <h1 className="mb-3 text-center fw-bold" style={{ color: '#1a365d' }}>
                        {noticia.titulo}
                    </h1>
                    
                    <p className="text-muted text-center mb-5">
                        <Calendar size={18} className="me-1" />
                        Publicado el {formatDate(noticia.fecha)}
                    </p>

                    <div className="text-center mb-5">
                        <img 
                            src={imagenSrc} 
                            alt={noticia.titulo} 
                            className="img-fluid rounded-4 shadow"
                            style={{ 
                                maxHeight: '500px', 
                                width: '100%', 
                                objectFit: 'cover', 
                                objectPosition: 'top'
                            }} 
                            onError={(e) => { e.target.src = '/placeholder-detail.jpg'; }}
                        />
                    </div>

                    <div className="custom-news-content mx-auto" style={{ maxWidth: '800px' }}>
                        {noticia.resumen && (
                            <p className="lead fw-bold mb-4 p-3 bg-light border-start border-4 border-primary">
                                {noticia.resumen}
                            </p>
                        )}
                        
                        <div 
                            className="news-body-text"
                            style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'justify' }}
                            dangerouslySetInnerHTML={{ __html: noticia.contenidoCompleto || noticia.contenido }} 
                        />

                        {!noticia.contenidoCompleto && !noticia.resumen && (
                            <p className="text-muted italic text-center mt-4">No hay contenido adicional disponible.</p>
                        )} 
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DetalleNoticia;