import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Newspaper } from 'lucide-react';

const tarjetas = [
  {
    titulo: 'Publicaciones recientes',
    texto: 'Revisa los artículos y libros desarrollados por el proyecto.',
    icono: <BookOpen size={40} color="#F45A29" />,
    link: '/publicaciones',
    textoBoton: 'Ver más'
  },
  {
    titulo: 'Investigadores',
    texto: 'Conoce a quienes forman parte del equipo y sus líneas de investigación.',
    icono: <Users size={40} color="#F45A29" />,
    link: '/investigadores',
    textoBoton: 'Conocer'
  },
  {
    titulo: 'Noticias',
    texto: 'Infórmate sobre las actividades recientes del equipo y sus impactos.',
    icono: <Newspaper size={40} color="#F45A29" />,
    link: '/noticias',
    textoBoton: 'Ir a noticias'
  }
];

function Home() {
  return (
    <div>
      {/* Hero principal */}
      <section className="hero">
        <div className="container text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Fondecyt Matinales
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Investigación, medios y sociedad: reflexiones desde la comunicación pública.
          </motion.p>
          <motion.a href="#explorar" className="btn-modern mt-3" whileHover={{ scale: 1.05 }}>
            Explorar proyectos
          </motion.a>
        </div>
      </section>

      {/* Tarjetas dinámicas */}
      <section className="seccion-cards py-5" id="explorar">
        <div className="container">
          <h2 className="text-center mb-4">Últimos contenidos</h2>
          <div className="row">
            {tarjetas.map((card, index) => (
              <div className="col-md-4" key={index}>
                <motion.div
                  className="card-modern text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-3">{card.icono}</div>
                  <h3>{card.titulo}</h3>
                  <p>{card.texto}</p>
                  <a href={card.link} className="btn-modern">
                    {card.textoBoton}
                  </a>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AHORA: Primero la visualización de Flourish */}
      <div className="flourish-embed-wrapper">
        <iframe
          src="https://public.flourish.studio/visualisation/23960241/embed"
          title="Mi visualización de Flourish"
          width="100%"
          height="315" // Puedes ajustar esta altura según sea necesario
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>

      {/* LUEGO: El video de YouTube */}
      <div className="video-center-container">
        <div className="video-responsive">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/zEqfuYVCDoA?si=6ICQmytWbugUz3Ni" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

      {/* AL FINAL: La barra roja de CTA */}
      <section
        className="cta-final text-center py-5"
        style={{
          backgroundColor: '#C3423F',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1.0, // Ajusta si es necesario
        }}
      >
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ color: 'white'}}>¿Quieres saber más sobre el proyecto?</h2>
          <p style={{ color: 'white'}}>Explora nuestros videos o contáctanos directamente.</p>
          <a href="/videos" className="btn-modern">
            Ver videos
          </a>
        </motion.div>
      </section>

      {/* Si hay un footer global de la app (no incluido en este código), iría aquí */}
    </div>
  );
}

export default Home;