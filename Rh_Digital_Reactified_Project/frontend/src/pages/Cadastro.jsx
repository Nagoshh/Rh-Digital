import React from 'react'
export default function Cadastro(){
  return (
    <div className='max-w-2xl mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-2xl mb-4'>Cadastro</h2>
      <form className='grid grid-cols-1 gap-3'>
        <input className='p-2 border rounded' placeholder='Nome' />
        <input className='p-2 border rounded' placeholder='Email' />
        <input className='p-2 border rounded' placeholder='Telefone' />
        <input className='p-2 border rounded' placeholder='Senha' type='password' />
        <button className='p-2 bg-green-600 text-white rounded mt-2'>Criar conta</button>
      </form>
    </div>
  )
}