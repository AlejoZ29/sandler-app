import type { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
 title: 'Form Page',
 description: 'Form Page',
};

export default function FormPage() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-2xl font-bold text-white">Form Page</div>
    </div>
  )
}
