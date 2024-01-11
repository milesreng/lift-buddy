/* eslint-disable no-undef */
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Modal, Dropdown, DropdownDivider } from 'flowbite-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMoon, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import PrimaryLink from './PrimaryLink'
import SecondaryLink from './SecondaryLink'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (localStorage.token) {
      fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then(res => res.json())
        .then(data => data.error ? setUser(null) : setUser(data))
        .catch(e => {
          console.log(e)
        })
    }

  }, [localStorage.token])

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  const handleLogout = () => {
    if (localStorage.token) {
      localStorage.removeItem('token')
      navigate('/')
    }
  }

  return (
    <div className='w-full min-h-screen bg-palette-bg text-palette-dark dark:bg-palette-dark dark:text-palette-lightest font-content'>
      <div className='w-full py-0 px-4 flex justify-between h-16 border-b-2 border-b-palette-mid font-bold'>
        <div className='basis-1/2 flex gap-4 h-full items-center uppercase'>
          <Link to ='/' className='font-sketch text-lg md:text-3xl'>
            LIFT BUDDY
          </Link>
          <Link to='/dashboard' className='text-md md:text-xl'>
            Dashboard
          </Link>
          <Link>
          
          </Link>
        </div>
        <div className='basis-2/3 flex gap-4 h-full items-center justify-end'>
          {user && (
            <div className='flex gap-4'>
              <span className='hidden md:block'>Hi, {user.firstname}</span>
              <Link to='/' className='hidden md:block border-[1px] border-palette-light rounded-md px-2 bg-palette-mid-accent text-palette-lightest'>
                + Workout
              </Link>
            </div>
          )}
          {!user && (
            <>
              <PrimaryLink toHref='/login' text='Login' />
              <div className='hidden md:block'>
                <SecondaryLink toHref='/register' text='Register' />
              </div>
            </>
          )}
          <button onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={faMoon} className='' />
          </button>
          {user && (
            <Dropdown label='User' inline className='bg-palette-lightest border-[1px] border-palette-mid rounded-md'>
              <Dropdown.Item>
                <Link to='/dashboard'>Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/account'>Account</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <a onClick={() => setOpenModal(true)} className='flex my-auto align-middle'>
                  <FontAwesomeIcon icon={faRightFromBracket} className='my-auto' />
                  <span className='hidden md:block pl-1'>
                    Sign out
                  </span>
                </a>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </div>
      <div className='w-full py-0 px-4 mt-4'>
        <Outlet />
      </div>
      <Modal dismissible popup 
        show={openModal} position='center'
        className='w-3/4 md:w-2/3 lg:w-1/2 mx-auto'
        onClose={() => setOpenModal(false)}>
        <Modal.Header className='text-center w-full pt-4 px-4'>
        </Modal.Header>
        <Modal.Body className='pb-4 px-4 flex flex-col gap-4'>
          <div className="text-center">
            <h3 className='text-2xl'>Are you sure you want to log out?</h3>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setOpenModal(false)}>Never mind</button>
            <button onClick={handleLogout}>Log me out</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Navbar