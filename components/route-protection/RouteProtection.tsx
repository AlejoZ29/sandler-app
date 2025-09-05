'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

interface RouteProtectionProps {
  children: React.ReactNode;
  requireVerification?: boolean;
  requireFormCompletion?: boolean;
}

export const RouteProtection: React.FC<RouteProtectionProps> = ({
  children,
  requireVerification = false,
  requireFormCompletion = false,
}) => {
  const { isVerified, isFormCompleted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si requiere verificación y no está verificado, redirigir al inicio
    if (requireVerification && !isVerified) {
      router.replace('/');
      return;
    }

    // Si requiere formulario completado y no está completado, redirigir al formulario
    if (requireFormCompletion && !isFormCompleted) {
      if (isVerified) {
        router.replace('/form');
      } else {
        router.replace('/');
      }
      return;
    }
  }, [isVerified, isFormCompleted, requireVerification, requireFormCompletion, router]);

  // Si se requiere verificación y no está verificado, no mostrar contenido
  if (requireVerification && !isVerified) {
    return null;
  }

  // Si se requiere formulario completado y no está completado, no mostrar contenido
  if (requireFormCompletion && !isFormCompleted) {
    return null;
  }

  return <>{children}</>;
};
