'use client';
import React from 'react';
import { useGame } from '../../app/context/GameContext';
import { Backstage } from './Backstage';
import { SonyLogo } from '../sonylogo/SonyLogo';
import { Counter } from '../counter/Counter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const { clickedImages, totalImages } = useGame();
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const isCounterZero = clickedImages.size === 0;

  return (
    <nav className="flex w-screen justify-between p-2 absolute z-50">
      <Link href={'/'} className="flex item-center mt-10">
        <SonyLogo />
      </Link>

      <div className="flex items-center gap-10 -mt-10 mr-10">
        {isHome && (
          <>
            <Backstage
              href="#"
              src="/assets/backstage.png"
              alt="Icono Backstage"
              width={150}
              height={30}
              isActive={isCounterZero}
            />

            <Link href={'#'} className="relative">
              <Counter clickedImages={clickedImages} totalImages={totalImages} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
