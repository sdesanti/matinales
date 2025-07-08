import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react'; // Iconos relevantes

// --- Datos de Ejemplo para las Publicaciones ---
const publicaciones = [
  {
    id: 'pub1',
    titulo: 'Impacto de la Disrupción Digital en los Medios Tradicionales',
    fecha: '2024-11-01',
    tipo: 'Artículo de Investigación',
    imagen: 'https://placehold.co/600x400/2196F3/FFFFFF?text=PUBLICACION+01', // Imagen de ejemplo
    autores: 'Dr. Ana Pérez, Lic. Juan Gómez',
    resumen: 'Este estudio analiza cómo las nuevas tecnologías y plataformas han transformado el panorama mediático, forzando a los medios tradicionales a adaptarse.',
    contenidoCompleto: `
      <p>La irrupción de internet y las plataformas digitales ha generado una <strong>disrupción sin precedentes</strong> en la industria de los medios de comunicación tradicionales. Periódicos, radios y televisiones se han visto obligados a redefinir sus modelos de negocio, sus estrategias de contenido y su relación con la audiencia.</p>
      <p>Históricamente, los medios operaban bajo un modelo de transmisión unidireccional, donde la información fluía del emisor al receptor. La era digital ha introducido la interactividad, la participación del usuario y la inmediatez, cambiando radicalmente este paradigma.</p>
      <h4>Principales Conclusiones:</h4>
      <ul>
        <li><strong>Fragmentación de la Audiencia:</strong> Los usuarios ahora acceden a información de múltiples fuentes, lo que dificulta la construcción de audiencias masivas.</li>
        <li><strong>Modelos de Ingreso:</strong> La publicidad tradicional ha disminuido, impulsando la búsqueda de nuevos modelos como suscripciones, membresías o micro-pagos.</li>
        <li><strong>Periodismo de Datos:</strong> La capacidad de analizar grandes volúmenes de datos se ha vuelto esencial para identificar tendencias y generar contenido relevante.</li>
        <li><strong>Plataformas y Agregadores:</strong> El contenido mediático es cada vez más consumido a través de redes sociales y agregadores, lo que plantea desafíos sobre la propiedad y monetización.</li>
      </ul>
      <p>La adaptación exitosa requiere no solo la digitalización de los procesos, sino una <strong>transformación cultural profunda</strong> que abrace la experimentación, la agilidad y una mentalidad centrada en el usuario. Aquellos que no logren esta metamorfosis corren el riesgo de quedar obsoletos en un ecosistema mediático en constante evolución.</p>
    `,
    urlDescarga: '#' // Ejemplo: URL de un PDF o recurso externo
  },
  {
    id: 'pub2',
    titulo: 'Guía Práctica para la Gestión de Redes Sociales en Crisis',
    fecha: '2024-09-15',
    tipo: 'Informe Técnico',
    imagen: 'https://placehold.co/600x400/FF5722/FFFFFF?text=PUBLICACION+02',
    autores: 'Equipo de Comunicación Digital',
    resumen: 'Un manual esencial para profesionales de la comunicación que buscan manejar crisis de reputación en plataformas digitales.',
    contenidoCompleto: `
      <p>La gestión de crisis en la era digital es un desafío complejo que requiere preparación, agilidad y una estrategia bien definida. Las redes sociales, si bien ofrecen canales directos de comunicación, también pueden amplificar rápidamente situaciones negativas si no se manejan adecuadamente.</p>
      <p>Esta guía proporciona un marco práctico para desarrollar un plan de gestión de crisis en redes sociales, desde la detección temprana de señales de alerta hasta la evaluación post-crisis.</p>
      <h4>Estrategias Clave:</h4>
      <ol>
        <li><strong>Monitoreo Constante:</strong> Utilizar herramientas para escuchar activamente las conversaciones en línea y detectar menciones negativas.</li>
        <li><strong>Protocolo de Respuesta:</strong> Establecer roles, responsabilidades y mensajes clave pre-aprobados para agilizar la respuesta.</li>
        <li><strong>Transparencia y Empatía:</strong> Comunicar de forma honesta y mostrar comprensión hacia las preocupaciones de la audiencia.</li>
        <li><strong>Selección de Canales:</strong> Elegir las plataformas adecuadas para cada tipo de mensaje y audiencia afectada.</li>
        <li><strong>Análisis y Aprendizaje:</strong> Evaluar el impacto de la crisis y las lecciones aprendidas para futuras situaciones.</li>
      </ol>
      <p>Un manejo proactivo y estratégico de las crisis en redes sociales no solo minimiza el daño a la reputación, sino que también puede fortalecer la confianza de la audiencia en la marca o institución.</p>
    `,
    urlDescarga: '#'
  },
  {
    id: 'pub3',
    titulo: 'Análisis Semiótico de Campañas Publicitarias Contemporáneas',
    fecha: '2024-07-20',
    tipo: 'Libro',
    imagen: 'https://placehold.co/600x400/4CAF50/FFFFFF?text=PUBLICACION+03',
    autores: 'Dra. Laura Fernández',
    resumen: 'Una mirada profunda a los símbolos y significados en la publicidad moderna y su influencia en el consumidor.',
    contenidoCompleto: `
      <p>La publicidad no es solo un conjunto de mensajes persuasivos, sino un complejo sistema de signos y símbolos que operan a nivel consciente e inconsciente para moldear percepciones y comportamientos. Este libro aplica un <strong>análisis semiótico riguroso</strong> a una selección de campañas publicitarias contemporáneas, desentrañando las capas de significado que subyacen a los mensajes aparentes.</p>
      <p>Desde la elección de colores y tipografías hasta la construcción de narrativas y la representación de arquetipos, cada elemento en un anuncio contribuye a un significado global que resuena con la cultura y los valores del público objetivo.</p>
      <p>La obra explora cómo las marcas utilizan la intertextualidad, los mitos modernos y las referencias culturales para establecer conexiones emocionales y construir identidades de marca sólidas. Se analizan casos de estudio de éxito y fracaso, revelando las complejidades de la comunicación publicitaria en un mundo saturado de información.</p>
      <p>Un capítulo dedicado a la publicidad digital examina cómo los algoritmos y la personalización están influyendo en la creación y recepción de mensajes, y los desafíos éticos que esto conlleva en términos de manipulación y privacidad.</p>
      <p>Este texto es una herramienta esencial para estudiantes y profesionales de la comunicación, la publicidad y el marketing que deseen comprender la profundidad del lenguaje publicitario y su poder cultural.</p>
    `,
    urlDescarga: '#'
  },
  {
    id: 'pub4',
    titulo: 'Ética de la IA en el Periodismo: Un Marco para la Responsabilidad',
    fecha: '2024-06-05',
    tipo: 'Artículo de Opinión',
    imagen: 'https://placehold.co/600x400/9C27B0/FFFFFF?text=PUBLICACION+04',
    autores: 'Dr. Carlos Ruiz',
    resumen: 'Reflexión sobre los dilemas éticos que presenta la integración de la inteligencia artificial en las prácticas periodísticas y la necesidad de un marco regulatorio.',
    contenidoCompleto: `
      <p>La creciente adopción de la Inteligencia Artificial (IA) en las redacciones periodísticas, desde la automatización de noticias hasta la curación de contenidos, plantea una serie de <strong>dilemas éticos fundamentales</strong> que requieren una atención urgente. Si bien la IA promete eficiencia y nuevas capacidades, también introduce riesgos relacionados con la imparcialidad, la transparencia y la rendición de cuentas.</p>
      <p>Uno de los principales desafíos es el sesgo algorítmico. Los sistemas de IA son entrenados con datos históricos que pueden reflejar y perpetuar sesgos humanos existentes, lo que podría llevar a la producción de noticias discriminatorias o a la amplificación de narrativas polarizantes. La opacidad de cómo estos algoritmos toman decisiones ("la caja negra") dificulta la identificación y corrección de estos sesgos.</p>
      <p>Además, la IA podría desdibujar la línea entre la verdad y la falsedad. La generación de contenido sintético (deepfakes, textos generados automáticamente) con fines maliciosos es una preocupación creciente, requiriendo que los periodistas desarrollen nuevas habilidades y herramientas para la verificación y detección de manipulación.</p>
      <h4>Principios Éticos Propuestos:</h4>
      <ul>
        <li><strong>Transparencia:</strong> Informar a la audiencia cuándo el contenido ha sido generado o asistido por IA.</li>
        <li><strong>Rendición de Cuentas:</strong> Establecer quién es responsable de los errores o sesgos en el contenido producido con IA.</li>
        <li><strong>Imparcialidad:</strong> Diseñar y entrenar sistemas de IA para minimizar sesgos y promover la diversidad de perspectivas.</li>
        <li><strong>Supervisión Humana:</strong> Mantener al periodista humano en el centro del proceso, utilizando la IA como herramienta y no como reemplazo del juicio editorial.</li>
      </ul>
      <p>La construcción de un marco ético robusto para la IA en el periodismo es esencial para preservar la confianza pública y asegurar que la tecnología sirva para fortalecer el periodismo de calidad, en lugar de socavarlo.</p>
    `,
    urlDescarga: '#'
  }
];

function Publicaciones() {
  const [selectedPublication, setSelectedPublication] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
    window.scrollTo(0, 0);
  };

  const handleBackToGrid = () => {
    setSelectedPublication(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container py-5">
      <motion.h1
        className="text-center mb-5"
        style={{ color: 'var(--color-principal)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestras Publicaciones
      </motion.h1>

      <AnimatePresence mode="wait">
        {selectedPublication ? (
          // --- Vista de Publicación Detallada ---
          <motion.div
            key="publication-detail-view"
            className="card p-4 p-md-5 mx-auto custom-detail-card" // Reutilizamos custom-detail-card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Imagen Principal de la Publicación */}
            <img
              src={selectedPublication.imagen}
              alt={selectedPublication.titulo}
              className="img-fluid rounded shadow-sm mb-4 custom-news-image" // Reutilizamos custom-news-image para estilo similar
            />

            <div className="w-100 text-center text-md-start">
              {/* Título de la Publicación */}
              <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--color-principal)' }}>
                {selectedPublication.titulo}
              </h2>
              {/* Metadatos */}
              <p className="fs-5 text-muted mb-2">
                <BookOpen className="me-2" size={20} />Tipo: {selectedPublication.tipo}
              </p>
              <p className="fs-5 text-muted mb-2">
                <FileText className="me-2" size={20} />Autores: {selectedPublication.autores}
              </p>
              <p className="fs-5 text-muted mb-4">
                Publicado el: {formatDate(selectedPublication.fecha)}
              </p>
              
              {/* Contenido Completo */}
              <div
                className="lead text-dark mb-4 custom-news-content" // Reutilizamos custom-news-content para estilos de párrafo
                dangerouslySetInnerHTML={{ __html: selectedPublication.contenidoCompleto }}
              />

              {/* Botón de Descarga (si existe URL) */}
              {selectedPublication.urlDescarga && (
                <a
                  href={selectedPublication.urlDescarga}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-lg mt-3 me-3 custom-btn-card" // Color verde para descarga
                >
                  <FileText className="me-2" size={22} /> Descargar Publicación
                </a>
              )}

              {/* Botón Volver */}
              <motion.button
                onClick={handleBackToGrid}
                className="btn btn-primary btn-lg mt-3 custom-btn-back"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="me-2" size={22} /> Volver a Publicaciones
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // --- Vista de Cuadrícula de Publicaciones ---
          <motion.div
            key="publication-grid-view"
            className="row g-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {publicaciones.map((pub, index) => (
              <div className="col-12 col-md-6 col-lg-4 d-flex" key={pub.id}> {/* col-md-6 para 2 por fila, col-lg-4 para 3 por fila */}
                <motion.div
                  className="card custom-news-card flex-fill h-100" // Reutilizamos custom-news-card
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={pub.imagen}
                    alt={pub.titulo}
                    className="card-img-top custom-news-thumb" // Reutilizamos custom-news-thumb
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h3 className="card-title h5 fw-bold mb-2" style={{ color: 'var(--color-principal)' }}>
                      {pub.titulo}
                    </h3>
                    <p className="card-subtitle mb-2 text-muted small"><BookOpen size={16} className="me-1" />{pub.tipo}</p>
                    <p className="card-subtitle mb-3 text-muted small"><FileText size={16} className="me-1" />{pub.autores}</p>
                    <p className="card-text mb-4 text-justify">{pub.resumen}</p>

                    <motion.button
                      onClick={() => handlePublicationClick(pub)}
                      className="btn btn-outline-primary mt-auto custom-btn-card"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver Publicación
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Publicaciones;