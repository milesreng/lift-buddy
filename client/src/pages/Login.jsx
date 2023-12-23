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
      <div className="container w-2/3 md:w-1/2 lg:w-1/3 m-auto shadow-lg py-4 px-6 bg-slate-100 dark:bg-slate-800 dark:text-slate-100">
        
        <h3 className='text-2xl text-center py-2 lg:pb-4'>Sign In</h3>
        <form className='container flex flex-col gap-6 w-full'>
          <div className='row flex w-full justify-between'>
            <label className='w-1/4' htmlFor='email'>Email</label>
            <input className='w-3/4 dark:bg-slate-700 dark:text-slate-50 py-1 px-2 rounded-sm' type='text' name='email' id='email' onChange={handleEmailChange} value={email} required />
          </div>
          <div className='row flex w-full justify-between'>
            <label className='w-1/4' htmlFor='password'>Password</label>
            <input className='w-3/4 dark:bg-slate-700 dark:text-slate-50 py-1 px-2 rounded-sm' type='password' name='password' id='password' onChange={handlePasswordChange} value={password} required />
          </div>
        </form>
        <div className='w-1/2 mx-auto flex flex-col mt-8'>
          <button className='px-4 py-1 text-center mx-auto bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 hover:dark:bg-slate-600 transition-all duration-100  rounded-md' onClick={handleLogin}>Sign in</button>
          <p className='login-or py-4 dark:text-slate-50'>or</p>
          <Link to='/register' className='px-4 py-1 text-center mx-auto bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 hover:dark:bg-slate-600 transition-all duration-100  rounded-md' >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login