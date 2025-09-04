import React from 'react'
import Image from 'next/image'

interface LogoProps {
  textClasses?: string
}

export const Logo = ({textClasses}: LogoProps) => {
  return (
    <>
      <Image
        src="/assets/logo.png"
        width={500}
        height={500}
        alt="Logo Sandlers Show"
        className='mx-auto'
      />
      <p className={`${textClasses ? textClasses : '-mt-14 lg:-mt-18 text-center'} shadow-amber-300  md:text-2xl text-white font-medium'
      `}>Estar a la moda, es tenerlo en tu pantalla</p>
    </>
  )
}
