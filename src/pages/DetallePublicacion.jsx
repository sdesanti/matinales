import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowLeft, Download, Link as LinkIcon } from 'lucide-react'; 
import { motion } from 'framer-motion';

const API_BASE_URL = 'http://localhost:3001';

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

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/publicaciones/${id}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error("Publicación no encontrada");
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setPublicacion(data);
            } catch (err) {
                console.error("Fallo al cargar la publicación:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPublicacion();
    }, [id]);

    if (isLoading) return <div className="text-center p-5">Cargando publicación...</div>;
    if (error) return <div className="alert alert-danger text-center p-4 m-5">Error: {error}</div>;
    if (!publicacion) return <div className="text-center p-5">La publicación no existe.</div>;

    // --- MEJORA: Lógica de URLs centralizada ---
    const portadaSrc = publicacion.imagen 
        ? `${API_BASE_URL}${publicacion.imagen}` 
        : '/placeholder-book-detail.svg';

    const linkDescarga = publicacion.urlDescarga 
        ? (publicacion.urlDescarga.startsWith('http') ? publicacion.urlDescarga : `${API_BASE_URL}${publicacion.urlDescarga}`)
        : null;

    return (
        <div className="container my-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                
                <Link to="/publicaciones" className="btn btn-outline-primary mb-4">
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
                                />
                            </div>
                            
                            {linkDescarga && (
                                <a 
                                    href={linkDescarga} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-lg w-100 shadow-sm d-flex align-items-center justify-content-center"
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
                                    <li className="mb-3 d-flex align-items-center">
                                        <User size={20} className="me-3 text-primary" />
                                        <div><strong>Autores:</strong><br/>{publicacion.autores || 'Equipo de Investigación'}</div>
                                    </li>
                                    <li className="mb-3 d-flex align-items-center">
                                        <Calendar size={20} className="me-3 text-primary" />
                                        <div><strong>Fecha de Publicación:</strong><br/>{formatDate(publicacion.fecha)}</div>
                                    </li>
                                    {publicacion.revista_congreso && (
                                        <li className="mb-3 d-flex align-items-center">
                                            <BookOpen size={20} className="me-3 text-primary" />
                                            <div><strong>Publicado en:</strong><br/>{publicacion.revista_congreso}</div>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <h4 className="fw-bold mb-3">Resumen</h4>
                            <p className="lead text-muted text-justify" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                                {publicacion.resumen}
                            </p>
                        </div>
                    </div>

                    {/* Contenido Extra (si existe) */}
                    {publicacion.contenidoCompleto && (
                        <div className="mt-5 pt-4 border-top">
                            <h4 className="fw-bold mb-4">Detalles Adicionales</h4>
                            <div 
                                className="additional-content"
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