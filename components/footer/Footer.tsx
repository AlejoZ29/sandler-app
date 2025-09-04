import React from 'react'


const date = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="text-center py-5 px-5 md:px-0 text-sm text-amber-200">
      Copyright &copy; {date} Sony Pictures Television. Todos los derechos reservados.
    </footer>
  )
}