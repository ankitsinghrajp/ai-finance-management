import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='mt-20 mb-5 container mx-auto'>
        <div className='flex justify-center items-center'>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout