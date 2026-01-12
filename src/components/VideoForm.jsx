// src/components/VideoForm.jsx (Integrado con useApi)

import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos el hook useApi
import { AlertTriangle } from 'lucide-react'; 

const API_ENDPOINT = '/videos'; // Endpoint base para useApi

const VideoForm = ({ videoInicial, onSave, onClose }) => {
    const { post, put } = useApi(); // Usamos los métodos del hook
    const isEditing = !!videoInicial;
    
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        url_embed: '', 
        fecha_publicacion: new Date().toISOString().substring(0, 10),
        miniatura_url_actual: videoInicial ? videoInicial.miniatura_url : '',
    });
    
    const [imageFile, setImageFile] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(videoInicial?.miniatura_url || null);
    const [error, setError] = useState(null); // Estado para errores

    useEffect(() => {
        if (videoInicial) {
            setFormData({
                titulo: videoInicial.titulo || '',
                descripcion: videoInicial.descripcion || '',
                url_embed: videoInicial.url_embed || '',
                fecha_publicacion: videoInicial.fecha_publicacion ? 
                    new Date(videoInicial.fecha_publicacion).toISOString().substring(0, 10) : 
                    new Date().toISOString().substring(0, 10),
                miniatura_url_actual: videoInicial.miniatura_url || '',
            });
            setPreviewUrl(videoInicial.miniatura_url || null);
        }
    }, [videoInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(videoInicial?.miniatura_url || null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const dataToSend = new FormData();

        // 1. Adjuntar los campos de texto
        dataToSend.append('titulo', formData.titulo);
        dataToSend.append('descripcion', formData.descripcion);
        dataToSend.append('url_embed', formData.url_embed);
        dataToSend.append('fecha_publicacion', formData.fecha_publicacion);

        // 2. Adjuntar el archivo de miniatura si existe
        if (imageFile) {
            // El nombre 'miniatura' debe coincidir con lo que espera el Back-end
            dataToSend.append('miniatura', imageFile); 
        } else if (isEditing) {
            // Señal para el BE: mantener la miniatura actual
            dataToSend.append('miniatura_url_actual', formData.miniatura_url_actual);
        }

        try {
            let response;
            const endpoint = isEditing ? `${API_ENDPOINT}/${videoInicial.id}` : API_ENDPOINT;
            
            // 🚨 Uso de useApi, enviando FormData y el flag 'true' para indicar que no es JSON
            if (isEditing) {
                response = await put(endpoint, dataToSend, true); 
            } else {
                response = await post(endpoint, dataToSend, true);
            }

            onSave(response.data || response); 
        } catch (err) {
            console.error('Fallo al guardar el video:', err);
            // El hook ya lanza un error con el mensaje de la API o genérico
            setError(err.message || 'Ocurrió un error al intentar guardar el video.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h3 className="mb-4">{isEditing ? 'Editar Video' : 'Subir Nuevo Video'}</h3>

            {error && (
                <div className="alert alert-danger d-flex align-items-center mb-3">
                    <AlertTriangle size={20} className="me-2" />
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Título *</label>
                <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">URL de YouTube/Vimeo (Embed) *</label>
                <input type="url" className="form-control" name="url_embed" value={formData.url_embed} onChange={handleChange} required />
                <div className="form-text">Debe ser la **URL completa** del video o el código de incrustación si el backend lo parsea.</div>
            </div>

            {/* CAMPO DE MINIATURA */}
            <div className="mb-4 p-3 border rounded">
                <label className="form-label fw-bold d-block">Miniatura/Portada del Video</label>
                
                {previewUrl && (
                    <div className="mb-2">
                        <img 
                            src={previewUrl} 
                            alt="Previsualización" 
                            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                            className="img-thumbnail"
                        />
                    </div>
                )}

                <input 
                    type="file" 
                    className="form-control" 
                    name="miniatura" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
                <div className="form-text">Sube una imagen para la miniatura del video.</div>
            </div>
            
            <div className="mb-3">
                <label className="form-label">Fecha de Publicación *</label>
                <input type="date" className="form-control" name="fecha_publicacion" value={formData.fecha_publicacion} onChange={handleChange} required />
            </div>
            
            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" name="descripcion" rows="4" value={formData.descripcion} onChange={handleChange}></textarea>
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Añadir Video')}
                </button>
            </div>
        </form>
    );
};

export default VideoForm;