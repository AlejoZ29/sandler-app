import React from 'react'
import type { Metadata } from 'next';
import { RegistrationForm, RouteProtection } from '@/components';

export const metadata: Metadata = {
 title: 'Formulario de Registro - The Sandler Style',
 description: 'Formulario de registro para The Sandler Style',
};

export default function FormPage() {
  return (
    <RouteProtection requireVerification={true}>
      <div className="page-form">
        <RegistrationForm />
      </div>
    </RouteProtection>
  )
}
