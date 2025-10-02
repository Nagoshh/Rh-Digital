import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Vagas from './pages/Vagas'
import Perfil from './pages/Perfil'
import Notificacoes from './pages/Notificacoes'
import Premium from './pages/Premium'
import Settings from './pages/Settings'
import Nav from './components/Nav'

function App(){
  return (
    <div className='min-h-screen bg-gray-50'>
      <Nav />
      <main className='p-6'>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/home' element={<Home />} />
          <Route path='/vagas' element={<Vagas />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/notificacoes' element={<Notificacoes />} />
          <Route path='/premium' element={<Premium />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
