'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SonyLogo } from '../sonylogo/SonyLogo'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useGame } from '../../app/context/GameContext';
import { Counter } from '../counter/Counter'

export const Navbar = () => {
  const [isHome, setIsHome] = useState(false);
  const pathname = usePathname();
  const { clickedImages, totalImages } = useGame();

  useEffect(() => {
    setIsHome(pathname === '/home');
  }, [pathname]);


  return (
    <nav className='flex w-screen justify-between p-2 absolute z-50'>
      <Link href={'/'} className='flex item-center mt-10'>
        <SonyLogo />
      </Link>

      <div className="flex items-center gap-10 -mt-10 mr-10">
        {isHome && (
          <>
            <Link href={'#'}>
              <Image
                src="/assets/backstage.png"
                width={150}
                height={30}
                alt="Icono Backstage"
                className="mx-auto"
              />
            </Link>

            <Link href={'#'} className="relative">
              <Counter clickedImages={clickedImages} totalImages={totalImages} />
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}
