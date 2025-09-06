import React from 'react'
import Image from 'next/image'

interface LogoProps {
  textClasses?: string
}

export const Logo = ({textClasses}: LogoProps) => {
  return (
    <>
      <Image
        src="/assets/thesandlerstyle.svg"
        width={500}
        height={500}
        alt="Logo Sandlers Show"
        className='mx-auto'
      />
    </>
  )
}
