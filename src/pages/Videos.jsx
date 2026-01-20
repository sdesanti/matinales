// src/pages/Videos.jsx (CORREGIDO Y OPTIMIZADO)

import React, { useState, useEffect } from 'react';
import { PlayCircle, Calendar, Youtube as YoutubeIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos el hook

// URL Base para las miniaturas locales
const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

// --- FUNCIONES AUXILIARES ---

const getYoutubeId = (url) => {
    if (!url || typeof url !== 'string') return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp); 
    return (match && match[2].length === 11) ? match[2] : null;
};

const getYoutubeEmbedUrl = (url) => {
    const id = getYoutubeId(url);
    if (id) {
        return `https://www.youtube.com/embed/${id}`;
    }
    // Aseguramos que si no es YouTube, al menos use HTTPS si la URL lo permite
    return url.replace('http://', 'https://');
};

const getThumbnailUrl = (video) => {
    // 1. Si hay miniatura subida al servidor
    if (video.miniatura_url) {
        return `${SERVER_BASE_URL}${video.miniatura_url}`;
    }
    
    // 2. Si es YouTube, obtener miniatura oficial
    const youtubeId = getYoutubeId(video.url_embed);
    if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    }

    // 3. Placeholder de seguridad
    return 'https://via.placeholder.com/640x360?text=Video+Disponible'; 
};

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideoId, setActiveVideoId] = useState(null); 

    const { get } = useApi(); // 🚨 Usamos el hook

    const fetchVideos = async () => {
        setIsLoading(true);
        try {
            // 🚨 Llamada limpia a través del hook
            const data = await get('/videos');
            setVideos(data);
            setError(null);
        } catch (err) {
            console.error("Fallo al cargar videos:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [get]);

    const handlePlayClick = (videoId) => {
        setActiveVideoId(videoId);
    };

    if (isLoading) return <div className="text-center p-5">Cargando videos...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;

    return (
        <div className="container my-5">
            <h1 className="mb-5 custom-h1 text-center">Videos y Multimedia</h1>

            <div className="row g-4">
                {videos.map((video, index) => {
                    const embedUrl = getYoutubeEmbedUrl(video.url_embed);
                    const thumbnailUrl = getThumbnailUrl(video);
                    const isPlaying = activeVideoId === video.id;

                    return (
                        <motion.div
                            key={video.id}
                            className="col-lg-6 col-md-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="card shadow-lg h-100 border-0 overflow-hidden">
                                
                                <div className="video-container" style={{ position: 'relative', height: '315px', backgroundColor: '#000' }}>
                                    {isPlaying ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`${embedUrl}?autoplay=1`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video.titulo}
                                        ></iframe>
                                    ) : (
                                        <div 
                                            className="video-thumbnail" 
                                            style={{ 
                                                backgroundImage: `url(${thumbnailUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                height: '100%',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignPosition: 'center',
                                                alignItems: 'center'
                                            }}
                                            onClick={() => handlePlayClick(video.id)}
                                        >
                                            <div className="play-button-wrapper">
                                                <PlayCircle 
                                                    size={80} 
                                                    className="text-white opacity-75 transition-all play-icon-hover"
                                                    style={{ filter: 'drop-shadow(0px 0px 10px rgba(0,0,0,0.5))' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="card-body">
                                    <h5 className="card-title text-primary d-flex align-items-center">
                                        <YoutubeIcon size={20} className="me-2 text-danger" />
                                        {video.titulo}
                                    </h5>
                                    <p className="card-subtitle mb-2 text-muted small d-flex align-items-center">
                                        <Calendar size={14} className="me-1" />
                                        {video.fecha_publicacion ? new Date(video.fecha_publicacion).toLocaleDateString() : 'Fecha desconocida'}
                                    </p>
                                    <p className="card-text text-secondary">{video.descripcion}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Videos;