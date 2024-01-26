import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log('getting user with token ' + localStorage.token)
    fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    }).then(res => res.json())
      .then(data => data.error ? setUser(null) : setUser(data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div>
      Dashboard
      {user && (
        <div>
          Firstname: {user.firstname}<br />
          Email: {user.email}
        </div>
      )}
      {!user && (
        <div>
          You must be logged in to view this page. <Link to='/login'>Log in now</Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard