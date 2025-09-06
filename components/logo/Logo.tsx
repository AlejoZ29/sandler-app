import React from 'react'
import Image from 'next/image'

export const Logo = () => {
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
