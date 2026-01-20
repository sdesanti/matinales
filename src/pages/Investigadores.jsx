// src/pages/Investigadores.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';

// 🚨 YA NO necesitamos definir API_BASE_URL aquí, el Hook la tiene.
// Solo definimos la base para las imágenes.
const SERVER_BASE_URL = 'https://matinales-chile-api.fly.dev';

const Investigadores = () => {
    const [investigadores, setInvestigadores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🚨 Extraemos la función 'get' de nuestro Hook
    const { get } = useApi();

    const fetchInvestigadores = async () => {
        setIsLoading(true);
        try {
            // 🚨 USAMOS EL HOOK: get('/investigadores') 
            // Esto automáticamente llamará a https://matinales-chile-api.fly.dev/api/investigadores
            const data = await get('/investigadores');
            setInvestigadores(data);
            setError(null);
        } catch (err) {
            console.error("Fallo al cargar investigadores:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestigadores();
    }, [get]); // Agregamos 'get' como dependencia

    if (isLoading) return <div className="text-center p-5">Cargando lista de investigadores...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;

    return (
        <div className="container my-5">
            <h1 className="mb-5 text-center custom-h1">Nuestro Equipo de Investigación</h1>

            <div className="row g-4 justify-content-center">
                {investigadores.map((investigador, index) => (
                    <motion.div
                        key={investigador.id}
                        className="col-lg-3 col-md-4 col-sm-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <div className="card h-100 text-center shadow-lg border-0">
                            <div className="p-3">
                                {investigador.foto ? ( 
                                    <img
                                        // 🚨 Aseguramos que la URL de la imagen sea HTTPS y completa
                                        src={`${SERVER_BASE_URL}${investigador.foto}`} 
                                        alt={`Foto de ${investigador.nombre}`}
                                        className="custom-list-photo mx-auto rounded-circle img-fluid"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Users size={64} className="text-primary mx-auto" style={{ width: '100px', height: '100px' }} /> 
                                )}
                            </div>
                            
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-1">{investigador.nombre}</h5>
                                <p className="text-muted small">
                                    <Briefcase size={16} className="me-1" />{investigador.cargo || 'Investigador'}
                                </p>
                                <p className="card-text small mb-3 flex-grow-1">
                                    {(investigador.resenaCorta || '').substring(0, 80)}... 
                                </p>
                                
                                <div className="mt-auto">
                                    <Link 
                                        to={`/investigadores/${investigador.id}`} 
                                        className="btn btn-sm btn-outline-primary w-100 mb-2"
                                    >
                                        Ver Perfil
                                    </Link>
                                    {investigador.email && (
                                        <a 
                                            href={`mailto:${investigador.email}`} 
                                            className="btn btn-sm btn-outline-secondary w-100"
                                        >
                                            <Mail size={16} className="me-1" />Contacto
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Investigadores;