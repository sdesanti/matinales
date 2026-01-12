import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, Mail, Link as LinkIcon, BookOpen, Film } from 'lucide-react'; 
import { motion } from 'framer-motion';

const API_BASE_URL = 'http://localhost:3001'; 

const PerfilInvestigador = () => {
    const { id } = useParams(); 
    const [investigador, setInvestigador] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('resena');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const invResponse = await fetch(`${API_BASE_URL}/api/investigadores/${id}`);
                if (!invResponse.ok) throw new Error("Investigador no encontrado");
                const invData = await invResponse.json();
                setInvestigador(invData);

                // Carga paralela de relacionados
                const [pubRes, vidRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/publicaciones?autorId=${id}`),
                    fetch(`${API_BASE_URL}/api/videos?investigadorId=${id}`)
                ]);

                if (pubRes.ok) setPublicaciones(await pubRes.json());
                if (vidRes.ok) setVideos(await vidRes.json());
                
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    // --- LÓGICA DE FOTO CORREGIDA ---
    const getFotoUrl = () => {
        if (!investigador || !investigador.foto) return '/placeholder-person.jpg';
        
        // Si la URL ya es completa (empieza con http), la usamos tal cual
        if (investigador.foto.startsWith('http')) return investigador.foto;
        
        // Si la ruta no tiene la barra inicial, se la agregamos para evitar http://localhost:3001uploads/...
        const path = investigador.foto.startsWith('/') 
            ? investigador.foto 
            : `/${investigador.foto}`;
            
        return `${API_BASE_URL}${path}`;
    };

    const renderVideoEmbed = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        const embedUrl = (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
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
                            onError={(e) => { e.target.src = '/placeholder-person.jpg'; }} // Fallback si la imagen falla
                        />
                        <h3 className="fw-bold">{investigador.nombre}</h3>
                        <p className="text-muted"><Briefcase size={16} className="me-1"/> {investigador.area_especializacion || investigador.cargo}</p>
                        
                        <div className="text-start mt-4 bg-white p-3 rounded shadow-sm">
                            <h6 className="small fw-bold text-uppercase text-muted border-bottom pb-2">Contacto</h6>
                            {investigador.email && (
                                <p className="mb-2 small text-truncate"><Mail size={14} className="me-2 text-primary"/>{investigador.email}</p>
                            )}
                            {investigador.url_perfil && (
                                <p className="mb-0 small"><LinkIcon size={14} className="me-2 text-primary"/><a href={investigador.url_perfil} target="_blank" rel="noreferrer">Perfil Externo</a></p>
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
                                        {tab} {tab !== 'resena' && `(${tab === 'publicaciones' ? publicaciones.length : videos.length})`}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="tab-content">
                            {activeTab === 'resena' && (
                                <div dangerouslySetInnerHTML={{ __html: investigador.resenaLarga || "Sin biografía." }} className="lh-lg text-secondary" />
                            )}
                            {activeTab === 'publicaciones' && (
                                <div className="list-group">
                                    {publicaciones.map(pub => (
                                        <div key={pub.id} className="list-group-item border-start border-primary border-4 mb-2 shadow-sm">
                                            <h6 className="fw-bold mb-1">{pub.titulo}</h6>
                                            <small className="text-muted">{pub.revista_congreso} ({new Date(pub.fecha_publicacion).getFullYear()})</small>
                                        </div>
                                    ))}
                                    {publicaciones.length === 0 && <p className="text-muted">No hay publicaciones.</p>}
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
                                    {videos.length === 0 && <p className="text-muted">No hay videos.</p>}
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