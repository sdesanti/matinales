// src/pages/AdminInvestigadoresManagement.jsx (OPTIMIZADO)

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Users, Loader2, AlertTriangle } from 'lucide-react';
import InvestigadorForm from '../components/InvestigadorForm';
import { useApi } from '../hooks/useApi';

const SERVER_URL = 'https://matinales-chile-api.fly.dev'; 
const API_ENDPOINT = '/investigadores';

const AdminInvestigadoresManagement = () => {
    const { get, remove } = useApi(); 
    
    const [investigadores, setInvestigadores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [investigadorToEdit, setInvestigadorToEdit] = useState(null); 
    
    const fetchInvestigadores = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await get(API_ENDPOINT); 
            setInvestigadores(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Fallo al cargar los investigadores.');
        } finally {
            setIsLoading(false);
        }
    }, [get]);

    useEffect(() => {
        fetchInvestigadores();
    }, [fetchInvestigadores]);

    // --- Lógica de Fotos ---
    const getFotoUrl = (path) => {
        if (!path) return '/placeholder-user.svg';
        if (path.startsWith('http')) return path;
        return `${SERVER_URL}${path}`;
    };

    // --- Acciones ---
    const handleCreate = () => {
        setInvestigadorToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (investigador) => {
        setInvestigadorToEdit(investigador);
        setIsModalOpen(true);
    };

    const handleSave = (savedInvestigador) => {
        if (investigadorToEdit) {
            setInvestigadores(prev => prev.map(i => 
                i.id === savedInvestigador.id ? savedInvestigador : i
            ));
        } else {
            setInvestigadores(prev => [savedInvestigador, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar investigador? Esta acción no se puede deshacer.")) return;

        try {
            await remove(`${API_ENDPOINT}/${id}`); 
            setInvestigadores(prev => prev.filter(i => i.id !== id));
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (isLoading) return (
        <div className="d-flex flex-column align-items-center justify-content-center p-5 mt-5">
            <Loader2 size={48} className="text-primary animate-spin mb-3" />
            <p className="text-muted">Cargando investigadores...</p>
        </div>
    );

    return (
        <div className="container-fluid p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                        <Users size={28} className="text-primary"/>
                    </div>
                    <h2 className="h3 mb-0 fw-bold">Gestión de Investigadores</h2>
                </div>
                <button onClick={handleCreate} className="btn btn-primary shadow-sm d-flex align-items-center justify-content-center">
                    <PlusCircle size={18} className="me-2" />
                    Nuevo Investigador
                </button>
            </div>

            {error && (
                <div className="alert alert-danger d-flex align-items-center shadow-sm">
                    <AlertTriangle size={20} className="me-2" />
                    <span>{error}</span>
                    <button className="btn btn-sm btn-outline-danger ms-auto" onClick={fetchInvestigadores}>Reintentar</button>
                </div>
            )}

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-muted small text-uppercase">
                            <tr>
                                <th className="ps-4" style={{ width: '80px' }}>Perfil</th>
                                <th>Nombre y Apellido</th>
                                <th>Contacto</th>
                                <th>Especialidad</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="border-top-0">
                            {investigadores.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No hay investigadores registrados.
                                    </td>
                                </tr>
                            ) : (
                                investigadores.map((inv) => (
                                    <tr key={inv.id}>
                                        <td className="ps-4">
                                            <img 
                                                src={getFotoUrl(inv.foto_url)} 
                                                alt={inv.nombre}
                                                style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                                className="rounded-circle border shadow-sm"
                                                onError={(e) => { e.target.src = '/placeholder-user.svg'; }}
                                            />
                                        </td>
                                        <td>
                                            <div className="fw-bold text-dark">{inv.nombre}</div>
                                            <small className="text-muted">ID: #{inv.id}</small>
                                        </td>
                                        <td>{inv.email}</td>
                                        <td><span className="badge bg-light text-primary border">{inv.especialidad}</span></td>
                                        <td className="text-end pe-4">
                                            <div className="btn-group shadow-sm">
                                                <button onClick={() => handleEdit(inv)} className="btn btn-white btn-sm border" title="Editar">
                                                    <Edit size={16} className="text-warning" />
                                                </button>
                                                <button onClick={() => handleDelete(inv.id)} className="btn btn-white btn-sm border" title="Eliminar">
                                                    <Trash2 size={16} className="text-danger" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4">
                            <div className="modal-header border-bottom-0 pb-0">
                                <h5 className="modal-title fw-bold">
                                    {investigadorToEdit ? 'Actualizar Perfil' : 'Registro de Investigador'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body p-4">
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