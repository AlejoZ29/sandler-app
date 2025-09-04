'use client';
import React from 'react';
import { useGame } from '../../app/context/GameContext';
import { Backstage } from './Backstage';
import { SonyLogo } from '../sonylogo/SonyLogo';
import { Counter } from '../counter/Counter';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const { clickedImages, totalImages } = useGame();
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const isCounterZero = clickedImages.size === 0;


  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex w-full justify-between -md:mt-32 mt-5 p-2">
      <div className="flex item-center pl-32">
        <SonyLogo />
      </div>

      <div className="flex items-center gap-4 md:gap-10 pr-32">
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

            <div className="relative">
              <Counter clickedImages={clickedImages} totalImages={totalImages} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};