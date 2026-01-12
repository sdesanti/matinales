// src/pages/DetalleNoticia.jsx (VERSION FINALIZADA - MODIFICADO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react'; 
import { motion } from 'framer-motion';

const API_BASE_URL = 'http://localhost:3001';

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

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/noticias/${id}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error("Noticia no encontrada");
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setNoticia(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNoticia();
    }, [id]);

    if (isLoading) return <div className="text-center p-5">Cargando noticia...</div>;
    if (error) return <div className="alert alert-danger text-center p-4 m-5">Error: {error}</div>;
    if (!noticia) return <div className="text-center p-5">La noticia no existe.</div>;

    // 🚨 CORRECCIÓN CLAVE: Usamos 'noticia.imagen'
    const imagenSrc = noticia.imagen 
        ? `${API_BASE_URL}${noticia.imagen}` 
        : '/placeholder-detail.jpg';

    return (
        <div className="container my-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                
                <Link to="/noticias" className="btn btn-outline-primary mb-4">
                    <ArrowLeft size={20} className="me-2" />
                    Volver a Noticias
                </Link>

                <div className="card shadow-lg p-4 p-md-5 border-0 rounded-4">
                    
                    <h1 className="mb-3 text-center fw-bold" style={{ color: '#1a365d' }}>
                        {noticia.titulo}
                    </h1>
                    
                    <p className="text-muted text-center mb-5">
                        <Calendar size={18} className="me-2" />
                        Publicado el {formatDate(noticia.fecha)}
                    </p>

                    {/* Imagen Principal con corrección de encuadre */}
                    <div className="text-center mb-5">
                        <img 
                            src={imagenSrc} 
                            alt={noticia.titulo} 
                            className="img-fluid rounded-4 shadow"
                            style={{ 
                                maxHeight: '500px', 
                                width: '100%', 
                                objectFit: 'cover', 
                                objectPosition: 'top' // ⬅️ Evita que se vean solo las piernas
                            }} 
                        />
                    </div>

                    <div className="custom-news-content mx-auto" style={{ maxWidth: '800px' }}>
                        {/* Resumen destacado */}
                        {noticia.resumen && (
                            <p className="lead fw-bold mb-4 p-3 bg-light border-start border-4 border-primary">
                                {noticia.resumen}
                            </p>
                        )}
                        
                        {/* Contenido Completo */}
                        <div 
                            className="news-body-text"
                            style={{ fontSize: '1.15rem', lineHeight: '1.8', textAlign: 'justify' }}
                            dangerouslySetInnerHTML={{ __html: noticia.contenidoCompleto }} 
                        />

                        {!noticia.contenidoCompleto && !noticia.resumen && (
                            <p className="text-muted italic">No hay contenido adicional para esta noticia.</p>
                        )} 
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DetalleNoticia;