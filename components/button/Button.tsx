import React from 'react'

interface ButtonProps {
    disabled?: boolean
    classes?: string
    callToAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    textButton: string
}


export const Button = ({classes, disabled, callToAction, textButton}: ButtonProps) => {
  return (
    <button 
      disabled={disabled}
      type="submit"
      onClick={callToAction && callToAction}
      className={`${classes ? classes : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:from-yellow-300 hover:via-yellow-700 hover:to-yellow-300 hover:scale-105'}  text-white font-medium text-md md:text-xl bg-gradient-to-r from-yellow-200 via-yellow-600 to-yellow-200 py-2 px-10 rounded-full shadow-lg transition-all duration-300 transform -mt-5`}
    >
      {textButton}
    </button>
  )
}
