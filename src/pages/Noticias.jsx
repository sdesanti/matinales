// src/pages/Noticias.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; 

// Únicamente para las imágenes, usamos la URL limpia con HTTPS
const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // 🚨 Extraemos 'get' de nuestro hook
    const { get } = useApi();

    const fetchNoticias = async () => {
        setIsLoading(true);
        try {
            // 🚨 USAMOS EL HOOK: automáticamente añade /api y gestiona la URL base
            const data = await get('/noticias');
            setNoticias(data);
            setError(null);
        } catch (err) {
            console.error("Fallo al cargar noticias:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNoticias();
    }, [get]); // Dependencia estable

    if (isLoading) return <div className="text-center p-5">Cargando noticias...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;

    return (
        <div className="container my-5">
            <h1 className="mb-4 custom-h1">Últimas Noticias</h1>

            <div className="row">
                {noticias.map((noticia, index) => {
                    // 🚨 Corregimos la ruta de la imagen para que siempre sea HTTPS
                    const imagenSrc = noticia.imagen 
                        ? `${SERVER_BASE_URL}${noticia.imagen}` 
                        : '/placeholder-news.jpg';

                    return (
                        <motion.div
                            key={noticia.id}
                            className="col-lg-4 col-md-6 mb-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="card custom-card-shadow h-100 border-0">
                                <div className="img-container" style={{ height: '200px', overflow: 'hidden' }}>
                                    <img 
                                        src={imagenSrc} 
                                        className="card-img-top custom-card-img" 
                                        alt={noticia.titulo} 
                                        style={{ 
                                            height: '200px', 
                                            width: '100%', 
                                            objectFit: 'cover',
                                            objectPosition: 'top' 
                                        }} 
                                    />
                                </div>
                                
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title custom-card-title">
                                        <Newspaper size={18} className="me-2 text-primary" />
                                        {noticia.titulo}
                                    </h5>
                                    
                                    <p className="card-subtitle mb-3 text-muted small">
                                        <Calendar size={16} className="me-1" />{formatDate(noticia.fecha)}
                                    </p>
                                    
                                    <p className="card-text text-justify news-summary">
                                        {noticia.resumen}
                                    </p>
                                    
                                    <div className="mt-auto">
                                        <Link 
                                            to={`/noticias/${noticia.id}`} 
                                            className="btn btn-outline-primary mb-4 shadow-sm"
                                        >
                                            Leer más
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Noticias;