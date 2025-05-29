import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='pt-24 pb-5 container mx-auto'>
        <div className='flex justify-center items-center'>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout