// src/context/AuthContext.jsx (CORREGIDO Y OPTIMIZADO)
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // <-- USAMOS NAMED IMPORT

const AuthContext = createContext(null);
const API_URL = 'https://matinales-chile-api.fly.dev/';

export const AuthProvider = ({ children }) => {
    // 1. Estados
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Función de Logout (Centralizada y envuelta en useCallback)
    // Centralizarla evita redefiniciones redundantes y problemas de closure.
    const handleLogout = useCallback(() => {
        console.log("Cerrando sesión y limpiando token.");
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }, []); // 🚨 Dependencias vacías: solo se crea una vez.

    // 3. Efecto para decodificar el token al cargar la app o cambiar el token
    useEffect(() => {
        // Marcamos isLoading como true al inicio del efecto
        setIsLoading(true);

        if (token) {
            try {
                // Si el import con llaves funciona, esta línea es correcta
                const decodedUser = jwtDecode(token);
                // Verificar si el token ha expirado
                if (decodedUser.exp * 1000 > Date.now()) {
                    setUser(decodedUser);
                } else {
                    console.log("Token expirado. Limpiando...");
                    handleLogout(); // Usamos la función centralizada
                }
            } catch (e) {
                console.error("Error decodificando el token:", e);
                handleLogout(); // Usamos la función centralizada
            }
        } else {
            // No hay token, aseguramos que el usuario esté nulo
            setUser(null);
        }
        
        // Marcamos isLoading como false al final del efecto
        setIsLoading(false);
    }, [token, handleLogout]); // 🚨 handleLogout debe ser dependencia si no usamos useCallback, 
                             // ¡pero como usamos useCallback, es estable! (aunque la pondré por seguridad)

    // 4. Función de Login
    const handleLogin = async (username, password) => {
        // 🚨 Eliminamos la re-definición redundante de handleLogout aquí.
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                // Manejo detallado de errores
                const errorData = await response.json().catch(() => ({ message: 'Respuesta inválida del servidor' }));
                throw new Error(errorData.message || 'Error de credenciales, intente nuevamente.');
            }

            const data = await response.json();
            const newToken = data.token;

            // Almacenar y actualizar estados (disparará el useEffect)
            localStorage.setItem('token', newToken);
            setToken(newToken); 
            return true; 

        } catch (error) {
            console.error("Fallo de autenticación:", error.message);
            // No es necesario llamar a handleLogout aquí a menos que quieras limpiar
            // el localStorage en caso de error de red, pero lo dejamos fuera por ahora.
            throw error; // Propagar el error para mostrarlo en el formulario
        }
    };

    // 5. Verificador de roles (Esta lógica es perfecta)
    const hasPermission = (requiredRole) => {
        if (!user) return false;
        // Asumiendo que el role 'admin' tiene todos los permisos
        return user.role === 'admin' || user.role === requiredRole; 
    };
    
    // 6. Proveer el contexto
    const contextValue = {
        token,
        user,
        isLoggedIn: !!user,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        hasPermission,
        userRole: user?.role,
    };

    if (isLoading) return <div className="text-center p-5">Cargando sesión...</div>;

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);