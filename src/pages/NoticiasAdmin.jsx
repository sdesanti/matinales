// src/pages/NoticiasAdmin.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';
import NoticiaForm from '../components/NoticiaForm';
import { Plus, Edit, Trash2, Loader2, AlertTriangle, FileText } from 'lucide-react';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos useApi

const NoticiasAdmin = () => {
    // 1. Estados de la Interfaz
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estado para el modal/formulario
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [noticiaToEdit, setNoticiaToEdit] = useState(null);

    // 2. Hook de la API
    const { get, remove } = useApi();
    const API_ENDPOINT = '/noticias';

    // 3. Función de Carga de Datos (GET)
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

    // Cargar noticias al montar el componente
    useEffect(() => {
        fetchNoticias();
    }, [fetchNoticias]);

    // 4. Handlers de Edición y Creación
    const handleOpenForm = (noticia = null) => {
        setNoticiaToEdit(noticia);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setNoticiaToEdit(null);
    };

    // 5. Manejo de Guardado (POST/PUT desde NoticiaForm)
    const handleSave = (savedNoticia) => {
        // Actualizar la lista de noticias tras la creación o edición
        if (noticiaToEdit) {
            // Edición: Reemplazar el elemento editado
            setNoticias(prev => prev.map(n => 
                n.id === savedNoticia.id ? savedNoticia : n
            ));
        } else {
            // Creación: Añadir el nuevo elemento al inicio
            setNoticias(prev => [savedNoticia, ...prev]);
        }
        handleCloseForm();
    };

    // 6. Manejo de Eliminación (DELETE)
    const handleDelete = async (id) => {
        if (!window.confirm("¿Está seguro de que desea eliminar esta noticia? Esta acción es irreversible.")) {
            return;
        }

        try {
            await remove(`${API_ENDPOINT}/${id}`);
            // Eliminar la noticia de la lista en el cliente
            setNoticias(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            alert(`Error al eliminar: ${err.message}`);
        }
    };

    // 7. Renderizado Condicional (Carga, Error, Formulario)

    if (isLoading) {
        return (
            <div className="text-center p-5">
                <Loader2 size={36} className="text-warning spin me-2" />
                <p className="mt-2">Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger p-4">
                <AlertTriangle size={24} className="me-2" />
                Error fatal: {error}
                <button className="btn btn-sm btn-danger ms-3" onClick={fetchNoticias}>Reintentar</button>
            </div>
        );
    }
    
    // Si el formulario está abierto, lo mostramos en lugar de la tabla
    if (isFormOpen) {
        return (
            <div className="card shadow p-4">
                <NoticiaForm 
                    noticiaInicial={noticiaToEdit} 
                    onSave={handleSave} 
                    onClose={handleCloseForm} 
                />
            </div>
        );
    }

    // 8. Renderizado Principal (Tabla)
    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Noticias ({noticias.length})</h2>
                <button 
                    className="btn btn-warning" 
                    onClick={() => handleOpenForm(null)}
                >
                    <Plus size={20} className="me-2" />
                    Nueva Noticia
                </button>
            </div>

            {noticias.length === 0 ? (
                <div className="alert alert-info text-center">
                    Aún no hay noticias creadas. ¡Crea la primera!
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle shadow-sm bg-white rounded">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col" style={{ width: '10%' }}>ID</th>
                                <th scope="col" style={{ width: '15%' }}>Portada</th>
                                <th scope="col" style={{ width: '35%' }}>Título</th>
                                <th scope="col" style={{ width: '20%' }}>Fecha</th>
                                <th scope="col" style={{ width: '20%' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.map((noticia) => (
                                <tr key={noticia.id}>
                                    <th scope="row">{noticia.id}</th>
                                    <td>
                                        {noticia.imagen_url ? (
                                            <img 
                                                src={noticia.imagen_url} 
                                                alt={noticia.titulo} 
                                                className="img-thumbnail"
                                                style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <FileText size={40} className="text-muted" />
                                        )}
                                    </td>
                                    <td>{noticia.titulo}</td>
                                    <td>
                                        {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES')}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-primary me-2" 
                                            onClick={() => handleOpenForm(noticia)}
                                        >
                                            <Edit size={16} /> Editar
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            onClick={() => handleDelete(noticia.id)}
                                        >
                                            <Trash2 size={16} /> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NoticiasAdmin;