// src/pages/AdminNoticiasManagement.jsx (OPTIMIZADO)

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Newspaper, Loader2, AlertTriangle, Calendar } from 'lucide-react';
import NoticiaForm from '../components/NoticiaForm'; 
import { useApi } from '../hooks/useApi'; 

const API_BASE_URL = 'https://matinales-chile-api.fly.dev';
const API_ENDPOINT = '/noticias'; 

const AdminNoticiasManagement = () => {
    const { get, remove } = useApi(); 
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noticiaToEdit, setNoticiaToEdit] = useState(null); 

    const fetchNoticias = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await get(API_ENDPOINT);
            setNoticias(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Fallo al cargar las noticias.');
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        fetchNoticias();
    }, [fetchNoticias]);

    const getImageUrl = (path) => {
        if (!path) return '/placeholder-news.svg';
        if (path.startsWith('http')) return path;
        return `${API_BASE_URL}${path}`;
    };

    const handleSave = (savedNoticia) => {
        if (noticiaToEdit) {
            setNoticias(prev => prev.map(n => n.id === savedNoticia.id ? savedNoticia : n));
        } else {
            setNoticias(prev => [savedNoticia, ...prev]);
        }
        setIsModalOpen(false); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;
        try {
            await remove(`${API_ENDPOINT}/${id}`); 
            setNoticias(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            alert(`Error al eliminar: ${error.message}`);
        }
    };

    if (isLoading) return (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <Loader2 size={40} className="text-warning animate-spin mb-3" />
            <p className="text-muted fw-medium">Sincronizando portal de noticias...</p>
        </div>
    );

    return (
        <div className="container-fluid p-4">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <div className="bg-warning bg-opacity-10 p-2 rounded me-3">
                        <Newspaper size={28} className="text-warning"/>
                    </div>
                    <h2 className="h3 mb-0 fw-bold">Gestión de Noticias</h2>
                </div>
                <button onClick={() => { setNoticiaToEdit(null); setIsModalOpen(true); }} className="btn btn-warning shadow-sm fw-bold">
                    <PlusCircle size={18} className="me-2" />
                    Publicar Noticia
                </button>
            </header>

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-muted small text-uppercase">
                            <tr>
                                <th className="ps-4">Imagen</th>
                                <th>Contenido</th>
                                <th>Fecha Pub.</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-5 text-muted">No hay noticias publicadas.</td></tr>
                            ) : (
                                noticias.map((n) => (
                                    <tr key={n.id}>
                                        <td className="ps-4">
                                            <img 
                                                src={getImageUrl(n.imagen)} 
                                                alt=""
                                                style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                                                className="rounded shadow-sm border"
                                                onError={(e) => { e.target.src = '/placeholder-news.svg'; }}
                                            />
                                        </td>
                                        <td>
                                            <div className="fw-bold text-dark text-truncate" style={{ maxWidth: '400px' }}>{n.titulo}</div>
                                            <small className="text-muted">ID: #{n.id}</small>
                                        </td>
                                        <td>
                                            <span className="d-flex align-items-center text-muted small">
                                                <Calendar size={14} className="me-1" />
                                                {n.fecha ? new Date(n.fecha).toLocaleDateString('es-CL') : 'Sin fecha'}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group">
                                                <button onClick={() => handleEdit(n)} className="btn btn-sm btn-white border shadow-sm me-2">
                                                    <Edit size={14} className="text-primary" />
                                                </button>
                                                <button onClick={() => handleDelete(n.id)} className="btn btn-sm btn-white border shadow-sm">
                                                    <Trash2 size={14} className="text-danger" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal d-block" style={{ zIndex: 1060 }}>
                    <div className="modal-backdrop fade show position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: -1, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setIsModalOpen(false)}></div>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-dark text-white border-0">
                                <h5 className="modal-title fw-bold">{noticiaToEdit ? 'Editar Artículo' : 'Nuevo Artículo Periodístico'}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body p-4 bg-light">
                                <NoticiaForm 
                                    noticiaInicial={noticiaToEdit} 
                                    onSave={handleSave} 
                                    onClose={() => setIsModalOpen(false)} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNoticiasManagement;