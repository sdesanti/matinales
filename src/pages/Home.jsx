import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ Importación CRITICA para evitar 404
import { BookOpen, Users, Newspaper, Zap } from 'lucide-react';

// Importación de imágenes
import CENTRAL_PROJECT_IMAGE from '../assets/foto1.jpg'; 
import HERO_BACKGROUND_IMAGE from '../assets/luchadematinales.jpg';

const tarjetas = [
    {
        titulo: 'Publicaciones recientes',
        texto: 'Revisa los artículos y libros desarrollados por el proyecto.',
        icono: <BookOpen size={40} color="#F45A29" />,
        link: '/publicaciones', // ✅ Ruta relativa corregida
        textoBoton: 'Ver más'
    },
    {
        titulo: 'Investigadores',
        texto: 'Conoce a quienes forman parte del equipo y sus líneas de investigación.',
        icono: <Users size={40} color="#F45A29" />,
        link: '/investigadores', // ✅ Ruta relativa corregida
        textoBoton: 'Conocer'
    },
    {
        titulo: 'Noticias',
        texto: 'Infórmate sobre las actividades recientes del equipo y sus impactos.',
        icono: <Newspaper size={40} color="#F45A29" />,
        link: '/noticias', // ✅ Ruta relativa corregida
        textoBoton: 'Ir a noticias'
    }
];

function Home() {
    return (
        <div>
            {/* 1. Hero principal */}
            <section 
                className="hero-full-screen"
                style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
            >
                <div className="hero-overlay"> 
                    <div className="container text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8 }}
                            className="hero-title"
                        >
                            Fondecyt Matinales
                        </motion.h1>
                        <motion.p 
                            className="lead hero-subtitle" 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Investigación, medios y sociedad: reflexiones desde la comunicación pública.
                        </motion.p>
                        <a 
                            href="#explorar" 
                            className="btn-modern btn-lg mt-4"
                        >
                            Explorar proyectos
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. Sección Showcase */}
            <section className="seccion-showcase py-5 bg-light" id="showcase"> 
                <div className="container">
                    <h2 className="text-center mb-5 titulo-principal-seccion">
                        Nuestra Investigación en Acción
                    </h2>
                    
                    <div className="row align-items-center">
                        <motion.div
                            className="col-md-6 mb-4 mb-md-0" 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="h4 text-primary-color">Uniendo Medios y Sociedad</h3>
                            <p className="lead text-muted">
                                El proyecto Fondecyt Matinales busca analizar el impacto de la comunicación pública...
                            </p>
                            {/* ✅ Cambiado a Link */}
                            <Link to="/publicaciones" className="btn-modern mt-3">
                                Ver Impacto y Resultados
                            </Link>
                        </motion.div>

                        <motion.div
                            className="col-md-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={CENTRAL_PROJECT_IMAGE}
                                alt="Investigación"
                                className="img-fluid central-image-style shadow-lg"
                                style={{ maxHeight: '400px' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Tarjetas dinámicas */}
            <section className="seccion-cards py-5 bg-light" id="explorar"> 
                <div className="container">
                    <h2 className="text-center mb-5 titulo-principal-seccion">
                        <Zap size={30} color="#F45A29" className="me-2" />
                        Nuestras líneas de Contenido
                    </h2>
                    <div className="row">
                        {tarjetas.map((card, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <motion.div
                                    className="card-modern shadow-lg text-center h-100 p-4"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.15, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="mb-3 icono-wrapper">{card.icono}</div>
                                    <h3 className="card-title-modern">{card.titulo}</h3>
                                    <p className="card-text-modern flex-grow-1">{card.texto}</p>
                                    {/* ✅ Cambiado a Link */}
                                    <Link to={card.link} className="btn-modern mt-3">
                                        {card.textoBoton}
                                    </Link>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Visualización de Datos (Flourish) */}
            <section className="seccion-flourish py-5">
                <div className="container">
                    <h2 className="text-center mb-4 titulo-principal-seccion">Análisis de Datos</h2>
                    <div className="flourish-embed-wrapper shadow-lg rounded-3 overflow-hidden">
                        <iframe
                            src="https://public.flourish.studio/visualisation/23960241/embed"
                            title="Flourish"
                            width="100%"
                            height="500"
                            frameBorder="0"
                            scrolling="no"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* 5. VIDEO DESTACADO */}
            <section className="video-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4 titulo-principal-seccion">
                        Conoce nuestro Proyecto
                    </h2>
                    <div className="video-center-container">
                        <div className="video-responsive rounded-3 shadow-lg">
                            <iframe
                                src="https://www.youtube.com/embed/zEqfuYVCDoA?si=6ICQmytWbugUz3Ni"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Llamada a la Acción (CTA) Final */}
            <section className="cta-final text-center py-5" style={{ backgroundColor: '#C3423F' }}>
                <motion.div className="container" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <h2 style={{ color: 'white' }}>¿Quieres saber más?</h2>
                    <p className="lead" style={{ color: 'white' }}>Explora nuestros videos y conoce al equipo.</p>
                    {/* ✅ Cambiado a Link y ruta relativa */}
                    <Link to="/videos" className="btn-modern btn-cta-secondary">
                        Ver videos destacados
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}

export default Home;