// src/components/Noticias.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react'; // Icono para volver

// --- Datos de Ejemplo para las Noticias (sin cambios) ---
const noticias = [
  {
    id: '1',
    titulo: 'Tesistas presentan primer reporte sobre matinales televisivos',
    fecha: '2025-06-20',
    imagen: 'https://placehold.co/600x400/C3423F/FFFFFF?text=NOTICIA+01',
    resumen: 'La exposición fue una de las últimas actividades del primer año del proyecto liderado por la doctora en Comunicación y profesora titular de la Universidad de Chile, Lorena Antezana. ',
    contenidoCompleto: `
      <p>El pasado <strong>17 de diciembre de 2024</strong>, en el marco del desarrollo del primer año del proyecto Fondecyt Regular Nº 1240145, estudiantes de pregrado de la Universidad de La Serena y de la Universidad de Chile dieron a conocer los resultados de sus tesis para optar al título de periodista, las cuales fueron realizadas a partir de la investigación sobre matinales televisivos en Chile. La instancia se realizó vía Zoom y contó con un espacio para la socialización de los datos obtenidos.</p>

    <p>El proyecto, que busca analizar la función social de los matinales televisivos en la construcción de una agenda de opinión pública, lo encabeza la doctora en Comunicación y profesora titular de la Universidad de Chile, <strong>Lorena Antezana</strong>. Su equipo está compuesto por los académicos e investigadores Daniela Lazcano (Pontificia Universidad Católica de Valparaíso), el doctor Cristian Cabalin (Universidad de Chile) y el doctor Pablo Andrada (Universidad de La Serena), como también por las estudiantes de posgrado Loreto Montero (Universidad de California) y Paula Reyes (Universidad de Chile).</p>

    <p>La doctora (c) en Comunicación de la Universidad de California y asistente de investigación del proyecto Fondecyt Regular Nº 1240145, <strong>Loreto Montero</strong>, fue la encargada de dar la bienvenida y guiar esta primera etapa de pesquisa vinculada a estudiantes de pregrado.</p>

    <p>Desde la Universidad de La Serena, los estudiantes <strong>Cathalina Serin</strong> y <strong>Matías Tabilo</strong>, dieron a conocer los resultados de su investigación titulada “Análisis de la cobertura policial en los matinales televisivos chilenos en la era del infoentretenimiento”, la que fue guiada por el doctor Pablo Andrada.</p>

    <p>Tal como su nombre lo indica, el objetivo de la pesquisa fue analizar la cobertura policial en los matinales televisivos de Chile a partir de los casos de <em>Tu día</em>, de Canal 13 y <em>Buenos días a todos</em>, de Televisión Nacional.</p>

    <p>Aspecto relevante si se considera que, en la oferta programática de los matinales, “la cobertura policial supera el 30%, aumentando considerablemente en relación a los últimos años. En este sentido, los elementos audiovisuales como la música de tensión incesante, las múltiples pantallas en simultáneo, el alto flujo informativo de los generadores de caracteres (GC) y los discursos cargados de opiniones y valoraciones de las principales voces de los matinales, juegan un rol fundamental en la configuración del ámbito policial y por sobre todo en la formación de la opinión pública”, afirmó Tabilo.</p>

    <p>Más adelante, las memoristas de la Universidad de Chile, <strong>Mariana Orellana</strong> y <strong>Paulina Pereira</strong>, expusieron su trabajo titulado “De la pantalla al hogar. El rol de los matinales chilenos en la vida de los telespectadores”, el que fue guiado por la doctora en Comunicación y responsable del proyecto Fondecyt Regular Nº 1240145, Lorena Antezana.</p>

    <p>En dicho documento, escrito en formato de crónica, las estudiantes se acercaron a dueñas de casa que diariamente consumen matinales, configurándose como telespectadoras fieles del mencionado producto.</p>

    <p>“A través de estos testimonios, podemos ver que los matinales hasta la fecha siguen siendo relevantes, convirtiéndose en espacios donde se discuten abiertamente las problemáticas sociales, poniendo en la mesa realidades ignoradas por los otros medios y formatos, interpelando a autoridades y buscando respuestas a las inquietudes de la ciudadanía. Cada mañana, mientras los cafés y tés humean en miles de tazas, los chilenos vuelven a sintonizarse con la televisión, medio de mayor relevancia en Chile, según la Encuesta Nacional de Televisión (2021), buscando en los matinales algo más que información: anhelando el calor de una compañía que, aunque distante, se siente cercana”, expresaron las autoras, quienes fueron calificadas con nota 7,0 en su defensa de título.</p>

    <p>De este modo, el trabajo desarrollado entrega un primer reporte de lo que se instala en la opinión pública y pone en perspectiva el rol de los matinales en nuestro país y los alcances que mantienen tanto a nivel político, social y cultural, abriendo nuevos espacios para la investigación.</p>
    `
  },
  {
    id: '2',
    titulo: 'Investigadoras e investigadores cierran primer año de pesquisa sobre matinales televisivos y su rol en la opinión pública ',
    fecha: '2025-05-15',
    imagen: 'https://placehold.co/600x400/F45A29/FFFFFF?text=NOTICIA+02',
    resumen: 'El equipo integrado por académicos de la Universidad de Chile, de la Universidad de La Serena (ULS) y de la Pontificia Universidad Católica de Valparaíso (PUCV) se encuentra investigando sobre el papel que juegan los magacín matinales chilenos en el contexto de democracias fragmentadas. Luego de tres días de trabajo que tuvieron lugar en la ULS, las y los pesquisadores dieron cierre al primero de cuatro años de investigación.',
    contenidoCompleto: `
      <p>En el marco del proyecto <strong>Fondecyt Regular 1240145</strong> encabezado por la doctora <strong>Lorena Antezana</strong>, y con el objetivo de analizar, entre 2020 y 2023, la estructura de los programas <em>Tu día</em> (Canal 13), <em>Contigo en la mañana</em> (Chilevisión), <em>Buenos días a todos</em> (Televisión Nacional de Chile) y <em>Mucho gusto</em> (Mega), las y los integrantes del equipo se reunieron en la Universidad de La Serena el pasado <strong>15, 16 y 17 de enero de 2025</strong> para socializar sobre el trabajo desarrollado a la fecha y planificar las acciones venideras para el segundo año.</p>

    <p>El grupo vinculado a la investigación titulada <em>La plaza pública de las mañanas: matinales televisivos y audiencias en un contexto de democracias fragmentadas</em> está compuesto por los académicos e investigadores <strong>Daniela Lazcano</strong> (Pontificia Universidad Católica de Valparaíso), el doctor <strong>Cristian Cabalin</strong> (Universidad de Chile) y el doctor <strong>Pablo Andrada</strong> (Universidad de La Serena), como también por las estudiantes de posgrado <strong>Loreto Montero</strong> (Universidad de California) y <strong>Paula Reyes</strong> (Universidad de Chile).</p>

    <p>La jornada de tres días permitió fortalecer los lazos entre las instituciones participantes y avanzar en el diseño metodológico y analítico del proyecto, “contribuyendo al entendimiento de los matinales como un espacio clave de interacción mediática en la sociedad chilena actual”, tal como expresó Antezana en entrevista con la Facultad Comunicación e Imagen de la Universidad de Chile.</p>

    <p>El mencionado proyecto Fondecyt Regular destaca debido a que busca modificar la dinámica de la centralización de las pesquisas, como también por la inclusión de investigadores de tres universidades de Chile.</p>

    <p>Durante su segunda fase, que comprende los años 2026 y 2027, ampliará el trabajo hacia el estudio de las audiencias de dicho formato televisivo.</p>
    `
  },
  {
    id: '3',
    titulo: 'Investigadoras e investigadores exponen sobre matinales en Incom 2024',
    fecha: '2025-04-01',
    imagen: 'https://placehold.co/600x400/F8991D/FFFFFF?text=NOTICIA+03',
    resumen: 'El pasado 6,7 y 8 de noviembre se realizó en la Universidad de la Frontera, Temuco, la X versión del Congreso de la Asociación Chilena de Investigadoras e Investigadores en Comunicación, Incom 2024. ',
    contenidoCompleto: `
      <p>El pasado <strong>6, 7 y 8 de noviembre</strong> se realizó en la <strong>Universidad de la Frontera, Temuco</strong>, la <strong>X versión del Congreso de la Asociación Chilena de Investigadoras e Investigadores en Comunicación, Incom 2024</strong>. La instancia, que llevó por título “La Comunicación como un Campo abierto”, contó con la participación de las investigadoras e investigadores del proyecto <strong>Fondecyt (COD 1240145) “La plaza pública de las mañanas: matinales televisivos y sus audiencias en un contexto de democracias fragmentadas”</strong>, dirigido por la profesora titular de la Facultad de Comunicación e Imagen de la Universidad de Chile, <strong>Lorena Antezana</strong>. El proyecto cuenta además con la participación del profesor de la misma casa de estudios, <strong>Cristian Cabalin</strong>, la profesora de la Pontificia Universidad Católica de Valparaíso, <strong>Daniela Lazcano-Peña</strong>, el profesor de la Universidad de la Serena, <strong>Pablo Andrada</strong> y las asistentes de investigación y estudiantes de postgrado, <strong>Loreto Montero</strong> (Universidad de California, San Diego), y <strong>Paula Reyes</strong> (Universidad de Chile).</p>

    <p>El equipo tuvo una destacada participación en el panel “Estudios de Imagen, Cine y TV” con dos ponencias: <strong>“El matinal televisivo chileno como objeto de estudio en la investigación en comunicación. Una revisión sistemática de literatura científica”</strong>, presentada por Daniela Lazcano Peña y Loreto Montero; y <strong>“Matriz de análisis para la plaza pública de las mañanas chilenas”</strong>, a cargo de Lorena Antezana y Pablo Andrada. A través de estas presentaciones se dio cuenta de los primeros avances del proyecto Fondecyt que busca llenar el vacío que existe en torno a la investigación de este género en Chile, a través de la caracterización de las principales continuidades y rupturas en su estructura desde 2020, los mecanismos de interacción que estos programas televisivos establecen con sus audiencias, y la comprensión de sus respectivos usos sociales.</p>

    <p>Asimismo, los tesistas de pregrado asociados al Fondecyt, <strong>Cathalina Serin</strong> y <strong>Matías Tabilo</strong>, ambos dirigidos por el profesor Pablo Andrada de la Universidad de la Serena, tuvieron la oportunidad de presentar parte de su investigación en la sección de posters del congreso. Con ello pudieron dar cuenta de la importancia que tiene la cobertura policial en estos programas, representando el 40% del total de la transmisión en los dos matinales analizados, <em>Buenos Días a Todos</em>, de Televisión Nacional de Chile, y <em>Tu Día</em>, de Canal 13.</p>
</body>
    `
  },
  {
    id: '4',
    titulo: 'Desafíos de la Desinformación en Elecciones: El Rol de los Medios',
    fecha: '2025-03-28',
    imagen: 'https://placehold.co/600x400/FBD508/FFFFFF?text=NOTICIA+04',
    resumen: 'Analizamos cómo la desinformación afecta los procesos electorales y las estrategias que los medios están adoptando para combatirla.',
    contenidoCompleto: `
      <p>La desinformación se ha convertido en una amenaza persistente y cada vez más sofisticada para los procesos democráticos en todo el mundo, especialmente durante los períodos electorales. La facilidad con la que la información falsa o engañosa puede propagarse a través de las redes sociales y otras plataformas digitales representa un desafío significativo para la integridad de las elecciones y la confianza pública.</p>
      <p>Durante las campañas, la desinformación puede manifestarse de diversas formas: desde rumores infundados sobre candidatos, hasta la manipulación de imágenes y videos (deepfakes), o la propagación de narrativas que polarizan a la sociedad. El objetivo es a menudo influir en la opinión pública, suprimir la participación de ciertos votantes o socavar la legitimidad de los resultados electorales.</p>
      <p>Los medios de comunicación, a pesar de ser también blancos de ataques de desinformación, juegan un papel crucial en esta lucha. Su misión de informar de manera veraz y contextualizada los convierte en la primera línea de defensa contra la manipulación. Las estrategias adoptadas por los medios incluyen:</p>
      <ul>
        <li><strong>Verificación de hechos (Fact-checking):</strong> Equipos dedicados a verificar afirmaciones y desacreditar la información falsa.</li>
        <li><strong>Periodismo de investigación:</strong> Exponer las redes y motivaciones detrás de las campañas de desinformación.</li>
        <li><strong>Alfabetización mediática:</strong> Educar a la audiencia sobre cómo identificar y resistir la desinformación.</li>
        <li><strong>Colaboración:</strong> Trabajar con plataformas tecnológicas, organizaciones civiles y otros medios para compartir información y mejores prácticas.</li>
        <li><strong>Contextualización:</strong> Proporcionar el contexto necesario para que los ciudadanos comprendan la complejidad de las narrativas políticas.</li>
      </ul>
      <p>A pesar de estos esfuerzos, el volumen y la velocidad de la desinformación hacen que la tarea sea monumental. Requiere un compromiso constante, innovación tecnológica y una colaboración multilateral. El futuro de la democracia dependerá, en gran medida, de la capacidad de las sociedades para discernir la verdad del engaño en un entorno informativo cada vez más complejo.</p>
    `
  },
  {
    id: '5',
    titulo: 'Medios y Salud Mental: Abordando un Tema Tabú con Responsabilidad',
    fecha: '2025-02-10',
    imagen: 'https://placehold.co/600x400/F37022/FFFFFF?text=NOTICIA+05',
    resumen: 'Análisis sobre cómo los medios de comunicación han evolucionado en la cobertura de la salud mental, pasando de estigmas a una discusión abierta y empática.',
    contenidoCompleto: `
      <p>Durante mucho tiempo, la salud mental ha sido un tema relegado al silencio, rodeado de estigmas y malentendidos. Sin embargo, en los últimos años, ha habido un cambio notable en la forma en que los medios de comunicación abordan esta área, pasando de una cobertura sensacionalista o inexistente a una más informada, empática y responsable.</p>
      <p>Este cambio se debe a una mayor conciencia pública, el trabajo de organizaciones de salud mental y la valentía de figuras públicas al compartir sus propias experiencias. Los medios han comenzado a reconocer su papel crucial en la desestigmatización de las enfermedades mentales y en la promoción del bienestar psicológico.</p>
      <p>La cobertura actual se enfoca en:</p>
      <ul>
        <li><strong>Educación y concientización:</strong> Explicar los diferentes tipos de trastornos, sus síntomas y tratamientos disponibles.</li>
        <li><strong>Historias personales:</strong> Presentar testimonios de personas que viven con enfermedades mentales, humanizando el tema y fomentando la empatía.</li>
        <li><strong>Recursos y apoyo:</strong> Proporcionar información sobre dónde buscar ayuda profesional y grupos de apoyo.</li>
        <li><strong>Lenguaje responsable:</strong> Utilizar terminología precisa y no discriminatoria, evitando clichés y estereotipos perjudiciales.</li>
        <li><strong>Prevención y autocuidado:</strong> Promover prácticas saludables para mantener el bienestar mental.</li>
      </ul>
      <p>A pesar de los avances, persisten desafíos. La sobre-simplificación de temas complejos, la falta de contextualización y, en ocasiones, la romantización del sufrimiento mental, aún pueden ser problemas. Es vital que los medios continúen consultando a expertos, realizando una investigación exhaustiva y priorizando la seguridad y el bienestar de los entrevistados.</p>
      <p>La salud mental es un componente fundamental del bienestar general. Al abordarla con la seriedad y la sensibilidad que merece, los medios de comunicación no solo cumplen con su función informativa, sino que también contribuyen activamente a construir una sociedad más informada, comprensiva y compasiva.</p>
    `
  },
  {
    id: '6',
    titulo: 'El Futuro de la Televisión: Del Streaming a la Realidad Virtual',
    fecha: '2025-01-20',
    imagen: 'https://placehold.co/600x400/C3423F/FFFFFF?text=NOTICIA+06',
    resumen: 'Exploramos cómo la televisión está evolucionando más allá del streaming, hacia experiencias inmersivas con tecnologías como la Realidad Virtual y Aumentada.',
    contenidoCompleto: `
      <p>La televisión, ese medio que ha sido el centro de nuestros hogares por décadas, está en constante evolución. Si bien el streaming ya ha revolucionado la forma en que consumimos contenido, el futuro promete experiencias aún más inmersivas y personalizadas, impulsadas por tecnologías emergentes como la Realidad Virtual (RV) y la Realidad Aumentada (RA).</p>
      <p>Más allá de la comodidad de ver lo que queremos, cuando queremos, el próximo salto en la televisión implicará estar "dentro" de la narrativa. La Realidad Virtual podría transformar la forma en que experimentamos eventos en vivo, como conciertos, partidos deportivos o incluso coberturas de noticias. Imagina poder "estar" en la cancha de un partido o en la primera fila de un concierto desde la comodidad de tu casa.</p>
      <p>La Realidad Aumentada, por su parte, tiene el potencial de enriquecer la experiencia televisiva superponiendo información digital en el mundo real. Esto podría manifestarse en programas interactivos donde los espectadores puedan acceder a estadísticas en tiempo real de un partido sobre su mesa de centro, o participar en juegos y encuestas que interactúan con el contenido en pantalla.</p>
      <p>Los desafíos técnicos y de adopción son significativos. La necesidad de hardware especializado, la curva de aprendizaje para los usuarios y la creación de contenido inmersivo de alta calidad son barreras que deben superarse. Sin embargo, las inversiones en estos campos por parte de gigantes tecnológicos y empresas de medios sugieren que el camino hacia una televisión más inmersiva ya está trazado.</p>
      <p>El modelo de negocio también se adaptará. Veremos nuevas formas de monetización, desde suscripciones premium por experiencias inmersivas hasta la integración de publicidad contextual y no intrusiva dentro de los entornos de RV/RA. La interactividad abrirá nuevas vías para el compromiso del espectador y la recolección de datos.</p>
      <p>En definitiva, la televisión del futuro no será solo algo que miramos, sino algo en lo que participamos. La convergencia de streaming, inmersión y personalización promete una era dorada para el entretenimiento y la información, donde los límites entre el contenido y la experiencia se difuminan cada vez más.</p>
    `
  }
];

function Noticias() {
  const [selectedNews, setSelectedNews] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    window.scrollTo(0, 0);
  };

  const handleBackToGrid = () => {
    setSelectedNews(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container py-5"> {/* Contenedor de Bootstrap */}
      <motion.h1
        className="text-center mb-5" // Clases de Bootstrap para centrar y margen inferior
        style={{ color: 'var(--color-principal)' }} // Usamos tu variable CSS personalizada para el color
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Últimas Noticias
      </motion.h1>

      <AnimatePresence mode="wait">
        {selectedNews ? (
          // --- Vista de Noticia Detallada ---
          <motion.div
            key="news-detail-view"
            className="card p-4 p-md-5 mx-auto custom-news-detail-card" // Clases de Bootstrap y clase personalizada
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Imagen Principal de la Noticia */}
            <img
              src={selectedNews.imagen}
              alt={selectedNews.titulo}
              className="img-fluid rounded shadow-sm mb-4 custom-news-image" // Clases de Bootstrap para imagen responsiva y redonda
            />

            <div className="w-100 text-center text-md-start"> {/* w-100 para que ocupe todo el ancho, text-center para móvil, text-md-start para escritorio */}
              {/* Título de la Noticia */}
              <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--color-principal)' }}>
                {selectedNews.titulo}
              </h2>
              {/* Fecha de Publicación */}
              <p className="fs-5 text-muted mb-4">
                Publicado el: {formatDate(selectedNews.fecha)}
              </p>
              {/* Contenido Completo (usando dangerouslySetInnerHTML para HTML) */}
              <div
                className="lead text-dark mb-4 custom-news-content" // Clase lead de Bootstrap, text-dark y custom para el contenido
                dangerouslySetInnerHTML={{ __html: selectedNews.contenidoCompleto }}
              />

              {/* Botón Volver */}
              <motion.button
                onClick={handleBackToGrid}
                className="btn btn-primary btn-lg mt-4 custom-btn-back" // Clases de Bootstrap y tu clase personalizada
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="me-2" size={22} /> Volver a Noticias
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // --- Vista de Cuadrícula de Noticias ---
          <motion.div
            key="news-grid-view"
            className="row g-4" // Sistema de Grid de Bootstrap, g-4 para gap
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {noticias.map((news, index) => (
              <div className="col-12 col-md-4 d-flex" key={news.id}> {/* col-12 para móviles, col-md-4 para escritorio */}
                <motion.div
                  className="card custom-news-card flex-fill h-100" // Clase de Bootstrap para tarjeta y clase personalizada, flex-fill y h-100 para altura uniforme
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)' }} // Animación de hover
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Imagen de la Noticia */}
                  <img
                    src={news.imagen}
                    alt={news.titulo}
                    className="card-img-top custom-news-thumb" // Bootstrap para imagen superior de tarjeta, y clase personalizada
                  />
                  <div className="card-body text-center d-flex flex-column"> {/* card-body y flex-column para contenido flexible */}
                    {/* Fecha */}
                    <p className="card-subtitle mb-2 text-muted small">{formatDate(news.fecha)}</p> {/* card-subtitle para la fecha */}
                    {/* Título de la Noticia */}
                    <h3 className="card-title h5 fw-bold mb-3" style={{ color: 'var(--color-principal)' }}>
                      {news.titulo}
                    </h3>
                    {/* Resumen */}
                    <p className="card-text mb-4 text-justify">{news.resumen}</p> {/* card-text y text-justify */}

                    {/* Botón "Leer Más" */}
                    <motion.button
                      onClick={() => handleNewsClick(news)}
                      className="btn btn-outline-primary mt-auto custom-btn-card" // Botón de Bootstrap con tu clase personalizada, mt-auto para alinear al final
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Leer Más
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

export default Noticias;