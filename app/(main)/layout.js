import { ToggleTheme } from '@/components/toggle-theme'
import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div className='px-4 container'>
           <div className="fixed top-24 z-50 py-1 right-4">
                   <ToggleTheme />
                 </div> 
                 
         {children}
    </div>
  )
}

export default MainLayout