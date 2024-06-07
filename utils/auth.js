import api from './api';
import { jwtDecode } from "jwt-decode"; // Use 'jwt-decode' instead of 'jwtDecode'

export const login = async (username, password) => {
  const response = await api.post('/auth/authenticate', { username, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return token;
};

export const register = async (username, password) => {
  const response = await api.post('/auth/register', { username, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return token;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Get current time in seconds
      
      // Check if token expiration time is greater than current time
      if (decodedToken.exp > currentTime) {
        return true; // Token is valid
      } else {
        // Token has expired, delete it
        logout();
        return false;
      }
    }
  }
  return false; // No token or token is expired
};


export const getUserRole = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      // Vous pouvez définir l'URL de votre endpoint getUserRole
      const response = await api.get('/user/role', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.role;
    }
  } catch (error) {
    console.error('Failed to get user role:', error);
  }
};

export const isAdmin = async () => {
  const role = await getUserRole(); // Récupère le rôle de l'utilisateur
  return role === 'ADMIN'; // Renvoie vrai si l'utilisateur est un administrateur, sinon faux
};