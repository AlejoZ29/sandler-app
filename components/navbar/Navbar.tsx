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

  const getNavbarClasses = () => {
    if (isHome) {
      return "flex w-screen justify-between p-2 bg-black/80 backdrop-blur-sm";
    }
    return "flex w-full justify-between p-2 backdrop-blur-sm";
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="flex item-center">
        <SonyLogo />
      </div>

      <div className="flex items-center gap-10 mr-10">
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
