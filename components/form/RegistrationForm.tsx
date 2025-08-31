'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Logo } from '@/components';

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
        return typeof value === 'string' && value.trim().length > 0;
      case 'policy':
        return value === true;
      default:
        return true;
    }
  };

  useEffect(() => {
    validateForm()
  }, [formData])

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: !validateField(name, value) }));
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
              Nombre: {errors.name && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-2 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Apellido: {errors.lastName && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-2 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Empresa: {errors.compain && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.compain}
              onChange={(e) => handleInputChange('compain', e.target.value)}
              className="w-full px-4 py-2 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            /> 
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Cargo: {errors.role && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-4 py-2 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              Email: {errors.email && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-2 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-5">
            <label className="block text-white font-medium mb-2">
              ¿Cuándo celebramos contigo? {errors.birthday && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              value={formData.birthday}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
              className="w-full px-4 py-2 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={formData.policy}
              onChange={(e) => handleInputChange('policy', e.target.checked)}
              className="mt-1"
            />
            <label className="text-white text-sm">
              {errors.policy && <span className="text-red-500">*</span>}
              Al continuar, aceptas nuestra política de tratamiento de datos.{' '}
              <a 
                href="https://www.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-400 underline hover:text-yellow-300"
              >
                Ver política completa aquí
              </a>
            </label>
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
