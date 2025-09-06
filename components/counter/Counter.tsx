import Image from 'next/image'
import React from 'react'
import { useGame } from '../../app/context/GameContext'

export const Counter = ({ classes, clickedImages, totalImages }: { classes?: string, clickedImages: Set<string>, totalImages: number }) => {
    const { openCongratsModal } = useGame();
    const isZero = clickedImages.size === 0;
    const isClickable = clickedImages.size > 0;
    
    return (
        <div 
            className={`relative ${isZero ? 'opacity-50' : ''} ${isClickable ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}`}
            onClick={isClickable ? openCongratsModal : undefined}
        >
            <Image
                src="/assets/founded.png"
                width={120}
                height={30}
                alt="Icono Backstage"
                className="mx-auto"
            />
            <span className={`text-sm md:text-lg flex items-center justify-center text-amber-400 lg:font-bold ${classes ?  classes : 'absolute top-0 bottom-1 right-0 left-12'}`}>{clickedImages.size}/{totalImages}</span>
        </div>
    )
}