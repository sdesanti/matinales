// src/pages/Investigadores.jsx (VISTA PÚBLICA - MODIFICADO)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Briefcase, Users } from 'lucide-react'; 
import { motion } from 'framer-motion';

// Asegúrate que esta URL base sea correcta.
const API_BASE_URL = 'http://localhost:3001/api/investigadores'; 
// URL Base del servidor para concatenar con /uploads/filename
const SERVER_BASE_URL = 'http://localhost:3001'; 

const Investigadores = () => {
    const [investigadores, setInvestigadores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInvestigadores = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.statusText}`);
            }
            const data = await response.json();
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
    }, []);

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
                            {/* --- INICIO: CAMBIO DE IMAGEN --- */}
                            <div className="p-3">
                                {investigador.foto ? ( // Antes decía foto_url
    <img
        src={`${SERVER_BASE_URL}${investigador.foto}`} // Antes decía foto_url
        alt={`Foto de ${investigador.nombre}`}
        className="custom-list-photo mx-auto rounded-circle img-fluid"
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
    />
) : (
    <Users size={64} className="text-primary mx-auto" style={{ width: '100px', height: '100px' }} /> 
)}
                            </div>
                            {/* --- FIN: CAMBIO DE IMAGEN --- */}
                            
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-1">{investigador.nombre}</h5>
                                {/* Asumo que 'area_especializacion' es el campo correcto de la DB */}
                                <p className="text-muted small">
                                    <Briefcase size={16} className="me-1" />{investigador.area_especializacion || 'Investigador'}
                                </p>
                                <p className="card-text small mb-3 flex-grow-1">
                                    {/* Usamos 'resenaCorta' si existe, si no 'resenaLarga', y cortamos a 80 chars */}
                                    {(investigador.resenaCorta || investigador.resenaLarga || '').substring(0, 80)}... 
                                </p>
                                
                                <div className="mt-auto">
                                    <Link 
                                        to={`/investigadores/${investigador.id}`} 
                                        className="btn btn-sm btn-outline-primary w-100 mb-2"
                                    >
                                        Ver Perfil
                                    </Link>
                                    <a 
                                        href={`mailto:${investigador.email}`} 
                                        className="btn btn-sm btn-outline-secondary w-100"
                                    >
                                        <Mail size={16} className="me-1" />Contacto
                                    </a>
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