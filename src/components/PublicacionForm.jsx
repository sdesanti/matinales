// src/components/PublicacionForm.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { AlertTriangle, FileText, Upload } from 'lucide-react'; 

const API_ENDPOINT = '/publicaciones';

const PublicacionForm = ({ publicacionInicial, onSave, onClose }) => {
    const { post, put } = useApi();
    const isEditing = !!publicacionInicial;

    const [formData, setFormData] = useState({
        titulo: '',
        autores: '',
        resumen: '', // Cambiado de 'descripcion' a 'resumen'
        urlDescarga: '', // Cambiado de 'enlace_descarga' a 'urlDescarga'
        fecha: new Date().toISOString().substring(0, 10), // Cambiado de 'fecha_publicacion' a 'fecha'
        imagen_actual: '', 
        documento_actual: '', 
    });
    
    const [portadaFile, setPortadaFile] = useState(null); 
    const [documentoFile, setDocumentoFile] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (publicacionInicial) {
            setFormData({
                titulo: publicacionInicial.titulo || '',
                autores: publicacionInicial.autores || '',
                resumen: publicacionInicial.resumen || '',
                urlDescarga: publicacionInicial.urlDescarga || '',
                fecha: publicacionInicial.fecha ? 
                    new Date(publicacionInicial.fecha).toISOString().substring(0, 10) : 
                    new Date().toISOString().substring(0, 10),
                imagen_actual: publicacionInicial.imagen || '',
                documento_actual: publicacionInicial.urlDescarga || '',
            });
            // Si la imagen actual no es externa, le ponemos el prefijo del servidor para la miniatura
            const thumb = publicacionInicial.imagen 
                ? (publicacionInicial.imagen.startsWith('http') ? publicacionInicial.imagen : `http://localhost:3001${publicacionInicial.imagen}`)
                : null;
            setPreviewUrl(thumb);
        }
    }, [publicacionInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePortadaChange = (e) => {
        const file = e.target.files[0];
        setPortadaFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(formData.imagen_actual ? `http://localhost:3001${formData.imagen_actual}` : null);
        }
    };
    
    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        setDocumentoFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const dataToSend = new FormData();
        dataToSend.append('titulo', formData.titulo);
        dataToSend.append('autores', formData.autores);
        dataToSend.append('resumen', formData.resumen);
        dataToSend.append('fecha', formData.fecha);
        
        // Manejo del PDF / Enlace
        if (documentoFile) {
            dataToSend.append('documento', documentoFile); 
        } else {
            // Si no hay archivo nuevo, enviamos lo que haya en el campo de texto (URL Drive)
            // o el valor actual para no perderlo
            dataToSend.append('urlDescarga', formData.urlDescarga || formData.documento_actual);
        }

        // Manejo de la Portada
        if (portadaFile) {
            dataToSend.append('portada', portadaFile); 
        } else {
            dataToSend.append('imagen', formData.imagen_actual);
        }

        try {
            let response;
            const endpoint = isEditing ? `${API_ENDPOINT}/${publicacionInicial.id}` : API_ENDPOINT;
            
            if (isEditing) {
                response = await put(endpoint, dataToSend, true); 
            } else {
                response = await post(endpoint, dataToSend, true);
            }

            onSave(response.data || response); 
        } catch (err) {
            setError(err.message || 'Error al guardar.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h3 className="mb-4 text-primary">{isEditing ? '📝 Editar Publicación' : '📚 Nueva Publicación'}</h3>

            {error && <div className="alert alert-danger"><AlertTriangle size={20} className="me-2" />{error}</div>}

            <div className="mb-3">
                <label className="form-label fw-bold">Título *</label>
                <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </div>
            
            <div className="row">
                <div className="col-md-8 mb-3">
                    <label className="form-label fw-bold">Autores</label>
                    <input type="text" className="form-control" name="autores" value={formData.autores} onChange={handleChange} placeholder="Ej: Juan Pérez, María García" />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Fecha *</label>
                    <input type="date" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Resumen / Descripción</label>
                <textarea className="form-control" name="resumen" rows="4" value={formData.resumen} onChange={handleChange}></textarea>
            </div>
            
            <hr/>
            
            <div className="row g-4">
                {/* PORTADA */}
                <div className="col-md-6">
                    <div className="card h-100 bg-light border-dashed">
                        <div className="card-body text-center">
                            <label className="form-label fw-bold d-block mb-3">Imagen de Portada</label>
                            {previewUrl && (
                                <img src={previewUrl} alt="Preview" className="img-thumbnail mb-3" style={{ height: '120px', objectFit: 'cover' }} />
                            )}
                            <input type="file" className="form-control" accept="image/*" onChange={handlePortadaChange} />
                        </div>
                    </div>
                </div>

                {/* DOCUMENTO */}
                <div className="col-md-6">
                    <div className="card h-100 bg-light">
                        <div className="card-body">
                            <label className="form-label fw-bold d-block mb-3">Archivo PDF o Documento</label>
                            <div className="p-2 border rounded bg-white mb-2 small text-truncate text-muted">
                                <FileText size={16} className="me-2" />
                                {documentoFile ? documentoFile.name : (formData.documento_actual || 'Sin archivo')}
                            </div>
                            <input type="file" className="form-control mb-3" accept=".pdf,.doc,.docx" onChange={handleDocumentoChange} />
                            
                            <label className="form-label small fw-bold">O Link externo (Drive/Dropbox)</label>
                            <input 
                                type="url" 
                                className="form-control form-control-sm" 
                                name="urlDescarga" 
                                value={documentoFile ? '' : formData.urlDescarga} 
                                onChange={handleChange} 
                                disabled={!!documentoFile}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                <button type="button" className="btn btn-light me-2" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Confirmar Guardado'}
                </button>
            </div>
        </form>
    );
};

export default PublicacionForm;