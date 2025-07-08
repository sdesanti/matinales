// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-fondecyt.png';
import '../index.css'; 


function Navbar() {
  return (
    <nav className="navbar shadow-sm" style={{backgroundColor: 'white' }}>
      <div className="container">
      <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo Fondecyt Matinales" height="80" />
      </Link>
        <button className="navbar-toggler .text-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/quienes-somos">Quiénes Somos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/investigadores">Investigadores</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/publicaciones">Publicaciones</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/noticias">Noticias</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/videos">Videos</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
