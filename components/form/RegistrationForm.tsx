'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components';
import { useAuth } from '@/app/context/AuthContext';

interface FormData {
  name: string;
  lastName: string;
  compain: string;
  role: string;
  email: string;
  birthday: string;
  policy: boolean;
}

interface FormErrors {
  [key: string]: boolean;
}

export const RegistrationForm = () => {
  const router = useRouter();
  const { setFormCompleted } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    compain: '',
    role: '',
    email: '',
    birthday: '',
    policy: false
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string | boolean) => {
    switch (name) {
      case 'name':
      case 'lastName':
        return typeof value === 'string' && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) && value.trim().length > 0;
      case 'compain':
      case 'role':
        return typeof value === 'string' && value.trim().length > 0;
      case 'email':
        return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'birthday':
        if (typeof value !== 'string') return false;
        const birthdayRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
        return birthdayRegex.test(value.trim());
      case 'policy':
        return value === true;
      default:
        return true;
    }
  };

  useEffect(() => {
    validateForm()
  }, [formData])

  const formatBirthday = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 4 digits
    const limitedDigits = digits.slice(0, 4);
    
    if (limitedDigits.length === 0) return '';
    
    if (limitedDigits.length === 1) {
      // Single digit - add leading zero
      return `0${limitedDigits}`;
    }
    
    if (limitedDigits.length === 2) {
      // Two digits - validate day (01-31)
      const day = parseInt(limitedDigits);
      if (day < 1 || day > 31) {
        return limitedDigits.slice(0, 1); // Keep only first digit if invalid
      }
      return limitedDigits;
    }
    
    if (limitedDigits.length === 3) {
      // Day complete, starting month
      const day = parseInt(limitedDigits.slice(0, 2));
      const monthDigit = parseInt(limitedDigits[2]);
      
      if (day < 1 || day > 31) {
        return limitedDigits.slice(0, 2);
      }
      
      return `${limitedDigits.slice(0, 2)}/${limitedDigits[2]}`;
    }
    
    if (limitedDigits.length === 4) {
      // Complete format dd/mm
      const day = parseInt(limitedDigits.slice(0, 2));
      const month = parseInt(limitedDigits.slice(2, 4));
      
      if (day < 1 || day > 31) {
        return limitedDigits.slice(0, 2);
      }
      
      if (month < 1 || month > 12) {
        return `${limitedDigits.slice(0, 2)}/0${limitedDigits[2]}`;
      }
      
      return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2, 4)}`;
    }
    
    return limitedDigits;
  };

  const handleBirthdayBlur = () => {
    const currentValue = formData.birthday;
    if (currentValue.length === 4 && currentValue.includes('/')) {
      // Format: "dd/m" -> "dd/0m"
      const parts = currentValue.split('/');
      if (parts[1].length === 1) {
        const monthDigit = parseInt(parts[1]);
        // Only complete with zero if it's a valid month (1-9)
        if (monthDigit >= 1 && monthDigit <= 9) {
          const completedValue = `${parts[0]}/0${parts[1]}`;
          setFormData(prev => ({ ...prev, birthday: completedValue }));
        }
      }
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    let processedValue = value;
    
    // Format birthday input automatically
    if (name === 'birthday' && typeof value === 'string') {
      processedValue = formatBirthday(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: !validateField(name, processedValue) }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const value = formData[key as keyof FormData];
      if (!validateField(key, value)) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return Object.keys(formData).every(key => {
      const value = formData[key as keyof FormData];
      return validateField(key, value);
    });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setFormCompleted();
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-12 lg:mx-auto lg:grid lg:grid-cols-12">
      <div className="col-start-8 col-end-12 w-full mx-12 lg:mx-auto max-w-[600px]">
        <div className="mb-8">
          <Logo textClasses="lg:mt-0 text-center"/>
        </div>

        <form className="w-full max-w space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Nombre:
            </label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-2 bg-white text-black rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none placeholder-gray-600"
            />
             {errors.name && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Apellido: 
            </label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-2 bg-white text-black rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none placeholder-gray-600"
            />
            {errors.lastName && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Compañia: 
            </label>
            <input
              type="text"
              placeholder="Compañía"
              value={formData.compain}
              onChange={(e) => handleInputChange('compain', e.target.value)}
              className="w-full px-4 py-2 bg-white text-black rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none placeholder-gray-600"
            /> 
            {errors.compain && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Cargo: 
            </label>
            <input
              type="text"
              placeholder="Tu posición o cargo"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-4 py-2 bg-white text-black rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none placeholder-gray-600"
            />
            {errors.role && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Email: 
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-2 bg-white text-black rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none placeholder-gray-600"
            />
            {errors.email && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2" title="Fecha de nacimiento">
              ¿Cuándo celebramos contigo?
            </label>
            <input
              type="text"
              placeholder="dd/mm"
              value={formData.birthday}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
              onBlur={handleBirthdayBlur}
              className="w-full px-4 py-2 bg-white text-black rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none placeholder-gray-600"
            />
             {errors.birthday && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={formData.policy}
              onChange={(e) => handleInputChange('policy', e.target.checked)}
              className="mt-1"
            />
            <label className="text-white text-sm">
              Al continuar, aceptas nuestra política de tratamiento de datos.{' '}
              <a 
                href="https://intl.sonypictures.com/es/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Ver política completa aquí
              </a>
            </label>
            {errors.policy && <span className="text-red-500">*</span>}
          </div>
          <div className="pt-4 flex flex-col items-center mt-10">
            <Button 
              textButton="Enviar" 
              disabled={!isFormValid()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
