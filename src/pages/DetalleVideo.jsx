// src/pages/DetalleVideo.jsx (VERSIÓN FINALIZADA Y CON LÓGICA DE EMBED)

import React, { useState, useEffect } from 'react';
// ... imports sin cambios

const API_BASE_URL = 'http://localhost:3001';

// Función auxiliar para formatear la fecha (sin cambios)
// ... formatDate (sin cambios)

// Función auxiliar para obtener la URL de incrustación (embed) - Mejorada para robustez
const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    
    // Regex para extraer el ID de YouTube de la mayoría de formatos de URL
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        // Es un ID de YouTube válido
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    // Si no es un formato de YouTube conocido, asumimos que es una URL de embed directa
    return url;
};


const DetalleVideo = () => {
    // ... lógica de fetch y estados sin cambios

    // ... useEffect sin cambios

    // --- Lógica de Renderizado ---
    if (isLoading) return <div className="text-center p-5">Cargando video...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;
    if (!video) return <div className="text-center p-5">El video solicitado no existe.</div>;

    // Generar la URL de incrustación (embed)
    const embedUrl = getEmbedUrl(video.url_embed); 

    return (
        <div className="container my-5">
            <motion.div
                // ... animación sin cambios
            >
                {/* Botón de Volver */}
                <Link to="/videos" className="btn btn-outline-primary custom-btn-back mb-4">
                    <ArrowLeft size={20} className="me-2" />
                    Volver a Videos
                </Link>

                <div className="custom-detail-card card shadow-lg p-5">
                    
                    <h1 className="mb-2 text-center" style={{ color: 'var(--color-principal)' }}>{video.titulo}</h1>
                    
                    {/* Metadatos */}
                    <p className="text-muted text-center mb-4">
                        <PlayCircle size={16} className="me-1" />
                        Plataforma: **{video.plataforma || 'Multimedia Externa'}** | 
                        <Calendar size={16} className="ms-3 me-1" />
                        Fecha de Publicación: **{formatDate(video.fecha_publicacion)}**
                    </p>

                    {/* Contenedor de Video Responsivo */}
                    {embedUrl ? (
                        <div className="text-center mb-5 d-flex justify-content-center">
                            <div className="custom-video-player">
                                <iframe
                                    className="custom-video-playeriframe"
                                    src={embedUrl}
                                    title={video.titulo}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-warning text-center">La URL del video no está disponible o no tiene un formato válido.</div>
                    )}

                    {/* Descripción */}
                    <h2 className="mb-3">Descripción</h2>
                    <p className="custom-news-contentp text-justify">
                        {video.descripcion || "No hay descripción disponible para este video."}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default DetalleVideo;