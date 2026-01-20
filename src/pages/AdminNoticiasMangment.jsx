// src/pages/AdminNoticiasManagement.jsx (LÓGICA CRUD OPTIMIZADA)

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Newspaper, Loader2, AlertTriangle } from 'lucide-react';
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
    
    // Función de carga estable con useCallback
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

    // --- MANEJO DE EVENTOS ---

    const handleCreate = () => {
        setNoticiaToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (noticia) => {
        setNoticiaToEdit(noticia);
        setIsModalOpen(true);
    };

    const handleSave = (savedNoticia) => {
        if (noticiaToEdit) {
            // Actualización local para evitar re-fetch
            setNoticias(prev => prev.map(n => n.id === savedNoticia.id ? savedNoticia : n));
        } else {
            // Inserción al inicio de la lista
            setNoticias(prev => [savedNoticia, ...prev]);
        }
        setIsModalOpen(false); 
        setNoticiaToEdit(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;

        try {
            await remove(`${API_ENDPOINT}/${id}`); 
            setNoticias(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            alert(`Fallo al eliminar: ${error.message}`);
        }
    };

    // --- UI HELPER ---
    const getImageUrl = (path) => {
        if (!path) return '/placeholder-news.svg';
        return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    };

    if (isLoading) return (
        <div className="text-center p-5">
            <Loader2 size={40} className="text-primary animate-spin mx-auto mb-2" />
            <p>Cargando panel de noticias...</p>
        </div>
    );

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <Newspaper size={32} className="me-3 text-primary"/>
                    <h2 className="mb-0 fw-bold">Gestión de Noticias</h2>
                </div>
                <button onClick={handleCreate} className="btn btn-primary shadow-sm">
                    <PlusCircle size={20} className="me-2" />
                    Nueva Noticia
                </button>
            </div>

            {error && (
                <div className="alert alert-danger d-flex align-items-center">
                    <AlertTriangle size={20} className="me-2" />
                    {error}
                    <button className="btn btn-sm btn-outline-danger ms-auto" onClick={fetchNoticias}>Reintentar</button>
                </div>
            )}

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">Imagen</th>
                                <th>Título</th>
                                <th>Fecha Publicación</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-4">No hay noticias registradas.</td></tr>
                            ) : (
                                noticias.map((noticia) => (
                                    <tr key={noticia.id}>
                                        <td className="ps-4">
                                            <img 
                                                src={getImageUrl(noticia.imagen)} 
                                                alt="" 
                                                className="rounded border shadow-sm"
                                                style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                                onError={(e) => e.target.src = '/placeholder-news.svg'}
                                            />
                                        </td>
                                        <td className="fw-medium text-dark">{noticia.titulo}</td>
                                        <td className="text-muted">
                                            {noticia.fecha ? new Date(noticia.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : 'S/F'}
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group shadow-sm">
                                                <button onClick={() => handleEdit(noticia)} className="btn btn-sm btn-white border" title="Editar">
                                                    <Edit size={16} className="text-warning" />
                                                </button>
                                                <button onClick={() => handleDelete(noticia.id)} className="btn btn-sm btn-white border" title="Eliminar">
                                                    <Trash2 size={16} className="text-danger" />
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

            {/* Modal de Formulario */}
            {isModalOpen && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title fw-bold">
                                    {noticiaToEdit ? 'Editar Noticia' : 'Añadir Nueva Noticia'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body p-0">
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