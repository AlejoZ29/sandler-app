import React from 'react'

const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="text-center pb-5 px-5 -mt-5 md:px-0 text-xs md:text-sm text-amber-200">
      Copyright &copy; {date} Sony Pictures Television. Todos los derechos reservados.
    </footer>
  )
}