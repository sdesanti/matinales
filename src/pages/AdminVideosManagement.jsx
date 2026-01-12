// src/pages/AdminVideosManagement.jsx (Integrado con useApi y Lógica de Actualización Optimizada)

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, PlayCircle, Youtube, Loader2, AlertTriangle } from 'lucide-react'; 
import VideoForm from '../components/VideoForm';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos useApi

// Nota: La URL base de la API se gestiona internamente en useApi
const API_ENDPOINT = '/videos'; 

// Función para extraer el ID de YouTube de la URL y generar la URL del thumbnail
const getYoutubeThumbnailUrl = (urlEmbed) => {
    if (!urlEmbed) return '/placeholder-video.svg'; // Placeholder por defecto
    
    // Regex para extraer el ID de YouTube de varios formatos de URL
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = urlEmbed.match(regex);
    
    const videoId = match ? match[1] : null;
    
    if (videoId) {
        // Retorna la miniatura de alta calidad (hqdefault)
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    // Si no es un enlace de YouTube reconocido, usa el placeholder
    return '/placeholder-video.svg';
};


const AdminVideosManagement = () => {
    // 🚨 Usamos los métodos de useApi
    const { get, remove } = useApi(); 
    
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoToEdit, setVideoToEdit] = useState(null); 
    
    // Función de Carga (Lectura) - Ahora usa useApi
    const fetchVideos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 🚨 Usar get(endpoint)
            const data = await get(API_ENDPOINT);
            setVideos(data);
        } catch (err) {
            setError(err.message || 'Fallo al cargar los videos.');
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    // --- FUNCIONES CRUD ---
    const handleCreate = () => {
        setVideoToEdit(null); // Modo Crear
        setIsModalOpen(true);
    };

    const handleEdit = (video) => {
        setVideoToEdit(video); // Modo Editar
        setIsModalOpen(true);
    };

    // 🚨 Función optimizada: Actualiza el estado local y cierra el modal
    const handleSave = (savedVideo) => {
        if (videoToEdit) {
            // Edición: Reemplazar el elemento editado
            setVideos(prev => prev.map(v => 
                v.id === savedVideo.id ? savedVideo : v
            ));
        } else {
            // Creación: Añadir el nuevo elemento al inicio
            setVideos(prev => [savedVideo, ...prev]);
        }
        setIsModalOpen(false); // Cerrar modal
        setVideoToEdit(null);
    };

    // Manejo de Eliminación (DELETE) - Ahora usa useApi
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este video? Esta acción es irreversible.")) {
            return;
        }

        try {
            // 🚨 Usar el método remove de useApi
            await remove(`${API_ENDPOINT}/${id}`); 
            
            // Eliminar de la lista en el cliente (actualización optimizada)
            setVideos(prev => prev.filter(v => v.id !== id));

        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Fallo al eliminar: ${error.message}`);
        }
    };

    // --- RENDERIZADO CONDICIONAL ---

    if (isLoading) return (
        <div className="text-center p-5">
            <Loader2 size={36} className="text-warning spin me-2" />
            <p className="mt-2">Cargando datos de videos...</p>
        </div>
    );
    if (error) return (
        <div className="alert alert-danger p-4">
            <AlertTriangle size={24} className="me-2" />
            Error al cargar datos: {error}
            <button className="btn btn-sm btn-danger ms-3" onClick={fetchVideos}>Reintentar</button>
        </div>
    );

    // --- RENDERIZADO PRINCIPAL ---

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <PlayCircle size={32} className="me-3 text-warning"/>
                    <h2 className="mb-0">Gestión de Videos</h2>
                </div>
                <button onClick={handleCreate} className="btn btn-warning text-white">
                    <PlusCircle size={20} className="me-2" />
                    Añadir Video
                </button>
            </div>

            {/* Tabla de Videos */}
            <div className="card p-3 shadow-sm">
                <h5>Listado para Edición ({videos.length} videos)</h5>
                
                {videos.length === 0 ? (
                    <div className="alert alert-info text-center mt-3">No se encontraron videos.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mt-3 align-middle">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>Miniatura</th> 
                                    <th style={{ width: '35%' }}>Título</th>
                                    <th style={{ width: '15%' }}>Fecha</th>
                                    <th style={{ width: '20%' }}>URL Embed</th>
                                    <th style={{ width: '15%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videos.map((video) => (
                                    <tr key={video.id}>
                                        {/* Celda de Miniatura */}
                                        <td>
                                            <img 
                                                src={getYoutubeThumbnailUrl(video.url_embed)} 
                                                alt={video.titulo}
                                                style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                                                className="img-thumbnail"
                                                // Manejo de error para usar el placeholder si la miniatura de YouTube falla
                                                onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-video.svg'; }}
                                            />
                                        </td>

                                        <td>{video.titulo}</td>
                                        <td>{video.fecha_publicacion ? new Date(video.fecha_publicacion).toLocaleDateString('es-ES') : 'N/A'}</td>
                                        <td>
                                            <a href={video.url_embed} target="_blank" rel="noopener noreferrer" className="text-truncate" style={{maxWidth: '200px', display: 'block'}}>
                                                {video.url_embed}
                                            </a>
                                            {/* Indicador visual de YouTube */}
                                            {video.url_embed && (video.url_embed.includes('youtube.com') || video.url_embed.includes('youtu.be')) && (
                                                <Youtube size={16} className="text-danger ms-1"/>
                                            )}
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button 
                                                    onClick={() => handleEdit(video)} 
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(video.id)} 
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
                                <h5 className="modal-title">{videoToEdit ? 'Editar Video' : 'Añadir Nuevo Video'}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Cerrar"></button>
                            </div>
                            <div className="modal-body">
                                <VideoForm 
                                    videoInicial={videoToEdit} 
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

export default AdminVideosManagement;