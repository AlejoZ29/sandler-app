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
      className={`${classes ? classes : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:from-yellow-300 hover:via-yellow-700 hover:to-yellow-300 hover:scale-105'} w-3xs text-white font-medium text-2xl bg-gradient-to-r from-yellow-200 via-yellow-600 to-yellow-200 py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform -mt-5`}
    >
      {textButton}
    </button>
  )
}
