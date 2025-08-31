'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SonyLogo } from '../sonylogo/SonyLogo'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isHome, setIsHome] = useState(false);
  const pathname = usePathname();

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
            <Link href={'/404'}>
              <Image
                src="/assets/backstage.png"
                width={150}
                height={30}
                alt="Icono Backstage"
                className="mx-auto"
              />
            </Link>

            <Link href={'/404'}>
              <Image
                src="/assets/founded.png"
                width={120}
                height={30}
                alt="Icono Backstage"
                className="mx-auto"
              />
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}
