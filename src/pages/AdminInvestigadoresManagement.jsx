// src/pages/AdminInvestigadoresManagement.jsx (Integrado con useApi y Lógica de Actualización Optimizada)

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Users, Loader2, AlertTriangle, User } from 'lucide-react';
import InvestigadorForm from '../components/InvestigadorForm';
import { useApi } from '../hooks/useApi'; // 🚨 Importamos useApi

const API_BASE_URL = 'http://localhost:3001'; 
const API_ENDPOINT = '/investigadores'; // Endpoint usado por useApi

// Función para obtener la URL completa de la foto de perfil
const getFotoUrl = (urlPath) => {
    if (!urlPath) {
        // Placeholder por defecto si no hay foto. Asegúrate de tener este archivo en /public
        return '/placeholder-user.svg'; 
    }
    // Retorna la URL completa, si el backend devuelve rutas relativas
    if (urlPath.startsWith('http')) {
        return urlPath;
    }
    return `${API_BASE_URL}${urlPath}`;
};

const AdminInvestigadoresManagement = () => {
    // 🚨 Usamos los métodos de useApi
    const { get, remove } = useApi(); 
    
    const [investigadores, setInvestigadores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [investigadorToEdit, setInvestigadorToEdit] = useState(null); 
    
    // Función de Carga (Lectura) - Ahora usa useApi
    const fetchInvestigadores = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 🚨 Usar get(endpoint)
            const data = await get(API_ENDPOINT); 
            setInvestigadores(data);
        } catch (err) {
            setError(err.message || 'Fallo al cargar los investigadores.');
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        fetchInvestigadores();
    }, [fetchInvestigadores]);

    // --- FUNCIONES CRUD ---

    const handleCreate = () => {
        setInvestigadorToEdit(null); // Modo Crear
        setIsModalOpen(true);
    };

    const handleEdit = (investigador) => {
        setInvestigadorToEdit(investigador); // Modo Editar
        setIsModalOpen(true);
    };

    // 🚨 Función optimizada: Actualiza el estado local y cierra el modal
    const handleSave = (savedInvestigador) => {
        if (investigadorToEdit) {
            // Edición: Reemplazar el elemento editado
            setInvestigadores(prev => prev.map(i => 
                i.id === savedInvestigador.id ? savedInvestigador : i
            ));
        } else {
            // Creación: Añadir el nuevo elemento al inicio
            setInvestigadores(prev => [savedInvestigador, ...prev]);
        }
        setIsModalOpen(false); // Cerrar modal
        setInvestigadorToEdit(null);
    };

    // Manejo de Eliminación (DELETE) - Ahora usa useApi
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar a este investigador? Esta acción es irreversible.")) {
            return;
        }

        try {
            // 🚨 Usar el método remove de useApi
            await remove(`${API_ENDPOINT}/${id}`); 
            
            // Eliminar de la lista en el cliente (actualización optimizada)
            setInvestigadores(prev => prev.filter(i => i.id !== id));

        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Fallo al eliminar: ${error.message}`);
        }
    };

    // --- RENDERIZADO CONDICIONAL ---

    if (isLoading) return (
        <div className="text-center p-5">
            <Loader2 size={36} className="text-primary spin me-2" />
            <p className="mt-2">Cargando datos de investigadores...</p>
        </div>
    );
    if (error) return (
        <div className="alert alert-danger p-4">
            <AlertTriangle size={24} className="me-2" />
            Error al cargar datos: {error}
            <button className="btn btn-sm btn-danger ms-3" onClick={fetchInvestigadores}>Reintentar</button>
        </div>
    );

    // --- RENDERIZADO PRINCIPAL ---

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <Users size={32} className="me-3 text-primary"/>
                    <h2 className="mb-0">Gestión de Investigadores</h2>
                </div>
                <button onClick={handleCreate} className="btn btn-primary">
                    <PlusCircle size={20} className="me-2" />
                    Añadir Investigador
                </button>
            </div>

            {/* Tabla de Investigadores */}
            <div className="card p-3 shadow-sm">
                <h5>Listado para Edición ({investigadores.length} miembros)</h5>
                
                {investigadores.length === 0 ? (
                    <div className="alert alert-info text-center mt-3">No se encontraron investigadores.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mt-3 align-middle">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>Foto</th> 
                                    <th style={{ width: '5%' }}>ID</th>
                                    <th style={{ width: '30%' }}>Nombre</th>
                                    <th style={{ width: '25%' }}>Email</th>
                                    <th style={{ width: '20%' }}>Especialidad</th>
                                    <th style={{ width: '15%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investigadores.map((investigador) => (
                                    <tr key={investigador.id}>
                                        {/* Celda de Foto */}
                                        <td>
                                            <img 
                                                src={getFotoUrl(investigador.foto_url)} 
                                                alt={investigador.nombre}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                className="rounded-circle border"
                                                // Manejo de error de imagen para usar el placeholder
                                                onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-user.svg'; }}
                                            />
                                        </td>
                                        <td>{investigador.id}</td>
                                        <td>{investigador.nombre}</td>
                                        <td>{investigador.email}</td>
                                        <td>{investigador.especialidad}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleEdit(investigador)} 
                                                className="btn btn-sm btn-outline-warning me-2"
                                            >
                                                <Edit size={16} /> Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(investigador.id)} 
                                                className="btn btn-sm btn-outline-danger"
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

            {/* MODAL DEL FORMULARIO */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{investigadorToEdit ? 'Editar Investigador' : 'Añadir Nuevo Investigador'}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Cerrar"></button>
                            </div>
                            <div className="modal-body">
                                <InvestigadorForm 
                                    investigadorInicial={investigadorToEdit} 
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

export default AdminInvestigadoresManagement;