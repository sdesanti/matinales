// src/components/NoticiaForm.jsx (OPTIMIZADO)

import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi'; 
import { AlertTriangle, Image as ImageIcon, X } from 'lucide-react'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_ENDPOINT = '/noticias'; 
const SERVER_URL = 'https://matinales-chile-api.fly.dev';

const NoticiaForm = ({ noticiaInicial, onSave, onClose }) => {
    const { post, put } = useApi();
    const isEditing = !!noticiaInicial;
    
    const [formData, setFormData] = useState({
        titulo: '',
        resumen: '', 
        contenidoCompleto: '', 
        fecha: new Date().toISOString().substring(0, 10),
    });
    
    const [imageFile, setImageFile] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null); 

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
            });
            
            if (noticiaInicial.imagen) {
                const fullUrl = noticiaInicial.imagen.startsWith('http') 
                    ? noticiaInicial.imagen 
                    : `${SERVER_URL}${noticiaInicial.imagen}`;
                setPreviewUrl(fullUrl);
            }
        }
    }, [noticiaInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, contenidoCompleto: content }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const dataToSend = new FormData();
        dataToSend.append('titulo', formData.titulo);
        dataToSend.append('resumen', formData.resumen);
        dataToSend.append('contenidoCompleto', formData.contenidoCompleto);
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
            onSave(response); 
        } catch (err) {
            setError(err.message || 'Error al guardar la noticia.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white">
            <div className="row">
                <div className="col-12 border-bottom pb-3 mb-4 d-flex justify-content-between align-items-center">
                    <h4 className="mb-0 fw-bold text-dark">
                        {isEditing ? '📝 Editar Artículo' : '✨ Nueva Publicación'}
                    </h4>
                    <span className="badge bg-light text-dark border">
                        {formData.fecha}
                    </span>
                </div>

                {error && (
                    <div className="col-12">
                        <div className="alert alert-danger d-flex align-items-center border-0 shadow-sm">
                            <AlertTriangle size={20} className="me-2" />
                            {error}
                        </div>
                    </div>
                )}

                <div className="col-md-8">
                    <div className="mb-3">
                        <label className="form-label fw-bold small text-uppercase">Título de la Noticia *</label>
                        <input type="text" className="form-control form-control-lg border-0 bg-light" name="titulo" value={formData.titulo} onChange={handleChange} required placeholder="Ej: Avances en la investigación matinal..." />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold small text-uppercase d-flex justify-content-between">
                            Resumen Ejecutivo *
                            <span className={formData.resumen.length > 240 ? 'text-danger' : 'text-muted'}>
                                {formData.resumen.length}/255
                            </span>
                        </label>
                        <textarea className="form-control border-0 bg-light" name="resumen" rows="2" value={formData.resumen} onChange={handleChange} required maxLength="255" placeholder="Breve introducción para la tarjeta de la noticia..."></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold small text-uppercase">Desarrollo de la Noticia</label>
                        <div className="quill-container border-0 rounded" style={{ background: '#f8f9fa' }}>
                            <ReactQuill 
                                theme="snow"
                                value={formData.contenidoCompleto}
                                onChange={handleEditorChange}
                                modules={modules}
                                style={{ height: '300px', marginBottom: '50px' }}
                                placeholder="Escribe aquí el contenido detallado..."
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase">Imagen de Portada</label>
                        <div className="border rounded p-2 text-center bg-light shadow-sm" style={{ minHeight: '200px' }}>
                            {previewUrl ? (
                                <div className="position-relative">
                                    <img src={previewUrl} alt="Preview" className="img-fluid rounded shadow-sm mb-2" style={{ maxHeight: '180px' }} />
                                    <label className="btn btn-sm btn-dark position-absolute top-0 end-0 m-1 opacity-75">
                                        Cambiar
                                        <input type="file" className="d-none" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                            ) : (
                                <label className="d-flex flex-column align-items-center justify-content-center py-5 cursor-pointer">
                                    <ImageIcon size={48} className="text-muted mb-2" />
                                    <span className="text-muted small">Haz clic para subir imagen</span>
                                    <input type="file" className="d-none" accept="image/*" onChange={handleFileChange} required={!isEditing} />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold small text-uppercase">Fecha Programada</label>
                        <input type="date" className="form-control border-0 bg-light" name="fecha" value={formData.fecha} onChange={handleChange} required />
                    </div>
                </div>

                <div className="col-12 border-top pt-4 mt-2 d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-light px-4" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                    <button type="submit" className="btn btn-warning px-5 fw-bold shadow-sm" disabled={isSubmitting}>
                        {isSubmitting ? 'Procesando...' : (isEditing ? 'Actualizar' : 'Publicar Ahora')}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NoticiaForm;