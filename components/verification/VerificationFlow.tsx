'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, CodeInput } from "@/components";

const VALID_CODE = "123456";

export const VerificationFlow = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
      router.push('/form');
    } else {
      setError("El código que ingresaste no es válido, por favor inténtalo de nuevo");
      setCode("");
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen p-8 sm:p-20">
      <div className={`transition-all duration-500 ease-in-out w-80 lg:w-xl ${isVerifying ? 'transform -translate-y-8 scale-75' : ''}`}>
        <Image
          src="/assets/logo.png"
          width={450}
          height={450}
          alt="Logo Sandlers Show"
          className="transition-all duration-500 ease-in-out mx-auto w-500 lg:w-[600px]"
        />
        <p className={`${isVerifying ? '-mt-2 lg:mt-0 -mb-10' : '-mt-2 lg:mt-0'} text-center mx-auto shadow-amber-300 text-sm md:text-xl lg:text-2xl text-white font-medium transition-all duration-500 mt-2 md:w-[500px]`}>
          {isVerifying
            ? (error || "Ingresa el código para continuar")
            : "Estar a la moda, es tenerlo en tu pantalla"
          }
        </p>
      </div>

      {isVerifying && (
        <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
          <CodeInput code={code} onChange={handleCodeChange} />
          <Button
            classes="mt-10"
            textButton="Verificar"
            variant="primary"
            disabled={code.length !== 6}
            callToAction={handleVerify}
          />
        </div>
      )}

      {!isVerifying && (
        <Button classes="mt-10" disabled={isVerifying} variant="primary" textButton="Ingresar" callToAction={handleEnterClick} />
      )}
    </div>
  );
};
