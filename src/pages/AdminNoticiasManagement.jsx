import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Newspaper, Loader2, AlertTriangle } from 'lucide-react';
import NoticiaForm from '../components/NoticiaForm'; 
import { useApi } from '../hooks/useApi'; 

const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINT = '/noticias'; 

const getImageUrl = (urlPath) => {
    if (!urlPath) return '/placeholder-image.svg';
    if (urlPath.startsWith('http')) return urlPath;
    return `${API_BASE_URL}${urlPath}`; 
};

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
            setNoticias(data);
        } catch (err) {
            setError(err.message || 'Fallo al cargar las noticias.');
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        fetchNoticias();
    }, [fetchNoticias]);

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
            setNoticias(prev => prev.map(n => 
                n.id === savedNoticia.id ? savedNoticia : n
            ));
        } else {
            setNoticias(prev => [savedNoticia, ...prev]);
        }
        setIsModalOpen(false); 
        setNoticiaToEdit(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
            return;
        }
        try {
            await remove(`${API_ENDPOINT}/${id}`); 
            setNoticias(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Fallo al eliminar: ${error.message}`);
        }
    };

    if (isLoading) return (
        <div className="text-center p-5">
            <Loader2 size={36} className="text-warning spin me-2" />
            <p className="mt-2">Cargando datos de administración...</p>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger p-4">
            <AlertTriangle size={24} className="me-2" />
            Error al cargar datos: {error}
            <button className="btn btn-sm btn-danger ms-3" onClick={fetchNoticias}>Reintentar</button>
        </div>
    );

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <Newspaper size={32} className="me-3 text-warning"/>
                    <h2 className="mb-0">Gestión de Noticias</h2>
                </div>
                <button onClick={handleCreate} className="btn btn-warning">
                    <PlusCircle size={20} className="me-2" />
                    Añadir Noticia
                </button>
            </div>

            <div className="card p-3 shadow-sm border-0">
                <h5 className="mb-3">Listado para Edición ({noticias.length} elementos)</h5>
                
                {noticias.length === 0 ? (
                    <div className="alert alert-info text-center">No se encontraron noticias.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: '5%' }}>ID</th>
                                    <th style={{ width: '15%' }}>Imagen</th>
                                    <th style={{ width: '40%' }}>Título</th>
                                    <th style={{ width: '15%' }}>Fecha</th>
                                    <th style={{ width: '25%' }} className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {noticias.map((noticia) => (
                                    <tr key={noticia.id}>
                                        <td><span className="badge bg-light text-dark border">{noticia.id}</span></td>
                                        
                                        <td>
                                            <img 
                                                /* 🚨 CAMBIO 1: noticia.imagen en lugar de noticia.imagen_url */
                                                src={getImageUrl(noticia.imagen)} 
                                                alt={noticia.titulo}
                                                /* 🚨 CAMBIO 2: objectPosition 'top' para encuadrar caras */
                                                style={{ width: '80px', height: '50px', objectFit: 'cover', objectPosition: 'top' }}
                                                className="rounded border"
                                                onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.svg'; }}
                                            />
                                        </td>

                                        <td className="fw-bold text-truncate" style={{ maxWidth: '300px' }}>
                                            {noticia.titulo}
                                        </td>
                                        
                                        <td>
                                            {/* 🚨 CAMBIO 3: noticia.fecha en lugar de noticia.fecha_publicacion */}
                                            {noticia.fecha ? new Date(noticia.fecha).toLocaleDateString('es-ES') : 'N/A'}
                                        </td>

                                        <td className="text-end">
                                            <button 
                                                onClick={() => handleEdit(noticia)} 
                                                className="btn btn-sm btn-outline-dark me-2"
                                            >
                                                <Edit size={14} className="me-1"/> Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(noticia.id)} 
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                <Trash2 size={14} className="me-1"/> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-warning text-dark">
                                <h5 className="modal-title fw-bold">
                                    {noticiaToEdit ? '📝 Editar Noticia' : '✨ Añadir Nueva Noticia'}
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