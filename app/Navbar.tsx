'use client';

import Link from 'next/link'
import React from 'react'
import Logo from './components/Logo'
import { usePathname } from 'next/navigation'
import classnames from 'classnames';
import { FaGithub } from 'react-icons/fa'

export const Navbar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
        //Githublink, so last link.
        { label: <FaGithub />, href: 'https://github.com/AnnebladFelix/NextDoku' },
    ]
  return (
    <nav className='flex space-x-5 border-b mb-5 px-5 h-14 items-center' >
        <Logo/>
        <ul className='flex space-x-5' >
            {links.map(link => 
            <Link key={link.href} 
            className={classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}
