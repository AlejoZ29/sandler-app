import React from 'react'


const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <div className="absolute bottom-4 left-0 right-0 text-center px-5 md:px-0 text-sm text-amber-200">
       Copyright &copy; {date} Sony Pictures Television. Todos los derechos reservados.
    </div>
  )
}