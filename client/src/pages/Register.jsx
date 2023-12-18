import React, { useState } from 'react'
import axiosConfig from '../config/axiosConfig'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    email: '',
    password: '',
    verifyPassword: ''
  })

  const [isValidEmail, setIsValidEmail] = useState()
  const [isValidPassword, setIsValidPassword] = useState()
  const [passwordMatch, setPasswordMatch] = useState()

  const pwRegex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

  const handleRegisterUser = async () => {
    if (isValidPassword && passwordMatch) {
      axiosConfig.post('/api/auth/register', formData)
        .then((res) => {
          console.log(res)
        })
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value
    setFormData({
      ...formData, [e.target.name]: value
    })
    
    if (pwRegex.test(formData.password)) {
      setIsValidPassword(true)
    } else {
      setIsValidPassword(false)
    }

    if (formData.password !== formData.verifyPassword) {
      setPasswordMatch(false)
    } else {
      setPasswordMatch(true)
    }
  }

  return (
    <div className='w-full'>
      <div className="container w-2/3 m-auto shadow-lg p-4 bg-slate-100">
        <h3 className='text-2xl text-center py-2'>Register</h3>
        <form className="container w-full flex flex-col gap-4">
          <div className="row w-full flex justify-between">
            <label htmlFor="username" className='col-4'>Username</label>
            <input className='w-3/4' type="text" name="username" id="username" onChange={handleFormChange} required />
          </div>
          <div className="row w-full flex justify-between">
            <label htmlFor="firstname" className='col-4'>First Name</label>
            <input className='w-3/4' type="text" name="firstname" id="firstname" onChange={handleFormChange} required />
          </div>
          <div className="row w-full flex justify-between">
            <label htmlFor="email" className='col-4'>Email</label>
            <input className='w-3/4' type="text" name="email" id="email" onChange={handleFormChange} required />
          </div>
          <div className="row w-full flex justify-between">
            <label htmlFor="password" className='col-4'>Password</label>
            <input className='w-3/4' type="text" name="password" id="password" onChange={handleFormChange} required />
          </div>
          {!isValidPassword && 
          <p className='text-red-600'>
            invalid password  
          </p>}
          <p>Your password should have 8+ characters, a digit, and a special character</p>
          <div className="row w-full flex justify-between">
            <label htmlFor="password" className='col-4'>Verify Password</label>
            <input className='w-3/4' type="text" name="password" id="password" onChange={handleFormChange} required />
          </div>
          {!passwordMatch && 
          <p className='text-red-600'>
            passwords do not match
          </p>}
          <button className='bg-slate-300 w-1/2 mx-auto p-1 rounded-md'
            onSubmit={handleRegisterUser}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register