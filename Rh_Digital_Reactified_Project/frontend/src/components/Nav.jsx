import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(){
  return (
    <header className='bg-white shadow'>
      <div className='max-w-6xl mx-auto p-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img src='/src/assets/Logo.png' alt='Logo' className='h-10 w-10' />
          <h1 className='text-xl font-semibold'>RH Digital</h1>
        </div>
        <nav className='flex items-center gap-4'>
          <Link to='/home' className='hover:underline'>Home</Link>
          <Link to='/vagas' className='hover:underline'>Vagas</Link>
          <Link to='/perfil' className='hover:underline'>Perfil</Link>
          <Link to='/login' className='hover:underline'>Login</Link>
        </nav>
      </div>
    </header>
  )
}
