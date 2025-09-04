import React from 'react'
import type { Metadata } from 'next';
import { RegistrationForm } from '@/components';

export const metadata: Metadata = {
 title: 'Formulario de Registro - The Sandler Style',
 description: 'Formulario de registro para The Sandler Style',
};

export default function FormPage() {
  return (
    <div className="w-screen md:h-screen bg-form-mobile bg-cover bg-center bg-no-repeat pt-52 md:pt-0 mb-32 md:mb-0 overflow-y-auto">
      <RegistrationForm />
    </div>
  )
}
