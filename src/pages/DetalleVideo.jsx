// src/pages/DetalleVideo.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, Calendar, ArrowLeft } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; // ✅ Hook integrado

// Helper para fechas
const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
        return dateString;
    }
};

// Función auxiliar para obtener la URL de incrustación (embed)
const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    
    // Asegurar HTTPS para evitar bloqueos de contenido mixto
    let secureUrl = url.replace('http://', 'https://');

    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = secureUrl.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return secureUrl;
};

const DetalleVideo = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { get } = useApi(); // 🚨 Hook para fetch seguro

    useEffect(() => {
        const fetchVideo = async () => {
            setIsLoading(true);
            try {
                const data = await get(`/videos/${id}`);
                setVideo(data);
                setError(null);
            } catch (err) {
                console.error("Error al cargar video:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchVideo();
    }, [id, get]);

    if (isLoading) return <div className="text-center p-5 mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger text-center p-4 m-5">Error: {error}</div>;
    if (!video) return <div className="text-center p-5">El video solicitado no existe.</div>;

    const embedUrl = getEmbedUrl(video.url_embed); 

    return (
        <div className="container my-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/videos" className="btn btn-outline-primary mb-4 shadow-sm">
                    <ArrowLeft size={20} className="me-2" />
                    Volver a Videos
                </Link>

                <div className="card shadow-lg p-4 p-md-5 border-0 rounded-4">
                    <h1 className="mb-2 text-center fw-bold" style={{ color: '#1a365d' }}>{video.titulo}</h1>
                    
                    <p className="text-muted text-center mb-4">
                        <PlayCircle size={16} className="me-1" />
                        Plataforma: <strong>{video.plataforma || 'YouTube'}</strong> | 
                        <Calendar size={16} className="ms-3 me-1" />
                        Publicado: <strong>{formatDate(video.fecha_publicacion)}</strong>
                    </p>

                    {embedUrl ? (
                        <div className="ratio ratio-16x9 mb-5 shadow-sm rounded-4 overflow-hidden bg-black">
                            <iframe
                                src={embedUrl}
                                title={video.titulo}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="alert alert-warning text-center">Formato de video no compatible.</div>
                    )}

                    <div className="mx-auto" style={{ maxWidth: '850px' }}>
                        <h4 className="fw-bold mb-3 border-bottom pb-2">Descripción</h4>
                        <div className="text-secondary lh-lg" style={{ textAlign: 'justify', fontSize: '1.1rem' }}>
                            {video.descripcion || "Sin descripción adicional."}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DetalleVideo;