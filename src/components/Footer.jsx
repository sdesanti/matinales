// src/components/Footer.jsx

function Footer() {
    return (
      <footer className="bg-blanco text-center py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} Fondecyt Matinales</p>
          <p className="mb-0">
            Proyecto FONDECYT N°1240145 | Facultad de Comunicación e Imagen – Universidad de Chile
          </p>
        </div>
      </footer>
    )
  }

export default Footer;
  