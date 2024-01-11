import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Register = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState({})

  const [passwordType, setPasswordType] = useState('password')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleRegister = (e) => {
    e.preventDefault()

    if (!password || (password !== repeatPassword)) {
      // throw password validation error
      console.log('password validation error')
      setPasswordMatch(false)
      return
    }

    const newUser = {
      firstname: e.target.firstname.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value
    }

    console.log(newUser)

    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
      .then(data => data.error ? setErrors([ ...errors, data.error ]) : navigate('/verify'))
      .catch(e => console.log(e))
  }

  const toggleShowPassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  const validateForm = () => {
    
  }

  const checkPasswordMatch = (e) => {
    if (e.target.value === password) {
      setErrors({ ...errors, password: 'passwords do not match'})
    } else {
      setPasswordMatch(false)
    }
  }

  return (
    <div className='w-5/6 md:w-1/2 lg:w-1/3 mx-auto py-6'>
      <form onSubmit={handleRegister} className='shadow-2xl flex flex-col gap-4 p-4'>
        <h1 className='text-3xl'>Register</h1>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">First name</span>
          <input placeholder="" type="text" name="firstname" onChange={e => setFirstName(e.target.value)} value={firstName} required
            className="text-palette-dark text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">Email</span>
          <input placeholder="" type="text" name="email" onChange={e => setEmail(e.target.value)} value={email} required
            className="text-palette-dark text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">Username</span>
          <input placeholder="" type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} required
            className="text-palette-dark text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" />
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">Password</span>
          <div className="relative">
            <input placeholder="" type={passwordType} name="password" onChange={e => setPassword(e.target.value)} value={password} required className="text-md block px-3 py-2 rounded-lg w-full 
              text-palette-dark
              bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 hover:cursor-pointer" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={passwordType === 'password' ? faEye : faEyeSlash} className='text-palette-mid'></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className="py-2">
          <span className="px-1 text-sm text-gray-600 dark:text-gray-300">Repeat password</span>
          <div className="relative">
            <input placeholder="" type="password" onChange={e => setRepeatPassword(e.target.value)} value={repeatPassword} className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                text-palette-dark focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none" />
          </div>
        </div>

        <button type='submit' className='bg-palette-dark-accent text-palette-lightest border-[1px] border-palette-dark-accent hover:bg-palette-dark transition-all duration-200 rounded-lg py-2 w-1/2 mx-auto'>
          Register
        </button>
        <p className='login-or before:bg-palette-mid after:bg-palette-mid text-palette-dark dark:text-palette-light'>or</p>
        <Link to='/login' className='bg-palette-lightest text-palette-dark border-[1px] border-palette-dark-accent  hover:bg-palette-light transition-all duration-200 rounded-lg py-2 w-1/2 mx-auto text-center'>
          Sign in
        </Link>
      </form>
    </div>
  )
}

export default Register