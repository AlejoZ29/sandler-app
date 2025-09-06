'use client';
import React from 'react';
import { useGame } from '../../app/context/GameContext';
import { Backstage } from './Backstage';
import { SonyLogo } from '../sonylogo/SonyLogo';
import { Counter } from '../counter/Counter';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onOpenBackstage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBackstage }) => {
  const { clickedImages, totalImages } = useGame();
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const isCounterZero = clickedImages.size === 0;
  const shouldCenterLogo = pathname === '/';


  return (
    <nav className={`absolute top-0 left-0 right-0 z-50 flex w-full -md:mt-32 mt-5 p-2 ${shouldCenterLogo ? 'justify-center' : 'justify-between'}`}>
      {shouldCenterLogo ? (
        <div className="flex items-center mt-5 2xl:mt-10 scale-70 lg:scale-80 ">
          <SonyLogo />
        </div>
      ) : (
        <>
          <div className="hidden md:flex items-center pl-32 scale-70 lg:scale-100">
            <SonyLogo />
          </div>

          <div className="flex items-center gap-4 md:gap-10 pr-32 scale-70 lg:scale-100">
            {isHome && (
              <>
                <Backstage
                  src="/assets/backstage.png"
                  alt="Icono Backstage"
                  width={150}
                  height={30}
                  isActive={isCounterZero}
                  onOpenModal={onOpenBackstage || (() => {})}
                />

                <div className="relative">
                  <Counter clickedImages={clickedImages} totalImages={totalImages} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};