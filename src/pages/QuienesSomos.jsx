import React from 'react';
import { motion } from 'framer-motion';

function QuienesSomos() {
  return (
    // Contenedor principal de la página. 'mx-auto' centra el contenido, 'px-4' añade padding horizontal.
    // 'py-8' añade padding vertical. 'max-w-4xl' limita el ancho del contenido para mejor legibilidad.
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Título principal de la sección "¿Quiénes Somos?" */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-orange-600" // Clases Tailwind para tamaño, negrita, centrado, margen inferior y color.
        initial={{ opacity: 0, y: -20 }} // Animación inicial: opacidad 0, movido 20px hacia arriba
        animate={{ opacity: 1, y: 0 }} // Animación final: opacidad 1, posición original
        transition={{ duration: 0.6 }} // Duración de la transición
      >
        ¿Quiénes Somos?
      </motion.h1>

      {/* Sección principal del contenido de texto */}
      <motion.section
        className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8" // Fondo blanco, bordes redondeados, sombra, padding responsivo, margen inferior.
        initial={{ opacity: 0, y: 20 }} // Animación inicial
        animate={{ opacity: 1, y: 0 }} // Animación final
        transition={{ delay: 0.2, duration: 0.5 }} // Retraso y duración de la transición
      >
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          En sociedades como la nuestra, los medios de
          comunicación cumplen un papel relevante al ser los responsables de poner en
          circulación (y traducir para públicos no especializados) distintos discursos
          que permiten a la ciudadanía participar del debate democrático, informarse de
          lo que sucede en su entorno, formarse una opinión y conocer e interactuar (de
          manera mediada) con quienes los representan. Esto es especialmente importante
          en relación con los matinales televisivos que llegan a personas de estratos
          socioeconómicos más bajos (de acuerdo a la medición de audiencia realizada por Kantar Ibope
          de abril de 2023) <span className="text-gray-600 text-sm italic">[LM1]</span> que no suelen informarse a través de otros medios de
          comunicación.
        </p>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          Previo al estallido social de 2019, estos programas
          ofrecían una variada gama de contenidos como clima, opinión, farándula, cocina,
          despachos, reportajes, entre otros. Posterior a este, las críticas a la
          cobertura sesgada que realizaban provocaron un giro en su línea editorial convirtiéndolos
          en espacios altamente dependientes de la contingencia nacional, mutando su
          formato a una especie de extensión de los noticieros nacionales de la mañana y
          mediodía. Incluso, cambiaron a sus animadores y animadoras, incorporando a
          periodistas en esas labores de conducción.
        </p>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          Así, la estructura de los matinales se modificó
          (<span className="font-semibold">ruptura</span>), apostando por reportajes de investigación, temas informativos y
          editoriales (CNTV, 2020; Coria, 2021), pero también mantuvo características del
          formato de entretención clásico (<span className="font-semibold">continuidad</span>), para no distanciarse del
          contrato de lectura establecido con sus audiencias (Antezana y Cabalin, 2022).
          De todos modos, ahora al centrarse en la información intentan “conectarse con
          una agenda pública incorporando actores políticos y abriendo un espacio a la
          discusión de temas de interés país y llevando el pulso de la opinión pública”
          (Jiménez, 2021, p.6), lo que los obliga a posicionarse como espacios con un
          alto componente de opinión y que incluso a nivel informativo adquieren mayor
          relevancia que los propios noticieros televisivos.
        </p>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          De esta forma, los matinales aparentemente se han
          autoasignado el rol de <span className="font-semibold">canalizadores de las inquietudes ciudadanas</span>. Es decir,
          se presentan como un nexo entre la ciudadanía y el mundo político -una bisagra
          relacional (Antezana, 2009)- que posibilitaría el desarrollo de un espacio para
          el ciudadano más allá de las redes sociales, una suerte de voz de quien
          habitualmente resulta ser beneficiario de las ayudas sociales o quien presiona
          por ayuda social. Con ello, los matinales cumplirían una función social
          especialmente relevante en un contexto político de creciente polarización,
          agitación social y desconfianza institucional, que ha llevado a Entman y Usher
          (2018) a llamarlo el momento de las <span className="font-semibold">democracias fragmentadas o fracturadas</span>,
          donde los espacios tradicionales de socialización política han sido
          sobrepasados.
        </p>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          Este tipo de programas está, en la práctica, cumpliendo una función socialización
          política que otros medios cumplieron antes -como la prensa escrita o radio
          (Winocur, 2002)- permitiendo la conexión de los ciudadanos con los asuntos
          públicos y la visibilización de sus problemas, preocupaciones e inquietudes en
          la esfera pública.
        </p>

        {/* Subtítulo para la sección de investigación */}
        <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-600">
          Nuestra Investigación
        </h2>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          Asumiendo que los matinales televisivos son nuevas plazas de discusión de lo
          público-político, en esta investigación nos preguntamos <span className="font-semibold">¿Cuál es la función
          social de los matinales televisivos en la construcción de una agenda de
          discusión pública?</span> Nos interesa
          entender el tipo de información (temas) que estos seleccionan, la forma en que
          construyen y entregan las noticias a sus telespectadores, el rol mediador que
          asumen en esta nueva plaza pública y lo que hacen las audiencias con ellos,
          considerando que las diferencias de capital socio-cultural y la centralización
          geográfica de la producción de la información (concentrada en la Región
          Metropolitana) determinan en gran medida las posibilidades de acceso, búsqueda,
          recepción y comprensión de información. Por ello, desarrollaremos esta
          investigación en sectores medios y populares de la Región Metropolitana, pero
          también de las regiones de Valparaíso y Coquimbo.
        </p>

        {/* Subtítulo para objetivos específicos */}
        <h3 className="text-xl font-bold mt-6 mb-3 text-orange-600">
          Objetivos Específicos
        </h3>
        {/* Lista de objetivos */}
        <ul className="list-disc list-inside mb-4 text-gray-800 leading-relaxed text-lg space-y-2">
          <li>
            Caracterizar las principales continuidades y rupturas en la estructura de los
            matinales televisivos a partir del estallido social de 2019;
          </li>
          <li>
            Establecer los mecanismos de interacción de los matinales televisivos con sus
            audiencias y otros actores sociales relevantes y
          </li>
          <li>
            Identificar las expectativas y usos de las audiencias al visionar los matinales
            televisivos.
          </li>
        </ul>

        {/* Subtítulo para diseño metodológico */}
        <h3 className="text-xl font-bold mt-6 mb-3 text-orange-600">
          Diseño Metodológico
        </h3>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          El diseño metodológico será <span className="font-semibold">secuencial y de desarrollo</span> (Greene 2007),
          es decir, la fase de análisis de los matinales televisivos nutrirá la siguiente
          referida al estudio de las audiencias. Asumimos la necesidad de emplear
          <span className="font-semibold"> técnicas cualitativas</span> que permitan un alto grado de interpretación del objeto
          de estudio (análisis temático y narratológico), pero a la vez técnicas que
          permitan describir las prácticas de ese consumo televisivo (entrevistas y
          grupos focales).
        </p>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          Estudiaremos los matinales <span className="font-semibold">Muy
          Buenos Días</span> (TVN), <span className="font-semibold">Mucho Gusto</span> (Mega), <span className="font-semibold">Contigo en la mañana</span>
          (Chilevisión) y <span className="font-semibold">Bienvenidos/Tú día</span> (Canal 13). En cuanto al estudio de
          recepción se focalizará en la población que más consume estos programas
          (considerando edades, segmento socio económico y género) además de un criterio
          espacial (zona central/regiones).
        </p>
        <p className="mb-4 text-gray-800 leading-relaxed text-lg">
          Esperamos como productos
          de esta investigación, la publicación de al menos cuatro artículos en revistas
          de corriente principal y la difusión del estudio a través de una página web y
          de podcast (2) y la elaboración de un policy paper con recomendaciones para la
          industria televisiva.
        </p>

        {/* Subtítulo para bibliografía */}
        <h3 className="text-xl font-bold mt-6 mb-3 text-orange-600">
          Bibliografía
        </h3>
        {/* Lista de bibliografía */}
        <ul className="list-disc list-inside text-gray-800 leading-relaxed text-base space-y-1">
          <li>Antezana, L. (2009). Estrategias narrativas de proximización del noticiero televisivo chileno. Folios 21 – 22, pp.109–124.</li>
          <li>Antezana, L. y Cabalin, C. (2022). Miradas al pasado. Lecturas generacionales de series de ficción televisiva sobre el Golpe de Estado y la dictadura en Chile. Santiago: Editorial Universitaria.</li>
          <li>CNTV (2020). Estudio Exploratorio: Matinales, Actores Políticos y Pandemia. Disponible en: https://cntv.cl/estudio/matinales-actores-politicos-y-pandemia/</li>
          <li>Coria, R. (13 noviembre 2021). “Matinales: Los ganadores y perdedores de las mañanas”. El Filtrador. Disponible en: https://elfiltrador.com/matinales-los-ganadores-y-perdedores-de-las-mananas/</li>
          <li>Entman, R. M., & Usher, N. (2018). Framing in a fractured democracy: Impacts of digital technology on ideology, power, and cascading network activation. Journal of Communication, 68(2), 298-308.</li>
          <li>Greene, J. C. (2007). Mixed methods in social inquiry.San Francisco, CA: Jossey-Bass.</li>
          <li>Jiménez, P. (2021). Pandemia y matinales: El surgimiento y consolidación de un nuevo espacio para el desarrollo del espectáculo político. Tesis para optar al grado de Magíster en Comunicación Política. Universidad de Chile.</li>
          <li>Winocur, R. (2002) Ciudadanos mediáticos. La construcción de lo público en la radio. Barcelona: Editorial Gedisa S.A.</li>
        </ul>
        {/* Nota del editor */}
        <p className="mt-4 text-gray-600 text-sm italic">
          [LM1] Se incluye como referencia? En el proyecto no salía...
        </p>
      </motion.section>
    </div>
  );
}

export default QuienesSomos;