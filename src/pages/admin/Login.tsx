import React from 'react'
import { loginToAdmin } from '../../services/login'

const Login = () => {
  
  return (
    <main>

      <div>Login</div>
      <button className='bg-blue-600 text-white px-4 rounded py-2 cursor-pointer' onClick={() => loginToAdmin()}>Entrar</button>
    </main>
  )
}

export default Login