import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <>
        <Image
          src="/assets/logo.png"
          width={500}
          height={500}
          alt="Logo Sandlers Show"
        />
        <p className='-mt-14 lg:-mt-18 text-center shadow-amber-300 text-xl lg:text-2xl text-white font-medium'>Estar a la moda, es tenerlo en tu pantalla</p>
    </>
  )
}
