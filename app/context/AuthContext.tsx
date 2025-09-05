'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isVerified: boolean;
  isFormCompleted: boolean;
  setVerified: () => void;
  setFormCompleted: () => void;
  resetAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);

  // Cargar estado desde sessionStorage al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verified = sessionStorage.getItem('isVerified') === 'true';
      const formCompleted = sessionStorage.getItem('isFormCompleted') === 'true';
      setIsVerified(verified);
      setIsFormCompleted(formCompleted);
    }
  }, []);

  const setVerified = () => {
    setIsVerified(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isVerified', 'true');
    }
  };

  const setFormCompleted = () => {
    setIsFormCompleted(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isFormCompleted', 'true');
    }
  };

  const resetAuth = () => {
    setIsVerified(false);
    setIsFormCompleted(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isVerified');
      sessionStorage.removeItem('isFormCompleted');
    }
  };

  return (
    <AuthContext.Provider value={{
      isVerified,
      isFormCompleted,
      setVerified,
      setFormCompleted,
      resetAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
