import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { AlertTriangle, FileText, Upload, Save, X } from 'lucide-react'; 

const API_ENDPOINT = '/publicaciones';
// Corregida la URL (tenías un "http://" de más)
const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

const PublicacionForm = ({ publicacionInicial, onSave, onClose }) => {
    const { post, put } = useApi();
    const isEditing = !!publicacionInicial;

    const [formData, setFormData] = useState({
        titulo: '',
        autores: '',
        resumen: '',
        urlDescarga: '', 
        fecha: new Date().toISOString().substring(0, 10),
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

            // Lógica de vista previa corregida
            if (publicacionInicial.imagen) {
                const thumb = publicacionInicial.imagen.startsWith('http') 
                    ? publicacionInicial.imagen 
                    : `${SERVER_BASE_URL}${publicacionInicial.imagen}`;
                setPreviewUrl(thumb);
            }
        }
    }, [publicacionInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePortadaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPortadaFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    
    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        setDocumentoFile(file);
        // Si sube un archivo, limpiamos el campo de URL externa para evitar confusiones
        if (file) setFormData(prev => ({ ...prev, urlDescarga: '' }));
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
        
        // 1. Manejo del PDF / URL
        if (documentoFile) {
            dataToSend.append('documento', documentoFile); 
        } else {
            // Enviamos la URL actual (sea link de Drive o ruta del servidor)
            dataToSend.append('urlDescarga', formData.urlDescarga || formData.documento_actual);
        }

        // 2. Manejo de la Portada
        if (portadaFile) {
            dataToSend.append('portada', portadaFile); 
        } else {
            dataToSend.append('imagen', formData.imagen_actual);
        }

        try {
            const endpoint = isEditing ? `${API_ENDPOINT}/${publicacionInicial.id}` : API_ENDPOINT;
            // IMPORTANTE: Pasamos 'true' como tercer argumento para indicar multipart/form-data
            const response = isEditing 
                ? await put(endpoint, dataToSend, true) 
                : await post(endpoint, dataToSend, true);

            onSave(response); 
        } catch (err) {
            setError(err.message || 'Error al guardar la publicación.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-2">
            {error && (
                <div className="alert alert-danger d-flex align-items-center">
                    <AlertTriangle size={20} className="me-2" />
                    {error}
                </div>
            )}

            <div className="row">
                {/* Columna Campos de Texto */}
                <div className="col-md-8">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Título de la Publicación</label>
                        <input type="text" className="form-control form-control-lg" name="titulo" value={formData.titulo} onChange={handleChange} required placeholder="Ej: Impacto de la IA en la Educación" />
                    </div>

                    <div className="row">
                        <div className="col-md-7 mb-3">
                            <label className="form-label fw-bold">Autores</label>
                            <input type="text" className="form-control" name="autores" value={formData.autores} onChange={handleChange} placeholder="Separados por comas" />
                        </div>
                        <div className="col-md-5 mb-3">
                            <label className="form-label fw-bold">Fecha de Publicación</label>
                            <input type="date" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Resumen Ejecutivo</label>
                        <textarea className="form-control" name="resumen" rows="6" value={formData.resumen} onChange={handleChange} placeholder="Escribe una breve descripción del contenido..."></textarea>
                    </div>
                </div>

                {/* Columna Archivos y Multimedia */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 bg-light mb-3">
                        <div className="card-body">
                            <label className="form-label fw-bold d-flex align-items-center">
                                <Upload size={18} className="me-2 text-primary"/> Portada
                            </label>
                            <div className="text-center mb-3">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="img-fluid rounded shadow-sm" style={{ maxHeight: '180px', border: '2px solid #dee2e6' }} />
                                ) : (
                                    <div className="py-5 border rounded bg-white text-muted">Sin imagen</div>
                                )}
                            </div>
                            <input type="file" className="form-control form-control-sm" accept="image/*" onChange={handlePortadaChange} />
                        </div>
                    </div>

                    <div className="card shadow-sm border-0 bg-light">
                        <div className="card-body">
                            <label className="form-label fw-bold d-flex align-items-center">
                                <FileText size={18} className="me-2 text-success"/> Documento (PDF)
                            </label>
                            
                            {/* Mostrar archivo actual */}
                            <div className="mb-2 small p-2 bg-white rounded border text-truncate">
                                <strong>Actual:</strong> {documentoFile ? documentoFile.name : (formData.documento_actual?.split('/').pop() || 'Ninguno')}
                            </div>

                            <input type="file" className="form-control form-control-sm mb-3" accept=".pdf" onChange={handleDocumentoChange} />
                            
                            <div className="separator mb-3 text-center"><small className="text-muted px-2 bg-light">O LINK EXTERNO</small></div>

                            <input 
                                type="url" 
                                className="form-control form-control-sm" 
                                name="urlDescarga" 
                                value={formData.urlDescarga} 
                                onChange={handleChange} 
                                placeholder="https://drive.google.com/..."
                                disabled={!!documentoFile}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex justify-content-between">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose} disabled={isSubmitting}>
                    <X size={18} className="me-1"/> Cancelar
                </button>
                <button type="submit" className="btn btn-primary px-5 shadow" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save size={18} className="me-1"/> {isEditing ? 'Actualizar' : 'Publicar'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default PublicacionForm;