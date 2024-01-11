/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryLink = ({ toHref, text }) => {
  return (
    <Link to={toHref} className='rounded-lg px-4 py-1 border-[1px] border-palette-light-accent bg-palette-lightest hover:bg-palette-light text-palette-dark text-md'>
      {text}
    </Link>
  )
}

export default SecondaryLink