/// src/pages/AdminPublicacionesManagement.jsx (Integrado con useApi y Lógica de Actualización Optimizada)

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Download, BookOpen, Loader2, AlertTriangle, FileText } from 'lucide-react'; 
import PublicacionForm from '../components/PublicacionForm';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos useApi

const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINT = '/publicaciones'; // Endpoint usado por useApi

// Función para obtener la URL completa (para portada o archivo)
const getResourceUrl = (urlPath) => {
    if (!urlPath) return '/placeholder-book.svg'; 
    if (urlPath.startsWith('http')) {
        return urlPath;
    }
    return `${API_BASE_URL}${urlPath}`;
};

// Determina si el enlace es local (un archivo subido) o externo
const isLocalFile = (url) => url && !url.startsWith('http');

const AdminPublicacionesManagement = () => {
    // 🚨 Usamos los métodos de useApi
    const { get, remove } = useApi(); 
    
    const [publicaciones, setPublicaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [publicacionToEdit, setPublicacionToEdit] = useState(null); 
    
    // Función de Carga (Lectura) - Ahora usa useApi
    const fetchPublicaciones = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 🚨 Usar get(endpoint)
            const data = await get(API_ENDPOINT);
            setPublicaciones(data);
        } catch (err) {
            setError(err.message || 'Fallo al cargar las publicaciones.');
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        fetchPublicaciones();
    }, [fetchPublicaciones]);

    // --- FUNCIONES CRUD ---

    const handleCreate = () => {
        setPublicacionToEdit(null); // Modo Crear
        setIsModalOpen(true);
    };

    const handleEdit = (publicacion) => {
        setPublicacionToEdit(publicacion); // Modo Editar
        setIsModalOpen(true);
    };

    // 🚨 Función optimizada: Actualiza el estado local y cierra el modal
    const handleSave = (savedPublicacion) => {
        if (publicacionToEdit) {
            // Edición: Reemplazar el elemento editado
            setPublicaciones(prev => prev.map(p => 
                p.id === savedPublicacion.id ? savedPublicacion : p
            ));
        } else {
            // Creación: Añadir el nuevo elemento al inicio
            setPublicaciones(prev => [savedPublicacion, ...prev]);
        }
        setIsModalOpen(false); // Cerrar modal
        setPublicacionToEdit(null);
    };

    // Manejo de Eliminación (DELETE) - Ahora usa useApi
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta publicación? Esta acción es irreversible.")) {
            return;
        }

        try {
            // 🚨 Usar el método remove de useApi
            await remove(`${API_ENDPOINT}/${id}`); 
            
            // Eliminar de la lista en el cliente (actualización optimizada)
            setPublicaciones(prev => prev.filter(p => p.id !== id));

        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Fallo al eliminar: ${error.message}`);
        }
    };

    // --- RENDERIZADO CONDICIONAL ---

    if (isLoading) return (
        <div className="text-center p-5">
            <Loader2 size={36} className="text-info spin me-2" />
            <p className="mt-2">Cargando datos de publicaciones...</p>
        </div>
    );
    if (error) return (
        <div className="alert alert-danger p-4">
            <AlertTriangle size={24} className="me-2" />
            Error al cargar datos: {error}
            <button className="btn btn-sm btn-danger ms-3" onClick={fetchPublicaciones}>Reintentar</button>
        </div>
    );

    // --- RENDERIZADO PRINCIPAL ---

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <BookOpen size={32} className="me-3 text-info"/>
                    <h2 className="mb-0">Gestión de Publicaciones Científicas</h2>
                </div>
                <button onClick={handleCreate} className="btn btn-info text-white">
                    <PlusCircle size={20} className="me-2" />
                    Añadir Publicación
                </button>
            </div>

            {/* Tabla de Publicaciones */}
            <div className="card p-3 shadow-sm">
                <h5>Listado para Edición ({publicaciones.length} publicaciones)</h5>
                
                {publicaciones.length === 0 ? (
                    <div className="alert alert-info text-center mt-3">No se encontraron publicaciones.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mt-3 align-middle">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>Portada</th> 
                                    <th style={{ width: '30%' }}>Título</th>
                                    <th style={{ width: '20%' }}>Autores</th>
                                    <th style={{ width: '15%' }}>Fuente</th>
                                    <th style={{ width: '10%' }}>Fecha</th>
                                    <th style={{ width: '10%' }}>Archivo</th>
                                    <th style={{ width: '10%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publicaciones.map((pub) => (
                                    <tr key={pub.id}>
                                        {/* Celda de Portada */}
                                        <td>
                                            <img 
                                                src={getResourceUrl(pub.portada_url)} 
                                                alt={`Portada de ${pub.titulo}`}
                                                style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                                                className="img-thumbnail"
                                                onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-book.svg'; }}
                                            />
                                        </td>

                                        <td>{pub.titulo}</td>
                                        <td>{pub.autores}</td>
                                        <td>{pub.revista_congreso}</td>
                                        <td>{pub.fecha_publicacion ? new Date(pub.fecha_publicacion).toLocaleDateString('es-ES') : 'N/A'}</td>
                                        
                                        {/* Celda de Archivo */}
                                        <td>
                                            {pub.archivo_url ? (
                                                <span className={`badge ${isLocalFile(pub.archivo_url) ? 'bg-success' : 'bg-primary'}`}>
                                                    {isLocalFile(pub.archivo_url) ? 'Local' : 'Externo'}
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger">Sin Archivo</span>
                                            )}
                                        </td>

                                        <td>
                                            <div className="btn-group">
                                                {pub.archivo_url && (
                                                    <a 
                                                        href={getResourceUrl(pub.archivo_url)} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        title="Descargar/Ver Archivo"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                )}
                                                <button 
                                                    onClick={() => handleEdit(pub)} 
                                                    className="btn btn-sm btn-outline-warning mx-1"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(pub.id)} 
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL DEL FORMULARIO */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{publicacionToEdit ? 'Editar Publicación' : 'Añadir Nueva Publicación'}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Cerrar"></button>
                            </div>
                            <div className="modal-body">
                                <PublicacionForm 
                                    publicacionInicial={publicacionToEdit} 
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

export default AdminPublicacionesManagement;