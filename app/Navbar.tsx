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
        { label: 'Home', href: '/' },
        { label: 'Documents', href: '/issues' },
        //Githublink, last link.
        { label: <FaGithub />, href: 'https://github.com/AnnebladFelix/NextDoku' },
    ]
  return (
    <div className='flex border-b items-center justify-center'>
        <nav className='flex space-x-5 mb-3 px-5 h-14 items-center justify-between max-w-7xl w-full' >
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
    </div>
  )
}
