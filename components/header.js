import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ToggleTheme } from './toggle-theme'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'

const Header = () => {
  return (
    <div className='fixed top-0 z-50 w-full bg-[#edefef]/80 dark:bg-black/80 border-b border-dotted border-gray-600 '>
      <nav className=' container mx-auto px-4 py-4 flex items-center justify-between'>

    <Link href={'/'} className='flex items-center gap-2 font-bold bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 text-gray-800 dark:text-white px-3 py-2 rounded-2xl shadow-xl hover:shadow-xl hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:border-white/30 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden'>
  <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
  <Image 
    className='h-4 w-4 object-contain relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300' 
    src={'/aura-logo.png'} 
    alt='logo' 
    height={100} 
    width={100}
  />
  <span className='tracking-tight relative z-10 group-hover:tracking-wide transition-all duration-300'>Aura</span>
</Link>
        
        <div className='flex items-center gap-3'>
       
           <SignedOut>
            <Button className={'font-semibold cursor-pointer'} asChild>
              <SignInButton forceRedirectUrl='/dashboard' />
            </Button>
            </SignedOut>
            <SignedIn>
              <Link href={'/dashboard'}>
              <Button variant={'outline'} className={'font-semibold dark:text-gray-300 dark:hover:text-blue-500 text-gray-800 cursor-pointer hover:text-blue-600 flex gap-1 justify-center items-center'}>
                <LayoutDashboard className='h-3 w-3'/>
                <span className='hidden text-sm md:block'>Dashboard</span>
              </Button>
              </Link>

              <Link href={'/transaction/create'}>
              <Button className={'font-semibold dark:text-gray-900 dark:hover:text-blue-600 text-gray-100 cursor-pointer hover:text-blue-500 flex gap-1 items-center'}>
                <PenBox className='h-3 w-3'/>
                <span className='hidden text-sm md:block'>Add Transaction</span>
              </Button>
              </Link>

              <UserButton />
            </SignedIn>
        

        </div>
            </nav>
    </div>
  )
}

export default Header