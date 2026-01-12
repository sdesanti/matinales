// src/pages/AdminNoticiasManagement.jsx (LÓGICA CRUD COMPLETA)

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import NoticiaForm from '../components/NoticiaForm'; // Asumo que este componente ya existe
import { useAuth } from '../context/AuthContext'; // Aunque esta ruta ya está protegida, siempre es buena práctica usar el contexto

const API_BASE_URL = 'http://localhost:3001';

const AdminNoticiasManagement = () => {
    // 🚨 Este componente ahora maneja TODO el estado y la interacción con la API.
    
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noticiaToEdit, setNoticiaToEdit] = useState(null); 
    
    // Opcional: Para obtener el token si tu API lo necesita para CRUD
    const { token } = useAuth(); 

    const fetchNoticias = async () => {
        setIsLoading(true);
        try {
            // Asegúrate de usar el token si tu API lo requiere, por ejemplo:
            // const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const response = await fetch(`${API_BASE_URL}/api/noticias`);
            
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.statusText}`);
            }
            const data = await response.json();
            setNoticias(data);
            setError(null);
        } catch (err) {
            console.error("Fallo al cargar noticias:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNoticias();
    }, []);

    // --- FUNCIONES CRUD (Migradas de Noticias.jsx) ---

    const handleCreate = () => {
        setNoticiaToEdit(null); // Modo Crear
        setIsModalOpen(true);
    };

    const handleEdit = (noticia) => {
        setNoticiaToEdit(noticia); // Modo Editar
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false); // Cerrar modal primero
        fetchNoticias(); // Refrescar la lista después de POST o PUT
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/noticias/${id}`, {
                method: 'DELETE',
                // Opcional: Incluir cabecera de autorización si es necesario
                // headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.statusText}`);
            }

            console.log(`Noticia ${id} eliminada.`);
            setNoticias(prev => prev.filter(n => n.id !== id));

        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Fallo al eliminar: ${error.message}`);
        }
    };

    // --- RENDERIZADO ---

    if (isLoading) return <div className="p-5">Cargando datos de administración...</div>;
    if (error) return <div className="alert alert-danger p-4">Error al cargar datos: {error}</div>;

    return (
        <div className="admin-page-content">
            <h2 className="mb-4">Gestión de Noticias</h2>

            {/* Botón de Creación */}
            <div className="d-flex justify-content-end mb-4">
                <button onClick={handleCreate} className="btn btn-success">
                    <PlusCircle size={20} className="me-2" />
                    Añadir Noticia
                </button>
            </div>

            {/* Tabla de Noticias para CRUD */}
            <div className="card p-3 shadow-sm">
                <h5>Listado para Edición ({noticias.length} elementos)</h5>
                
                <div className="table-responsive">
                    <table className="table table-striped table-hover mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.map((noticia) => (
                                <tr key={noticia.id}>
                                    <td>{noticia.id}</td>
                                    <td>{noticia.titulo}</td>
                                    <td>{noticia.fecha ? new Date(noticia.fecha).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleEdit(noticia)} 
                                            className="btn btn-sm btn-outline-warning me-2"
                                        >
                                            <Edit size={16} /> Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(noticia.id)} 
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
            </div>

            {/* MODAL DEL FORMULARIO */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <NoticiaForm 
                                    noticiaInicial={noticiaToEdit} 
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

export default AdminNoticiasManagement;