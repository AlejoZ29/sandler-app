import * as yup from 'yup';

// Schema para validación del formulario de registro
export const registrationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'El nombre solo puede contener letras'),
  
  lastName: yup
    .string()
    .trim()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'El apellido solo puede contener letras'),
  
  compain: yup
    .string()
    .trim()
    .required('La compañía es requerida')
    .min(2, 'La compañía debe tener al menos 2 caracteres')
    .max(100, 'La compañía no puede tener más de 100 caracteres'),
  
  role: yup
    .string()
    .trim()
    .required('El cargo es requerido')
    .min(2, 'El cargo debe tener al menos 2 caracteres')
    .max(50, 'El cargo no puede tener más de 50 caracteres'),
  
  email: yup
    .string()
    .trim()
    .required('El email es requerido')
    .email('El formato del email no es válido')
    .max(254, 'El email es demasiado largo'),
  
  birthday: yup
    .string()
    .required('La fecha de cumpleaños es requerida')
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/,
      'El formato debe ser dd/mm (ejemplo: 15/07)'
    )
    .test('valid-date', 'La fecha no es válida', function(value) {
      if (!value) return false;
      
      const [day, month] = value.split('/').map(n => parseInt(n, 10));
      
      // Verificar que el día esté en el rango correcto según el mes
      const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
      if (day < 1 || day > daysInMonth[month - 1]) {
        return false;
      }
      
      // Verificar fechas específicas como 29/02 en años no bisiestos
      if (month === 2 && day === 29) {
        // Para simplificar, permitimos 29/02 ya que no validamos año específico
        return true;
      }
      
      return true;
    }),
  
  policy: yup
    .boolean()
    .required('Debes aceptar la política de tratamiento de datos')
    .oneOf([true], 'Debes aceptar la política de tratamiento de datos')
});

// Tipo TypeScript derivado del schema
export type RegistrationFormData = yup.InferType<typeof registrationSchema>;

// Schema para validación en el backend (incluye conversión de tipos)
export const registrationSchemaBackend = registrationSchema.shape({
  birthday: yup
    .string()
    .required('La fecha de cumpleaños es requerida')
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/,
      'El formato debe ser dd/mm'
    )
    .transform((value) => {
      if (!value) return null;
      
      // Convertir string dd/mm a Date object
      const [day, month] = value.split('/').map((n: string) => parseInt(n, 10));
      const currentYear = new Date().getFullYear();
      return new Date(currentYear, month - 1, day);
    })
});
