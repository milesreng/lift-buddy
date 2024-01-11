import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordType, setPasswordType] = useState()

  useEffect(() => {
    setPasswordType('password')
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.token)
        console.log(`${data.userInfo.username} successfully logged in`)
        navigate('/dashboard')
      })
      .catch(e => console.log(e))
  }

  const toggleShowPassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return (
    <div className='w-5/6 md:w-1/2 lg:w-1/3 mx-auto pt-24'>
      <form onSubmit={handleLogin} className='shadow-2xl flex flex-col gap-4 p-4'>
        <h1 className='text-3xl'>Sign in</h1>

        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">Email</span>
          <input placeholder="" type="text" name="email" onChange={e => setEmail(e.target.value)} required
            className="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">Password</span>
          <div className="relative">
            <input placeholder="" type={passwordType} name="password" onChange={e => setPassword(e.target.value)} required className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 hover:cursor-pointer" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={passwordType === 'password' ? faEye : faEyeSlash}></FontAwesomeIcon>
            </div>
          </div>
        </div>

        <Link className='text-sm underline text-slate-700 dark:text-gray-400'>Forgot password?</Link>
        <button type='submit' className='bg-palette-dark-accent text-palette-lightest border-[1px] border-palette-dark-accent hover:bg-palette-dark dark:bg-palette-mid dark:hover:bg-palette-mid-accent transition-all duration-200 rounded-lg py-2 w-1/2 mx-auto'>
          Sign in
        </button>
        <p className='login-or before:bg-palette-mid after:bg-palette-mid text-palette-dark dark:text-palette-light'>or</p>
        <Link to='/register' className='bg-palette-lightest text-palette-dark border-[1px] border-palette-dark-accent  hover:bg-palette-light transition-all duration-200 rounded-lg py-2 w-1/2 mx-auto text-center'>
          Create an account
        </Link>
      </form>
    </div>
  )
}

export default Login