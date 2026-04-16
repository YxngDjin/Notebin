import React from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex items-center py-4 px-55 justify-between'>
      <h1 className='font-bold text-xl'>note<span className='text-purple-400'>bin</span></h1>
      <div className='flex gap-2 items-center'>
        <ThemeToggle />
        <Link href="/">
            <Button>
                + New Code Snippet
            </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar