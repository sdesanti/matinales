// src/components/InvestigadorForm.jsx (Código Corregido y Sincronizado)

import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { AlertTriangle } from 'lucide-react'; 

const API_ENDPOINT = '/investigadores';

const InvestigadorForm = ({ investigadorInicial, onSave, onClose }) => {
    const { post, put } = useApi();
    const isEditing = !!investigadorInicial;
    
    const [formData, setFormData] = useState({
        nombre: '',
        cargo: '', // Sincronizado con DB
        resenaCorta: '', // Sincronizado con DB
        resenaLarga: '', // Sincronizado con DB
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
                foto_url_actual: investigadorInicial.foto || '',
            });
            // Si la foto es una URL externa o local, la mostramos
            setPreviewUrl(investigadorInicial.foto || null);
        }
    }, [investigadorInicial]);

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
            setPreviewUrl(formData.foto_url_actual || null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const dataToSend = new FormData();
        dataToSend.append('nombre', formData.nombre);
        dataToSend.append('cargo', formData.cargo);
        dataToSend.append('resenaCorta', formData.resenaCorta);
        dataToSend.append('resenaLarga', formData.resenaLarga);
        
        if (imageFile) {
            dataToSend.append('foto', imageFile); 
        } else if (isEditing) {
            dataToSend.append('foto_url_actual', formData.foto_url_actual);
        }

        try {
            let response;
            const endpoint = isEditing ? `${API_ENDPOINT}/${investigadorInicial.id}` : API_ENDPOINT;
            
            // Enviamos como FormData (tercer parámetro 'true')
            if (isEditing) {
                response = await put(endpoint, dataToSend, true); 
            } else {
                response = await post(endpoint, dataToSend, true);
            }

            onSave(response.data || response); 
        } catch (err) {
            console.error('Error al guardar:', err);
            setError(err.message || 'Error al conectar con el servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <h3 className="mb-4">{isEditing ? 'Editar Investigador' : 'Añadir Nuevo Investigador'}</h3>

            {error && (
                <div className="alert alert-danger d-flex align-items-center mb-3">
                    <AlertTriangle size={20} className="me-2" />
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Nombre Completo *</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            
            <div className="mb-3">
                <label className="form-label">Cargo / Rol *</label>
                <input type="text" className="form-control" name="cargo" placeholder="Ej: Investigador Responsable" value={formData.cargo} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Reseña Corta</label>
                <textarea className="form-control" name="resenaCorta" rows="2" value={formData.resenaCorta} onChange={handleChange} placeholder="Breve descripción de una línea..." />
            </div>

            <div className="mb-3">
                <label className="form-label">Reseña Larga (Biografía)</label>
                <textarea className="form-control" name="resenaLarga" rows="5" value={formData.resenaLarga} onChange={handleChange} placeholder="Trayectoria completa, títulos, etc..." />
            </div>

            <div className="mb-4 p-3 border rounded bg-light">
                <label className="form-label fw-bold d-block">Foto de Perfil</label>
                
                {previewUrl && (
                    <div className="mb-2 text-center">
                        <img 
                            src={previewUrl.startsWith('http') ? previewUrl : `http://localhost:3001${previewUrl}`} 
                            alt="Previsualización" 
                            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }} 
                            className="img-thumbnail shadow-sm"
                        />
                    </div>
                )}

                <input 
                    type="file" 
                    className="form-control" 
                    name="foto" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    required={!isEditing && !formData.foto_url_actual}
                />
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose} disabled={isSubmitting}>Cancelar</button>
                <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Añadir Investigador')}
                </button>
            </div>
        </form>
    );
};

export default InvestigadorForm;