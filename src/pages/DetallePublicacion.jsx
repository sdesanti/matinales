// src/pages/DetallePublicacion.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowLeft, Download } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; // ✅ Hook integrado

const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
        return dateString;
    }
};

const DetallePublicacion = () => {
    const { id } = useParams(); 
    const [publicacion, setPublicacion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { get } = useApi(); // 🚨 Hook para fetch seguro

    useEffect(() => {
        const fetchPublicacion = async () => {
            setIsLoading(true);
            try {
                // El hook ya maneja el prefijo /api y los errores de conexión
                const data = await get(`/publicaciones/${id}`);
                setPublicacion(data);
                setError(null);
            } catch (err) {
                console.error("Fallo al cargar la publicación:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (id) fetchPublicacion();
    }, [id, get]);

    if (isLoading) return <div className="text-center p-5 mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="alert alert-danger text-center p-4 m-5">Error: {error}</div>;
    if (!publicacion) return <div className="text-center p-5">La publicación no existe.</div>;

    // --- Lógica de URLs corregida ---
    const portadaSrc = publicacion.imagen 
        ? `${SERVER_BASE_URL}${publicacion.imagen}` 
        : '/placeholder-book-detail.svg';

    // Maneja tanto links externos como archivos locales subidos al servidor
    const linkDescarga = publicacion.urlDescarga 
        ? (publicacion.urlDescarga.startsWith('http') 
            ? publicacion.urlDescarga 
            : `${SERVER_BASE_URL}${publicacion.urlDescarga}`)
        : null;

    return (
        <div className="container my-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                
                <Link to="/publicaciones" className="btn btn-outline-primary mb-4 shadow-sm">
                    <ArrowLeft size={20} className="me-2" />
                    Volver a Publicaciones
                </Link>

                <div className="card shadow-lg p-4 p-md-5 border-0" style={{ borderRadius: '20px' }}>
                    
                    <h1 className="mb-4 fw-bold" style={{ color: '#003366' }}>{publicacion.titulo}</h1>

                    <div className="row g-4">
                        {/* SECCIÓN IZQUIERDA: Portada y Botón */}
                        <div className="col-12 col-md-4 text-center">
                            <div className="mb-4 shadow-sm rounded overflow-hidden border">
                                <img 
                                    src={portadaSrc} 
                                    alt={publicacion.titulo}
                                    className="img-fluid"
                                    style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = '/placeholder-book-detail.svg'; }}
                                />
                            </div>
                            
                            {linkDescarga && (
                                <a 
                                    href={linkDescarga} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-lg w-100 shadow-sm d-flex align-items-center justify-content-center py-3"
                                >
                                    <Download size={22} className="me-2" /> 
                                    Descargar Material
                                </a>
                            )}
                        </div>

                        {/* SECCIÓN DERECHA: Información */}
                        <div className="col-12 col-md-8">
                            <div className="bg-light p-4 rounded mb-4">
                                <h4 className="mb-3 border-bottom pb-2">Información Académica</h4>
                                <ul className="list-unstyled">
                                    <li className="mb-3 d-flex align-items-start">
                                        <User size={20} className="me-3 text-primary mt-1" />
                                        <div><strong>Autores:</strong><br/>{publicacion.autores || 'Equipo de Investigación'}</div>
                                    </li>
                                    <li className="mb-3 d-flex align-items-start">
                                        <Calendar size={20} className="me-3 text-primary mt-1" />
                                        <div><strong>Fecha de Publicación:</strong><br/>{formatDate(publicacion.fecha)}</div>
                                    </li>
                                    {publicacion.revista_congreso && (
                                        <li className="mb-3 d-flex align-items-start">
                                            <BookOpen size={20} className="me-3 text-primary mt-1" />
                                            <div><strong>Publicado en:</strong><br/>{publicacion.revista_congreso}</div>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <h4 className="fw-bold mb-3">Resumen</h4>
                            <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'justify' }}>
                                {publicacion.resumen || "No hay un resumen disponible para esta publicación."}
                            </p>
                        </div>
                    </div>

                    {/* Contenido Extra (si existe) */}
                    {publicacion.contenidoCompleto && (
                        <div className="mt-5 pt-4 border-top">
                            <h4 className="fw-bold mb-4">Detalles Adicionales</h4>
                            <div 
                                className="additional-content lh-lg"
                                dangerouslySetInnerHTML={{ __html: publicacion.contenidoCompleto }} 
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default DetallePublicacion;