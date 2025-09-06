'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isVerified: boolean;
  isFormCompleted: boolean;
  userRegistrationId: string | null;
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
  const [userRegistrationId, setUserRegistrationId] = useState<string | null>(null);

  // Función para generar un identificador único
  const generateRegistrationId = (): string => {
    return `sandler_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Cargar estado desde storage al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar estado de verificación desde sessionStorage (se pierde al cerrar navegador)
      const verified = sessionStorage.getItem('isVerified') === 'true';
      setIsVerified(verified);

      // Verificar registro exitoso desde localStorage (persiste entre sesiones)
      const registrationId = localStorage.getItem('sandler_user_registration_id');
      if (registrationId) {
        setUserRegistrationId(registrationId);
        setIsFormCompleted(true);
        console.log('Usuario previamente registrado encontrado:', registrationId);
      }
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
      // Generar y guardar identificador único en localStorage para persistencia entre sesiones
      const registrationId = generateRegistrationId();
      setUserRegistrationId(registrationId);
      localStorage.setItem('sandler_user_registration_id', registrationId);
      
      // También guardar timestamp del registro para auditoría
      localStorage.setItem('sandler_registration_date', new Date().toISOString());
      console.log('Registro exitoso guardado con ID:', registrationId);
    }
  };

  const resetAuth = () => {
    setIsVerified(false);
    setIsFormCompleted(false);
    setUserRegistrationId(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isVerified');
      localStorage.removeItem('sandler_user_registration_id');
      localStorage.removeItem('sandler_registration_date');
    }
  };

  return (
    <AuthContext.Provider value={{
      isVerified,
      isFormCompleted,
      userRegistrationId,
      setVerified,
      setFormCompleted,
      resetAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
