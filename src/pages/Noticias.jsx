import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// URL Base del servidor para API y Archivos
const API_BASE_URL = 'http://localhost:3001'; 

// Función auxiliar para formatear la fecha
const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNoticias = async () => {
        setIsLoading(true);
        try {
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

    if (isLoading) return <div className="text-center p-5">Cargando noticias...</div>;
    if (error) return <div className="alert alert-danger text-center p-4">Error: {error}</div>;

    return (
        <div className="container my-5">
            <h1 className="mb-4 custom-h1">Últimas Noticias</h1>

            <div className="row">
                {noticias.map((noticia, index) => {
                    const imagenSrc = noticia.imagen 
                        ? `${API_BASE_URL}${noticia.imagen}` 
                        : '/placeholder-news.jpg';

                    return (
                        <motion.div
                            key={noticia.id}
                            className="col-lg-4 col-md-6 mb-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }} // Mejora: se anima al hacer scroll
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* h-100 asegura que todas las tarjetas de una fila midan lo mismo */}
                            <div className="card custom-card-shadow h-100 border-0">
                                <div className="img-container" style={{ height: '200px', overflow: 'hidden' }}>
                                    <img 
                                        src={imagenSrc} 
                                        className="card-img-top custom-card-img" 
                                        alt={noticia.titulo} 
                                        style={{ 
                                            height: '200px', 
                                            width: '100%', 
                                            objectFit: 'cover',
                                            objectPosition: 'top' 
                                        }} 
                                    />
                                </div>
                                
                                {/* d-flex flex-column permite usar mt-auto en el botón */}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title custom-card-title">
                                        <Newspaper size={18} className="me-2 text-primary" />
                                        {noticia.titulo}
                                    </h5>
                                    
                                    <p className="card-subtitle mb-3 text-muted small">
                                        <Calendar size={16} className="me-1" />{formatDate(noticia.fecha)}
                                    </p>
                                    
                                    {/* Clase news-summary para controlar el exceso de texto */}
                                    <p className="card-text text-justify news-summary">
                                        {noticia.resumen}
                                    </p>
                                    
                                    {/* mt-auto empuja este bloque al final de la tarjeta */}
                                    <div className="mt-auto">
                                        <Link 
                                            to={`/noticias/${noticia.id}`} 
                                            className="btn btn-sm custom-btn-primary w-100"
                                        >
                                            Leer más
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Noticias;