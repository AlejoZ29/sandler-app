import type { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
 title: 'Verify Page',
 description: 'Verify Page',
};

export default function VerifyPage() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-2xl font-bold text-white">Verify Page</div>
    </div>
  )
}
