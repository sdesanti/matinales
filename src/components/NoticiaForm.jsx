// src/components/NoticiaForm.jsx (CON EDITOR DE TEXTO ENRIQUECIDO)

import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi'; 
import { AlertTriangle } from 'lucide-react'; 
// 1. Importar Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_ENDPOINT = '/noticias'; 

const NoticiaForm = ({ noticiaInicial, onSave, onClose }) => {
    const { post, put } = useApi();
    const isEditing = !!noticiaInicial;
    
    const [formData, setFormData] = useState({
        titulo: '',
        resumen: '', 
        contenidoCompleto: '', 
        fecha: new Date().toISOString().substring(0, 10),
        imagen_url_actual: noticiaInicial ? noticiaInicial.imagen : '',
    });
    
    const [imageFile, setImageFile] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(noticiaInicial?.imagen || null);
    const [error, setError] = useState(null); 

    // 2. Configuración de módulos para el editor
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    useEffect(() => {
        if (noticiaInicial) {
            setFormData({
                titulo: noticiaInicial.titulo || '',
                resumen: noticiaInicial.resumen || '',
                contenidoCompleto: noticiaInicial.contenidoCompleto || '', 
                fecha: noticiaInicial.fecha ? 
                    new Date(noticiaInicial.fecha).toISOString().substring(0, 10) : 
                    new Date().toISOString().substring(0, 10),
                imagen_url_actual: noticiaInicial.imagen || '',
            });
            setPreviewUrl(noticiaInicial.imagen || null);
        }
    }, [noticiaInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Manejador específico para el cambio en el editor Quill
    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, contenidoCompleto: content }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(noticiaInicial?.imagen || null);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const dataToSend = new FormData();
        dataToSend.append('titulo', formData.titulo);
        dataToSend.append('resumen', formData.resumen);
        dataToSend.append('contenidoCompleto', formData.contenidoCompleto); // Envía el HTML generado
        dataToSend.append('fecha', formData.fecha);
        
        if (imageFile) {
            dataToSend.append('imagen', imageFile);
        } 
        
        try {
            let response;
            const endpoint = isEditing ? `${API_ENDPOINT}/${noticiaInicial.id}` : API_ENDPOINT;
            
            if (isEditing) {
                response = await put(endpoint, dataToSend, true); 
            } else {
                response = await post(endpoint, dataToSend, true);
            }

            onSave(response.data || response); 
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al guardar.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h3 className="mb-4">{isEditing ? 'Editar Noticia' : 'Crear Nueva Noticia'}</h3>

            {error && (
                <div className="alert alert-danger d-flex align-items-center mb-3">
                    <AlertTriangle size={20} className="me-2" />
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label fw-bold">Título *</label>
                <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </div>
            
            <div className="mb-3">
                <label className="form-label fw-bold">Resumen * (Máx. 255 car.)</label>
                <textarea className="form-control" name="resumen" rows="2" value={formData.resumen} onChange={handleChange} required></textarea>
            </div>
            
            {/* 4. Implementación del Editor Quill */}
            <div className="mb-3">
                <label className="form-label fw-bold">Contenido Completo</label>
                <div style={{ background: 'white' }}>
                    <ReactQuill 
                        theme="snow"
                        value={formData.contenidoCompleto}
                        onChange={handleEditorChange}
                        modules={modules}
                        style={{ height: '250px', marginBottom: '45px' }}
                        placeholder="Escribe el desarrollo de la noticia aquí..."
                    />
                </div>
                <div className="form-text">Usa el editor para dar formato al cuerpo de la nota.</div>
            </div>
            
            <div className="mb-4 p-3 border rounded bg-light">
                <label className="form-label fw-bold d-block text-warning">Imagen Principal</label>
                
                {previewUrl && (
                    <div className="mb-3 position-relative d-inline-block">
                        <img 
                            src={previewUrl.startsWith('/') ? `http://localhost:3001${previewUrl}` : previewUrl} 
                            alt="Previsualización" 
                            style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '5px' }} 
                            className="img-thumbnail"
                        />
                        {imageFile && (
                            <button 
                                type="button" 
                                className="btn-close bg-danger rounded-circle position-absolute top-0 end-0 m-1" 
                                onClick={() => { setImageFile(null); setPreviewUrl(noticiaInicial?.imagen || null); }}
                            ></button>
                        )}
                    </div>
                )}

                <input 
                    type="file" 
                    className="form-control" 
                    name="imagen" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    required={!isEditing && !formData.imagen_url_actual} 
                />
            </div>
            
            <div className="mb-3">
                <label className="form-label fw-bold">Fecha de Publicación *</label>
                <input type="date" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} required />
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Noticia')}
                </button>
            </div>
        </form>
    );
};

export default NoticiaForm;