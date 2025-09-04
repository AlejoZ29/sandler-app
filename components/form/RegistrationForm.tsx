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
    <div className="flex flex-col items-center justify-center px-5 md:mx-12 lg:mx-auto lg:grid lg:grid-cols-12">
      <div className="col-start-8 col-end-12 lg:mx-auto max-w-[500px]">
        <div className="mb-10 mx-auto flex flex-col justify-center items-center mt-12 lg:w-[70%]">
          <Logo textClasses="lg:mt-0 text-center"/>
        </div>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-2">
            <label className="block text-sm md:text-md text-white font-medium mb-2">
              Nombre:
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full md:px-4 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
             {errors.name && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-2">
            <label className="block text-sm md:text-md text-white font-medium mb-2">
              Apellido: 
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full md:px-4 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
            {errors.lastName && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-2">
            <label className="block text-sm md:text-md text-white font-medium mb-2">
              Compañía: 
            </label>
            <input
              type="text"
              value={formData.compain}
              onChange={(e) => handleInputChange('compain', e.target.value)}
              className="w-full md:px-4 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            /> 
            {errors.compain && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-2">
            <label className="block text-sm md:text-md text-white font-medium mb-2">
              Cargo: 
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full md:px-4 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
            {errors.role && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-2">
            <label className="block text-sm md:text-md text-white font-medium mb-2">
              Email: 
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full md:px-4 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            />
            {errors.email && <span className="text-red-500">*</span>}
          </div>

          <div className="flex items-center justify-center gap-2">
            <label className="block text-[12px] text-white font-medium flex-4">
              ¿Cuándo celebramos contigo? 
              <span className="block text-[10px] -mt-1">(fecha de nacimiento)</span>
            </label>
            
            <input
              type="text"
              value={formData.birthday}
              onChange={(e) => handleInputChange('birthday', e.target.value)}
              className="flex-4 w-full md:px-4 bg-white rounded border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
              placeholder="dd/mm"
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
          <div className="flex flex-col items-center mt-10 mb-5">
            <Button 
              textButton="Enviar" 
              disabled={!isFormValid()}
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
