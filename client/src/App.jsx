import { useState } from 'react'
import { Route,
         createBrowserRouter,
         createRoutesFromElements,
         RouterProvider } from 'react-router-dom'

import './App.css'

import Layout from './pages/Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
