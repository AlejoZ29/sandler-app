import React from 'react'

interface ButtonProps {
    callToAction?: () => void
    textButton: string
}


export const Button = ({callToAction, textButton}: ButtonProps) => {
  return (
    <button 
      onClick={callToAction && callToAction}
        className='cursor-pointer w-3xs text-white font-medium text-2xl bg-gradient-to-r from-yellow-200 via-yellow-600 to-yellow-200 hover:from-yellow-300 hover:via-yellow-700 hover:to-yellow-300 py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 -mt-5'
    >
      {textButton}
    </button>
  )
}
