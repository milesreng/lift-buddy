import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosConfig from '../config/axiosConfig'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = async () => {
    axiosConfig.post('/api/auth/login', { email, password })
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  } 

  return (
    <div className='w-full'>
      <div className="container w-2/3 m-auto shadow-lg p-4 bg-slate-100">
        <h3 className='text-2xl text-center py-2'>Sign In</h3>
        <form className='container flex flex-col gap-4 w-full'>
          <div className='row flex w-full justify-between'>
            <label className='w-1/4' htmlFor='email'>Email</label>
            <input className='w-3/4' type='text' name='email' id='email' onChange={handleEmailChange} value={email} required />
          </div>
          <div className='row flex w-full justify-between'>
            <label className='w-1/4' htmlFor='password'>Password</label>
            <input className='w-3/4' type='text' name='password' id='password' onChange={handlePasswordChange} value={password} required />
          </div>
        </form>
        <div className='w-1/2 mx-auto flex flex-col mt-4'>
          <button className='px-4 py-1 text-center mx-auto bg-slate-300' onClick={handleLogin}>Sign in</button>
          <p className='login-or py-4'>or</p>
          <Link to='/register' className='px-4 py-1 text-center mx-auto bg-slate-300' >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login