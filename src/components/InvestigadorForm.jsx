// src/components/InvestigadorForm.jsx (VERSION OPTIMIZADA)

import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { AlertTriangle, Upload, User, X } from 'lucide-react'; 

const API_ENDPOINT = '/investigadores';
const SERVER_URL = 'https://matinales-chile-api.fly.dev';

const InvestigadorForm = ({ investigadorInicial, onSave, onClose }) => {
    const { post, put } = useApi();
    const isEditing = !!investigadorInicial;
    
    const [formData, setFormData] = useState({
        nombre: '',
        cargo: '',
        resenaCorta: '',
        resenaLarga: '',
        foto_url_actual: '', 
    });
    
    const [imageFile, setImageFile] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (investigadorInicial) {
            setFormData({
                nombre: investigadorInicial.nombre || '',
                cargo: investigadorInicial.cargo || '',
                resenaCorta: investigadorInicial.resenaCorta || '',
                resenaLarga: investigadorInicial.resenaLarga || '',
                foto_url_actual: investigadorInicial.foto_url || '',
            });
            
            // Lógica de previsualización robusta
            if (investigadorInicial.foto_url) {
                const fullUrl = investigadorInicial.foto_url.startsWith('http') 
                    ? investigadorInicial.foto_url 
                    : `${SERVER_URL}${investigadorInicial.foto_url}`;
                setPreviewUrl(fullUrl);
            }
        }
    }, [investigadorInicial]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Crea URL temporal local
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        // Usamos FormData para poder enviar el archivo binario de la imagen
        const dataToSend = new FormData();
        dataToSend.append('nombre', formData.nombre);
        dataToSend.append('cargo', formData.cargo);
        dataToSend.append('resenaCorta', formData.resenaCorta);
        dataToSend.append('resenaLarga', formData.resenaLarga);
        
        if (imageFile) {
            dataToSend.append('foto', imageFile); 
        }

        try {
            let response;
            const endpoint = isEditing ? `${API_ENDPOINT}/${investigadorInicial.id}` : API_ENDPOINT;
            
            // Enviamos el tercer parámetro como 'true' para indicar FormData al useApi
            if (isEditing) {
                response = await put(endpoint, dataToSend, true); 
            } else {
                response = await post(endpoint, dataToSend, true);
            }

            onSave(response); 
        } catch (err) {
            setError(err.message || 'Error al procesar la solicitud.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="row g-3">
            {error && (
                <div className="col-12">
                    <div className="alert alert-danger d-flex align-items-center">
                        <AlertTriangle size={20} className="me-2" />
                        {error}
                    </div>
                </div>
            )}

            <div className="col-md-8">
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre Completo *</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Juan Pérez" />
                </div>
                
                <div className="mb-3">
                    <label className="form-label fw-bold">Cargo / Rol en el Proyecto *</label>
                    <input type="text" className="form-control" name="cargo" placeholder="Ej: Investigador Principal" value={formData.cargo} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Reseña Corta</label>
                    <textarea className="form-control" name="resenaCorta" rows="2" value={formData.resenaCorta} onChange={handleChange} placeholder="Una oración que resuma su perfil..." />
                </div>
            </div>

            <div className="col-md-4 text-center">
                <label className="form-label fw-bold d-block">Imagen de Perfil</label>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <div className="position-relative border rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm mb-3" 
                         style={{ width: '160px', height: '160px', overflow: 'hidden' }}>
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                        ) : (
                            <User size={64} className="text-muted" />
                        )}
                    </div>
                    <label className="btn btn-outline-primary btn-sm px-4">
                        <Upload size={16} className="me-2" />
                        Subir Foto
                        <input type="file" className="d-none" name="foto" accept="image/*" onChange={handleFileChange} />
                    </label>
                    <small className="text-muted d-block mt-2">Formatos: JPG, PNG. Max 2MB</small>
                </div>
            </div>

            <div className="col-12">
                <label className="form-label fw-bold">Reseña Larga (Biografía)</label>
                <textarea className="form-control" name="resenaLarga" rows="4" value={formData.resenaLarga} onChange={handleChange} placeholder="Detalla su formación académica y experiencia..." />
            </div>

            <div className="col-12 border-top pt-3 mt-4 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light px-4 border" onClick={onClose} disabled={isSubmitting}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary px-5 shadow-sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (isEditing ? 'Actualizar Investigador' : 'Guardar Investigador')}
                </button>
            </div>
        </form>
    );
};

export default InvestigadorForm;