'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, CodeInput } from "@/components";
import { useAuth } from "@/app/context/AuthContext";

const VALID_CODE = "090966";

export const VerificationFlow = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(true);
  const router = useRouter();
  const { setVerified, isFormCompleted, userRegistrationId } = useAuth();

  // Verificar si el usuario ya está registrado y redirigir automáticamente
  useEffect(() => {
    const checkRegistration = () => {
      if (isFormCompleted && userRegistrationId) {
        router.replace('/home');
        return;
      }
      // Si no está registrado, mostrar la página normal
      setIsCheckingRegistration(false);
    };

    // Pequeño delay para asegurar que el contexto esté completamente cargado
    const timer = setTimeout(checkRegistration, 100);
    return () => clearTimeout(timer);
  }, [isFormCompleted, userRegistrationId, router]);

  // Mostrar loading mientras se verifica el estado de registro
  if (isCheckingRegistration) {
    return (
      <div className="font-sans flex flex-col items-center justify-center h-screen p-8 sm:p-20 page-start">
        <div className="spotlight-center"></div>
        <div className="spotlight-left"></div>
        <div className="spotlight-right"></div>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleEnterClick = () => {
    setIsVerifying(true);
    setError("");
  };

  const handleCodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(numericValue);
    setError("");
  };

  const handleVerify = () => {
    if (code === VALID_CODE) {
      setVerified();
      router.push('/form');
    } else {
      setError("El código que ingresaste no es válido, por favor inténtalo de nuevo");
      setCode("");
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen p-8 sm:p-20 page-start">
      {/* Theater Spotlights */}
      <div className="spotlight-center"></div>
      <div className="spotlight-left"></div>
      <div className="spotlight-right"></div>
      <div className={`transition-all duration-500 ease-in-out w-full mb-10  ${isVerifying ? 'transform -translate-y-8 scale-75' : ''}`}>
        {!isVerifying && (
          <Image
            src="/assets/thesandlerstyle.svg"
            width={450}
            height={450}
            alt="Logo Sandlers Show"
            className="transition-all duration-500 ease-in-out mx-auto w-500 lg:w-[300px] 2xl:w-[500px] 2xl:mb-12"
          />)}
        <p className={`${isVerifying ? '-mt- lg:mt-0 -mb-10' : '-mt-2 lg:mt-0'} mt-5 text-center mx-auto shadow-amber-300 text-xl  lg:text-2xl text-white font-medium transition-all duration-500 md:w-[500px]`}>
          {isVerifying
            && (error || "Ingresa el código para continuar")
          }
        </p>
      </div>

      {isVerifying && (
        <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
          <CodeInput code={code} onChange={handleCodeChange} />
          <Button
            classes="mt-10"
            textButton="Verificar"
            disabled={code.length !== 6}
            callToAction={handleVerify}
          />
        </div>
      )}

      {!isVerifying && (
        <Button classes="mt-10" disabled={isVerifying} textButton="Ingresar" callToAction={handleEnterClick} />
      )}
    </div>
  );
};
