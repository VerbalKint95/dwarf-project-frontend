// utils/AuthContext.js

import { createContext, useState, useEffect } from 'react';
import { isAuthenticated, login as authLogin, register as authRegister, logout as authLogout, isAdmin } from './auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuth) {
        const adminStatus = await isAdmin();
        setIsUserAdmin(adminStatus);
      } else {
        setIsUserAdmin(false);
      }
    };
    checkAdminStatus();
  }, [isAuth]);
  
  const login = async (username, password) => {
    logout();
    await authLogin(username, password);
    setIsAuth(true);
    setIsUserAdmin(isAdmin());
  };

  const register = async (username, password) => {
    logout();
    await authRegister(username, password);
    setIsAuth(true);
    setIsUserAdmin(isAdmin());
  };

  const logout = () => {
    authLogout();
    setIsAuth(false);
    setIsUserAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, isUserAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
