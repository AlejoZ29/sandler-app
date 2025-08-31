import Link from 'next/link'
import React from 'react'
import { SonyLogo } from '../sonylogo/SonyLogo'

export const Navbar = () => {
  return (
    <nav className='flex p-2 absolute'>
        <Link href={'/'} className='flex item-center'>
            <SonyLogo/>
        </Link>
    </nav>
  )
}
