import React from 'react';
import { motion } from 'framer-motion';

function Contacto() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="mb-5 text-center custom-h1">Contacto</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md" // Added some styling for visibility
      >
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Correo</label>
          <input 
            type="email" 
            className="form-control" 
            id="emailInput" 
            placeholder="name@ejemplo.com" 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="commentTextarea" className="form-label">Déjanos tu comentario</label>
          <textarea 
            className="form-control" 
            id="commentTextarea" 
            rows="3"
          ></textarea>
        </div>
        
        {/* Added a button to make the form functional */}
        <button className="btn btn-primary w-100">Enviar</button>
      </motion.div>
    </div>
  );
}

export default Contacto;