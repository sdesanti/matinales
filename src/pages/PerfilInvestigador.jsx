// src/pages/PerfilInvestigador.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, Mail, Link as LinkIcon, BookOpen, Film } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi'; 

// URL Base limpia para las imágenes
const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev'; 

const PerfilInvestigador = () => {
    const { id } = useParams(); 
    const [investigador, setInvestigador] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('resena');

    const { get } = useApi(); // 🚨 Extraemos nuestro ayudante del Hook

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // 1. Cargamos los datos del investigador
                const invData = await get(`/investigadores/${id}`);
                setInvestigador(invData);

                // 2. Carga paralela de relacionados usando el Hook
                // Nota: El backend debe estar preparado para recibir estos filtros
                const [pubData, vidData] = await Promise.all([
                    get(`/publicaciones?autorId=${id}`),
                    get(`/videos?investigadorId=${id}`)
                ]);

                setPublicaciones(pubData || []);
                setVideos(vidData || []);
                
            } catch (err) {
                console.error("Error cargando perfil:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchData();
    }, [id, get]);

    // --- LÓGICA DE FOTO CORREGIDA ---
    const getFotoUrl = () => {
        if (!investigador || !investigador.foto) return '/placeholder-person.jpg';
        if (investigador.foto.startsWith('http')) return investigador.foto;
        
        const path = investigador.foto.startsWith('/') ? investigador.foto : `/${investigador.foto}`;
        return `${SERVER_BASE_URL}${path}`;
    };

    const renderVideoEmbed = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        const embedUrl = (match && match[2].length === 11) 
            ? `https://www.youtube.com/embed/${match[2]}` 
            : url.replace('http://', 'https://');
        return (
            <div className="ratio ratio-16x9">
                <iframe src={embedUrl} title="Video" allowFullScreen></iframe>
            </div>
        );
    };

    if (isLoading) return <div className="text-center p-5 mt-5"><div className="spinner-border text-primary"></div></div>;
    if (error || !investigador) return <div className="alert alert-danger m-5">Error: {error}</div>;

    return (
        <div className="container my-5">
            <Link to="/investigadores" className="btn btn-outline-primary mb-4">
                <ArrowLeft size={18} className="me-2" /> Volver
            </Link>

            <motion.div 
                className="card shadow-lg border-0 overflow-hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
                <div className="row g-0">
                    {/* Lateral Izquierdo */}
                    <div className="col-md-4 bg-light text-center p-4 border-end">
                        <img 
                            src={getFotoUrl()} 
                            alt={investigador.nombre}
                            className="rounded-circle img-thumbnail mb-3 shadow-sm"
                            style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/placeholder-person.jpg'; }}
                        />
                        <h3 className="fw-bold">{investigador.nombre}</h3>
                        <p className="text-muted">
                            <Briefcase size={16} className="me-1"/> 
                            {investigador.area_especializacion || investigador.cargo || 'Investigador'}
                        </p>
                        
                        <div className="text-start mt-4 bg-white p-3 rounded shadow-sm">
                            <h6 className="small fw-bold text-uppercase text-muted border-bottom pb-2">Contacto</h6>
                            {investigador.email && (
                                <p className="mb-2 small text-truncate">
                                    <Mail size={14} className="me-2 text-primary"/>{investigador.email}
                                </p>
                            )}
                            {investigador.url_perfil && (
                                <p className="mb-0 small">
                                    <LinkIcon size={14} className="me-2 text-primary"/>
                                    <a href={investigador.url_perfil} target="_blank" rel="noreferrer">Perfil Externo</a>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contenido Derecho */}
                    <div className="col-md-8 p-4 p-md-5">
                        <ul className="nav nav-pills mb-4">
                            {['resena', 'publicaciones', 'videos'].map(tab => (
                                <li className="nav-item" key={tab}>
                                    <button 
                                        className={`nav-link text-capitalize ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === 'publicaciones' && <BookOpen size={16} className="me-2"/>}
                                        {tab === 'videos' && <Film size={16} className="me-2"/>}
                                        {tab === 'resena' ? 'Reseña' : tab} 
                                        {tab !== 'resena' && ` (${tab === 'publicaciones' ? publicaciones.length : videos.length})`}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="tab-content">
                            {activeTab === 'resena' && (
                                <div 
                                    dangerouslySetInnerHTML={{ __html: investigador.resenaLarga || "Sin biografía disponible." }} 
                                    className="lh-lg text-secondary" 
                                />
                            )}
                            {activeTab === 'publicaciones' && (
                                <div className="list-group">
                                    {publicaciones.map(pub => (
                                        <div key={pub.id} className="list-group-item border-start border-primary border-4 mb-2 shadow-sm">
                                            <h6 className="fw-bold mb-1">{pub.titulo}</h6>
                                            <small className="text-muted">
                                                {pub.revista_congreso} ({pub.fecha ? new Date(pub.fecha).getFullYear() : 'S/F'})
                                            </small>
                                        </div>
                                    ))}
                                    {publicaciones.length === 0 && <p className="text-muted">No hay publicaciones registradas para este investigador.</p>}
                                </div>
                            )}
                            {activeTab === 'videos' && (
                                <div className="row g-3">
                                    {videos.map(vid => (
                                        <div key={vid.id} className="col-md-6">
                                            <div className="card h-100 shadow-sm border-0">
                                                {renderVideoEmbed(vid.url_embed)}
                                                <div className="card-body p-2 fw-bold small">{vid.titulo}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {videos.length === 0 && <p className="text-muted">No hay videos relacionados.</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PerfilInvestigador;