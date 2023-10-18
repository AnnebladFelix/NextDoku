import Link from 'next/link'
import React from 'react'
import Logo from './components/Logo'

export const Navbar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
  return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-14 items-center' >
        <Logo/>
        <ul className='flex space-x-5' >
            {links.map(link => 
            <Link key={link.href} 
            className='text-zinc-500 hover:text-zinc-800 transition-colors' 
            href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}
