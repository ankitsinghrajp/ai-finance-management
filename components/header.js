import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ToggleTheme } from './toggle-theme'

const Header = () => {
  return (
    <div>
     <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ToggleTheme/>
    </div>
  )
}

export default Header