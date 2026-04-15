"use client";

import { MoonIcon, SunIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const isDark = saved === 'dark';

        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !dark;
        setDark(newTheme);

        document.documentElement.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }

  return (
    <button 
        onClick={toggleTheme}
        className='relative active:scale-95 w-18 h-9 rounded-full transition-colors duration-300 bg-muted dark:bg-secondary border border-border shadow-inner'
    >
        <div className={`absolute top-0.75 left-0.75 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 ease-in-out ${dark ? 'translate-x-8 bg-background' : 'translate-x-0 bg-background'}`}>
            {dark ? <MoonIcon className='h-5 w-5' /> : <SunIcon className='color-primary h-5 w-5' />}
        </div>
    </button>
  )
}

export default ThemeToggle