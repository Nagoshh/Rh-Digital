import React from 'react'
export default function Login(){
  return (
    <div className='max-w-xl mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-2xl mb-4'>Login</h2>
      <form className='space-y-4'>
        <input className='w-full p-2 border rounded' placeholder='Email' />
        <input className='w-full p-2 border rounded' placeholder='Senha' type='password' />
        <button className='w-full p-2 bg-blue-600 text-white rounded'>Entrar</button>
      </form>
      <p className='mt-4 text-sm'>Não tem conta? <a href='/cadastro' className='text-blue-600'>Cadastre-se</a></p>
    </div>
  )
}