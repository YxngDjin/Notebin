"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
        {isOpen && (
            <div 
                className='fixed inset-0 bg-black/50 z-40'
                onClick={() => setIsOpen(false)}
            />
        )}

        {/* DRAWER */}
        <div 
            style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 300ms ease-in-out'
            }}
            className="fixed top-0 left-0 h-full w-64 bg-card border-r z-50 p-6 flex flex-col gap-4"
        >
            <h2 className="font-bold text-xl">note<span className="text-purple-400">bin</span></h2>
            <ThemeToggle />
            <Link href="/" onClick={() => setIsOpen(false)}>
                <Button className="w-full">+ New Code Snippet</Button>
            </Link>
        </div>

        <nav className='flex items-center py-4 md:max-w-3xl md:mx-auto justify-between md:px-0 px-4'>
            <Button className="md:hidden" variant="outline" onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon />
            </Button>
            <h1 className='font-bold text-xl'>note<span className='text-purple-400'>bin</span></h1>
            <div className='md:flex gap-2 items-center hidden'>
                <ThemeToggle />
                <Link href="/">
                    <Button>
                        + New Code Snippet
                    </Button>
                </Link>
            </div>
        </nav>
    </>
  )
}

export default Navbar