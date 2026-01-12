import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';

// 🚨 CORRECCIÓN 1: La base es solo el host y puerto.
const API_BASE_URL = 'http://localhost:3001'; 

/**
 * Hook para manejar peticiones autenticadas a la API (POST, PUT, DELETE).
 * @returns {object} Funciones para peticiones HTTP: get, post, put, remove
 */
export const useApi = () => {
    const { token, isLoggedIn, logout } = useAuth();

    const fetchAuthenticated = useCallback(async (endpoint, method = 'GET', body = null, isFormData = false) => {
        
        const headers = {};
        
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
            body: isFormData ? body : (body ? JSON.stringify(body) : null),
        };

        // 🚨 CORRECCIÓN 2: Asegurar que la URL incluye '/api' entre la base y el endpoint.
        // El endpoint siempre debe comenzar con '/' (e.g., '/noticias')
        const url = `${API_BASE_URL}/api${endpoint}`;

        const response = await fetch(url, config);

        // ... (resto de la lógica de error, 401, 403, etc.)
        // La lógica de manejo de errores permanece igual...
        if (response.status === 401 || response.status === 403) {
            console.warn('Sesión expirada o no autorizada. Cerrando sesión.');
            logout(); // Ejecuta el logout para limpiar el token
            throw new Error('Sesión expirada o no autorizada. Por favor, vuelva a iniciar sesión.');
        }

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Error del servidor: ${response.status} ${response.statusText}`;
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        if (response.status === 204) {
             return {};
        }

        return response.json();
    }, [token, isLoggedIn, logout]); 


    // ... (resto de las funciones get, post, put, remove, permanecen iguales)

    const get = useCallback((endpoint) => {
        return fetchAuthenticated(endpoint, 'GET');
    }, [fetchAuthenticated]);
    
    const post = useCallback((endpoint, body, isFormData = false) => {
        return fetchAuthenticated(endpoint, 'POST', body, isFormData);
    }, [fetchAuthenticated]);

    const put = useCallback((endpoint, body, isFormData = false) => {
        return fetchAuthenticated(endpoint, 'PUT', body, isFormData);
    }, [fetchAuthenticated]);
    
    const remove = useCallback((endpoint) => {
        return fetchAuthenticated(endpoint, 'DELETE');
    }, [fetchAuthenticated]);


    return {
        get,
        post,
        put,
        remove,
    };
};