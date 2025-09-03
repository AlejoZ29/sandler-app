import React from 'react'
import type { Metadata } from 'next';
import { RegistrationForm } from '@/components';
import '../../form-page.css';

export const metadata: Metadata = {
 title: 'Formulario de Registro - The Sandler Style',
 description: 'Formulario de registro para The Sandler Style',
};

export default function FormPage() {
  return (
    <div className="page-form">
      <RegistrationForm />
    </div>
  )
}
