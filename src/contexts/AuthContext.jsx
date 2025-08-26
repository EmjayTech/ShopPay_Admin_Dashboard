// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('shoppay_admin_token');
    const userData = localStorage.getItem('shoppay_admin_user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock API call - replace with real API
      if (email === 'admin@shoppay.com' && password === 'password') {
        const userData = {
          id: 1,
          name: 'Admin User',
          email: 'admin@shoppay.com',
          role: 'admin',
          avatar: '/avatars/admin.png'
        };
        
        setUser(userData);
        localStorage.setItem('shoppay_admin_token', 'mock_jwt_token');
        localStorage.setItem('shoppay_admin_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shoppay_admin_token');
    localStorage.removeItem('shoppay_admin_user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};