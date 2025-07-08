import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react'; // Iconos relevantes

// --- Datos de Ejemplo para los Videos ---
const videos = [
  {
    id: 'vid1',
    titulo: 'Entrevista: El Futuro del Periodismo Digital',
    fecha: '2024-10-25',
    plataforma: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=abcdef', // Reemplaza con tu URL de embed real
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', // Miniatura de YouTube
    resumen: 'Una conversación profunda con expertos sobre las tendencias y desafíos que enfrenta el periodismo en la era digital y la integración de nuevas tecnologías.',
    descripcionCompleta: `
      <p>En esta entrevista exclusiva, exploramos las perspectivas de destacados profesionales del periodismo digital sobre el rumbo que está tomando la industria. Se abordaron temas clave como la personalización de contenidos, la monetización en plataformas digitales y el impacto de la inteligencia artificial en la redacción de noticias.</p>
      <p>Los panelistas compartieron sus experiencias y visiones sobre cómo los medios pueden mantenerse relevantes y confiables en un ecosistema informativo cada vez más complejo y fragmentado. Se destacó la importancia de la verificación de hechos, la ética periodística y la adaptación a los nuevos hábitos de consumo de la audiencia.</p>
      <p>La discusión también se centró en el rol de las redes sociales como canales de difusión y las estrategias para combatir la desinformación. Un punto recurrente fue la necesidad de invertir en la capacitación de periodistas en nuevas herramientas y habilidades digitales para asegurar la calidad y la profundidad de la información.</p>
      <p>Esta conversación es indispensable para cualquier persona interesada en el futuro de los medios de comunicación y en cómo el periodismo se está reinventando para servir mejor a la sociedad.</p>
    `
  },
  {
    id: 'vid2',
    titulo: 'Conferencia: Desinformación y Elecciones en América Latina',
    fecha: '2024-09-10',
    plataforma: 'Vimeo',
    embedUrl: 'https://player.vimeo.com/video/871887375?h=e4d2a1c8f1', // Reemplaza con tu URL de embed real
    thumbnail: 'https://i.vimeocdn.com/video/871887375_640.jpg', // Miniatura de Vimeo
    resumen: 'Análisis exhaustivo sobre el impacto de la desinformación en los procesos electorales de la región y las estrategias para fortalecer la democracia.',
    descripcionCompleta: `
      <p>Esta conferencia magistral ofrece un análisis detallado sobre la creciente amenaza de la desinformación en los contextos electorales de América Latina. Expertos en ciencia política, comunicación y tecnología se unieron para discutir cómo las campañas de desinformación pueden manipular la opinión pública y socavar la confianza en las instituciones democráticas.</p>
      <p>Se presentaron casos de estudio de diferentes países, ilustrando las tácticas utilizadas para difundir narrativas falsas y los efectos perjudiciales que estas tienen en la participación ciudadana y la polarización social. Los ponentes enfatizaron la necesidad de una respuesta multifacética que involucre a gobiernos, medios de comunicación, plataformas tecnológicas y la sociedad civil.</p>
      <p>La conferencia concluyó con recomendaciones prácticas para fortalecer la alfabetización mediática, promover la verificación de hechos y desarrollar políticas públicas que protejan la integridad de los procesos electorales sin comprometer la libertad de expresión.</p>
    `
  },
  {
    id: 'vid3',
    titulo: 'Documental Corto: La Evolución de la Publicidad Digital',
    fecha: '2024-08-01',
    plataforma: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/g2J03zM5lB0?si=abcdef', // Reemplaza con tu URL de embed real
    thumbnail: 'https://img.youtube.com/vi/g2J03zM5lB0/mqdefault.jpg',
    resumen: 'Un documental que explora cómo la publicidad ha evolucionado desde los medios masivos hasta la era del marketing programático y la personalización extrema.',
    descripcionCompleta: `
      <p>Este breve documental traza la fascinante historia de la publicidad, desde sus orígenes en los medios impresos y la televisión hasta la compleja y data-driven era digital. La narración destaca los momentos clave y las innovaciones que han transformado cómo las marcas se conectan con sus audiencias.</p>
      <p>Se examina el paso del marketing masivo a la segmentación, la irrupción de las redes sociales como canales publicitarios y el auge del marketing de influencers. Un segmento especial se dedica al impacto del Big Data y la inteligencia artificial en la creación de campañas hiperpersonalizadas, y los desafíos que esto plantea para la privacidad del usuario.</p>
      <p>El documental también aborda las tendencias futuras, como la publicidad en Realidad Aumentada y Virtual, y la creciente demanda de transparencia y ética en la industria publicitaria. Es una pieza esencial para entender las fuerzas que moldean el consumo y el comercio en el siglo XXI.</p>
    `
  }
];

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    window.scrollTo(0, 0);
  };

  const handleBackToGrid = () => {
    setSelectedVideo(null);
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
        Nuestros Videos
      </motion.h1>

      <AnimatePresence mode="wait">
        {selectedVideo ? (
          // --- Vista de Video Detallado ---
          <motion.div
            key="video-detail-view"
            className="card p-4 p-md-5 mx-auto custom-detail-card" // Reutilizamos custom-detail-card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="video-responsive mx-auto mb-4 custom-video-player"> {/* Clase para video responsivo */}
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded" // Bordes redondeados para el iframe
              ></iframe>
            </div>

            <div className="w-100 text-center text-md-start">
              <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--color-principal)' }}>
                {selectedVideo.titulo}
              </h2>
              <p className="fs-5 text-muted mb-2">
                <PlayCircle className="me-2" size={20} />Plataforma: {selectedVideo.plataforma}
              </p>
              <p className="fs-5 text-muted mb-4">
                Publicado el: {formatDate(selectedVideo.fecha)}
              </p>
              
              <div
                className="lead text-dark mb-4 custom-news-content" // Reutilizamos custom-news-content para estilos de párrafo
                dangerouslySetInnerHTML={{ __html: selectedVideo.descripcionCompleta }}
              />

              <motion.button
                onClick={handleBackToGrid}
                className="btn btn-primary btn-lg mt-4 custom-btn-back"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="me-2" size={22} /> Volver a Videos
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // --- Vista de Cuadrícula de Videos ---
          <motion.div
            key="video-grid-view"
            className="row g-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {videos.map((video, index) => (
              <div className="col-12 col-md-6 col-lg-4 d-flex" key={video.id}> {/* col-md-6 para 2 por fila, col-lg-4 para 3 por fila */}
                <motion.div
                  className="card custom-news-card flex-fill h-100" // Reutilizamos custom-news-card
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Contenedor responsivo para la miniatura de video */}
                  <div className="custom-video-thumbnail-container">
                    <img
                      src={video.thumbnail}
                      alt={video.titulo}
                      className="img-fluid custom-video-thumbnail" // Clase para la miniatura
                    />
                    <PlayCircle size={60} className="play-icon" /> {/* Icono de play sobre la miniatura */}
                  </div>
                  
                  <div className="card-body text-center d-flex flex-column">
                    <h3 className="card-title h5 fw-bold mb-2" style={{ color: 'var(--color-principal)' }}>
                      {video.titulo}
                    </h3>
                    <p className="card-subtitle mb-3 text-muted small">
                      <PlayCircle size={16} className="me-1" />{video.plataforma} - {formatDate(video.fecha)}
                    </p>
                    <p className="card-text mb-4 text-justify">{video.resumen}</p>

                    <motion.button
                      onClick={() => handleVideoClick(video)}
                      className="btn btn-outline-primary mt-auto custom-btn-card"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver Video
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

export default Videos;