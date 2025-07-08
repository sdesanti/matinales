// src/components/Investigadores.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
// Asegúrate de que las rutas a los assets son correctas, especialmente para las fotos de los responsables.

// Datos de ejemplo para los responsables (sin cambios, asumiendo que las fotos son URLs válidas)
const responsables = [
  {
    id: '1',
    nombre: 'Lorena Antezana Barrios',
    cargo: 'Investigadora Responsable',
    foto: 'https://placehold.co/150x150/F45A29/FFFFFF?text=LA',
    resenaCorta: 'Su trabajo se enfoca en estudios de recepción, consumo crítico de medios y análisis de televisión. Es directora del Núcleo de Investigación en Televisión y Sociedad de la Universidad de Chile. ',
    resenaLarga: 'Es profesora Titular de la Universidad de Chile. Periodista y Magíster en Comunicación Social (Universidad de Chile), Doctora en Comunicación e Información (Universidad Católica de Lovaina). Su trabajo se enfoca en estudios de recepción, consumo crítico de medios y análisis de televisión. Es directora del Núcleo de Investigación en Televisión y Sociedad de la Universidad de Chile. Es autora, junto a Cristian Cabalin del libro Miradas al pasado. Lecturas generacionales de series de ficción televisiva sobre el Golpe de estado y la Dictadura en Chile (2022, Editorial Universitaria); y de los artículos: Las series chilenas en la era del streaming: Panorama y desafíos para la formación ciudadana (2024, Les Cahiers ALHIM) y con Eduardo Santa Cruz, La ficción audiovisual histórica en Chile (1960-2020). Continuidades y rupturas (2023, Revista de Historia Social y de las Mentalidades).'
  },
  {
    id: '2',
    nombre: 'Daniela Lazcano Peña',
    cargo: 'Coinvestigadora',
    foto: 'https://placehold.co/150x150/F8991D/FFFFFF?text=DL',
    resenaCorta: 'Actualmente, es investigadora principal del Núcleo Milenio para el Estudio de la Política, Opinión Pública y Medios en Chile (MEPOP). ',
    resenaLarga: 'Es Doctora en Comunicación Social de la Universidad Pompeu Fabra. Obtuvo una maestría en Comunicación Social en la Universidad de Chile y se formó como periodista en la Pontificia Universidad Católica de Valparaíso (Chile). Es académica de la Escuela de Periodismo de la Pontificia Universidad Católica de Valparaíso (PUCV), donde dirige el proyecto CUVIC - Colectivo Universitario de Vinculación y Comunicación Ciudadana-, iniciativa que tiene como objetivo la articulación universidad-comunidad local. Actualmente, es investigadora principal del Núcleo Milenio para el Estudio de la Política, Opinión Pública y Medios en Chile (MEPOP). En el ámbito de la investigación, sus áreas de interés son el estudio del campo académico de la Comunicación y la enseñanza del periodismo, desde donde ha abordado tanto la investigación sobre alfabetización mediática en el país, como sus desafíos en la propia enseñanza del periodismo.'
  },
  {
    id: '3',
    nombre: 'Pablo Andrada Sola',
    cargo: 'Coinvestigador',
    foto: 'https://placehold.co/150x150/FBD508/FFFFFF?text=PA',
    resenaCorta: 'Participa como investigador en el estudio internacional sobre consumo de microcontenidos informativos en estudiantes de comunicación en Latinoamérica.',
    resenaLarga: 'Es Doctor en Comunicación por la Universidad Pompeu Fabra y magíster en Ciencias Sociales por la Universidad de Chile, donde también se tituló como periodista. Es profesor asociado de la Universidad de La Serena y coinvestigador del proyecto “Comunicación local y cambio social en la radio y televisión del norte de Chile” (2023-2025). Coordina los Grupos Temáticos de la Asociación de Investigadores e Investigadoras de Chile, INCOM. Participa como investigador en el estudio internacional sobre consumo de microcontenidos informativos en estudiantes de Latinoamérica. Sus áreas de investigación incluyen la comunicación y educación, estudios de medios audiovisuales y digitales, y audiencias jóvenes y adolescentes.'
  },
  {
    id: '4',
    nombre: 'Cristian Cabalin',
    cargo: 'Coinvestigador',
    foto: 'https://placehold.co/150x150/F37022/FFFFFF?text=CC',
    resenaCorta: 'Se ha especializado en la relación entre comunicación y políticas educacionales.',
    resenaLarga: 'Es doctor en Estudios de Políticas Educacionales por la Universidad de Illinois, Estados Unidos, y magíster en Antropología y periodista por la Universidad de Chile. Actualmente se desempeña como Profesor Asociado del Instituto de Estudios Avanzados en Educación y de la Facultad de Comunicación e Imagen de la Universidad de Chile, donde también ejerce como jefe de Comunicaciones de Rectoría. Se ha especializado en la relación entre comunicación y políticas educacionales. Es investigador responsable del Proyecto Fondecyt 1250492 sobre el Sistema de Admisión Escolar e investigador del Núcleo Milenio para el Estudio de la Política, Opinión Pública y Medios en Chile (MEPOP). También ha desarrollado estudios sobre comunicación política, periodismo y televisión, donde ha sido co-investigador de proyectos Fondecyt y del Fondo Audiovisual.'
  },
  {
    id: '5',
    nombre: 'Loreto Montero',
    cargo: 'Asistente',
    foto: 'https://placehold.co/150x150/C3423F/FFFFFF?text=LM',
    resenaCorta: 'Candidata a Doctora en el Departamento de Comunicaciones de la Universidad de California, San Diego con la tesis “La tele mienta: Estrategias de sobrevivencia de la televisión chilena durante el estallido”.',
    resenaLarga: 'Es periodista, licenciada en Comunicación Social y Magister en Historia y Teoría del Arte por la Universidad de Chile. Fue becaria ANID-Fullbright y actualmente es candidata a Doctora en el Departamento de Comunicaciones de la Universidad de California, San Diego con la tesis “La tele mienta: Estrategias de sobrevivencia de la televisión chilena durante el estallido”. Ha sido docente del curso de Estudios Culturales y ayudante de diversos ramos y proyectos de investigación sobre el rol de los medios, el periodismo y la televisión, en la Facultad de Comunicación e Imagen, FCEI de la Universidad de Chile. También ha sido mentora de estudiantes de doctorado, asistente de docencia y profesora de estudiantes de pregrado en el marco del Summer Graduate Teacher Program de la Univerisdad de California, San Diego'
  },
  {
    id: '6',
    nombre: 'Paula Reyes Pereira ',
    cargo: 'Tesista',
    foto: 'https://placehold.co/150x150/F45A29/FFFFFF?text=PR',
    resenaCorta: 'Utilizando la metodología de análisis de contenido, desarrolla una investigación que pretende identificar las estrategias narrativas utilizadas para representar a las mujeres en los matinales chilenos.',
    resenaLarga: 'Periodista y licenciada en Comunicación Social por la Universidad de Chile. Magíster (c) en Comunicación Política de la misma casa de estudios. Bolsista del Programa Move la América para la realización de pesquisa sobre matinales televisivos en la Universidade Federal da Paraíba (UFPB), Brasil. Tesista del proyecto Fondecyt Regular N°1240145 "La plaza pública de las mañanas: matinales televisivos y sus audiencias en un contexto de democracias fragmentadas". Utilizando la metodología de análisis de contenido, desarrolla una investigación que pretende identificar las estrategias narrativas utilizadas para representar a las mujeres en los matinales chilenos, teniendo por hipótesis que estas estrategias mantienen a dicho género en una dimensión privada.'
  },
  {
    id: '7',
    nombre: 'Esperanza Soto ',
    cargo: 'Asistente',
    foto: 'https://placehold.co/150x150/F45A28/FFFFFF?text=ES',
    resenaCorta: 'Ha trabajado en proyectos Fondecyt con la Universidad de Chile y la UAI.',
    resenaLarga: 'Es socióloga de la Universidad de Chile, con experiencia en investigación aplicada en ciudadanía digital, medio ambiente y análisis de medios. La televisión la apasiona, ya que creció en ese entorno por motivos familiares, lo que motivó su interés por comprenderla desde su dimensión sociológica. Ha trabajado en proyectos Fondecyt con la Universidad de Chile y la UAI, en análisis cualitativo y trabajo de campo. Le interesa vincular la investigación con el territorio, a través de metodologías participativas y una mirada crítica y comprometida.'
  }
];

function Investigadores() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const handleBackToGrid = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="container py-5"> {/* Usar container y padding de Bootstrap */}
      <motion.h1
        className="text-center mb-5" // Clases de Bootstrap para centrar y margen inferior
        style={{ color: 'var(--color-principal)' }} // Usamos tu variable CSS personalizada para el color
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestro Equipo
      </motion.h1>

      <AnimatePresence mode="wait">
        {selectedPerson ? (
          // Vista de reseña detallada
          <motion.div
            key="detail-view"
            className="card p-4 p-md-5 mx-auto custom-detail-card" // Clases de Bootstrap para card y padding, y clase personalizada
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="row g-4 align-items-center"> {/* Grid de Bootstrap para la distribución interna */}
              <div className="col-md-4 text-center">
                <img
                  src={selectedPerson.foto}
                  alt={selectedPerson.nombre}
                  className="img-fluid rounded-circle mb-3 mb-md-0 shadow-sm custom-person-photo" // Clases de Bootstrap para imagen responsiva y circular
                />
              </div>
              <div className="col-md-8 text-center text-md-start">
                <h2 className="display-5 fw-bold mb-2" style={{ color: 'var(--color-principal)' }}>{selectedPerson.nombre}</h2> {/* Clases de Bootstrap para tamaño de texto y negrita */}
                <p className="fs-4 text-secondary mb-4">{selectedPerson.cargo}</p> {/* Clases de Bootstrap para tamaño de texto y color */}
                <p className="lead text-dark">{selectedPerson.resenaLarga}</p> {/* Clase de Bootstrap para texto principal */}
                <motion.button
                  onClick={handleBackToGrid}
                  className="btn btn-primary btn-lg mt-4 custom-btn-back" // Clases de Bootstrap para botón
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="me-2" size={22} /> Volver al equipo
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Vista de cuadrícula de tarjetas
          <motion.div
            key="grid-view"
            className="row g-4" // Sistema de Grid de Bootstrap, g-4 para gap
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {responsables.map((person, index) => (
              <div className="col-12 col-md-4 d-flex" key={person.id}> {/* col-12 para móviles, col-md-4 para escritorio */}
                <motion.div
                  className="card custom-person-card flex-fill text-center p-4 h-100" // Clase de Bootstrap para tarjeta y clase personalizada, flex-fill y h-100 para altura uniforme
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Ajustar el delay para una animación escalonada
                  whileHover={{ scale: 1.03, boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)' }} // Animación de hover
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Imagen del perfil */}
                  <img
                    src={person.foto}
                    alt={person.nombre}
                    className="img-fluid rounded-circle mx-auto mb-3 custom-person-thumb" // Clases de Bootstrap
                  />
                  {/* Nombre */}
                  <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--color-principal)' }}>{person.nombre}</h3> {/* h5 de Bootstrap */}
                  {/* Cargo */}
                  <p className="text-muted small mb-3">{person.cargo}</p> {/* text-muted para texto más suave, small para más pequeño */}
                  {/* Reseña Corta */}
                  <p className="card-text mb-4 text-justify">{person.resenaCorta}</p> {/* card-text y text-justify para alineación */}

                  {/* Botón "Ver Perfil" con estilo btn-modern */}
                  <motion.button
                    onClick={() => handlePersonClick(person)}
                    className="btn btn-outline-primary mt-auto custom-btn-card" // mt-auto para que el botón esté siempre abajo
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Perfil
                  </motion.button>
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Investigadores;