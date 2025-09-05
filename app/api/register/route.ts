import { NextRequest, NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/validationSchemas';
import { ValidationError } from 'yup';

type YupError = ValidationError & {
  inner?: { path?: string; message: string }[];
};

export async function POST(request: NextRequest) {
  try {
    // Dynamic import to avoid build issues
    const { default: prisma } = await import('@/lib/prisma');
    const body = await request.json();
    
    // Validar datos usando Yup
    const validatedData = await registrationSchema.validate(body, {
      abortEarly: false, // Obtener todos los errores, no solo el primero
      stripUnknown: true, // Remover campos no definidos en el schema
    });

    const { name, lastName, compain, role, email, birthday, policy } = validatedData;
    
    // Convertir birthday string a Date object
    const [day, month] = birthday.split('/').map((num: string) => parseInt(num, 10));
    const currentYear = new Date().getFullYear();
    const birthdayDate = new Date(currentYear, month - 1, day);
    
    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      );
    }
    
    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        lastName: lastName.trim(),
        compain: compain.trim(),
        role: role.trim(),
        email: email.toLowerCase().trim(),
        birthday: birthdayDate,
        policy: policy
      }
    });
    
    // Devolver respuesta sin datos sensibles
    return NextResponse.json(
      {
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    
    // Manejar errores de validación de Yup
    if (error instanceof ValidationError) {
      const validationError = error as YupError;
      const errors = validationError.inner?.length 
        ? validationError.inner.map((err) => `${err.path || 'unknown'}: ${err.message}`).join(', ')
        : validationError.message;
      
      return NextResponse.json(
        { error: `Datos inválidos: ${errors}` },
        { status: 400 }
      );
    }
    
    // Manejar errores específicos de Prisma
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
          { error: 'Este email ya está registrado' },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta más tarde.' },
      { status: 500 }
    );
  }
}
