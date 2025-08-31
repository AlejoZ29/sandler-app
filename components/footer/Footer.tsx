import React from 'react'


const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <div className="text-center text-sm text-yellow-200 -mt-10 mb-6">
       Copyright &copy; {date} Sony Pictures Television. Todos los derechos reservados.
    </div>
  )
}