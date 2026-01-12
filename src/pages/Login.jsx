// src/pages/Login.jsx (FINAL)

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// 🚨 Importar useLocation
import { useNavigate, useLocation } from 'react-router-dom'; 
import { LogIn } from 'lucide-react';

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const { login } = useAuth();
const navigate = useNavigate();
    // 🚨 1. Obtener la ubicación actual
    const location = useLocation(); 

    // 🚨 2. Determinar la ruta de destino: 
    // Si hay un estado 'from' (proveniente de ProtectedRoute), usar ese pathname.
    const from = location.state?.from?.pathname || '/admin';


const handleSubmit = async (e) => {
e.preventDefault();
setError(null);
try {
 await login(username, password); 
            // 🚨 CAMBIO: Redirigir al destino determinado
 navigate(from, { replace: true }); 
 
        } catch (err) {
 setError(err.message || 'Error al iniciar sesión. Inténtelo de nuevo.');
}
};

return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-header bg-primary text-white text-center">
                    <h4 className="mb-0"><LogIn className="me-2" />Acceso de Administración</h4>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {error && <div className="alert alert-danger small">{error}</div>}

                        <button type="submit" className="btn btn-primary w-100">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;