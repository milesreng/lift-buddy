/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryLink = ({ toHref, text, bgColor }) => {
  return (
    <Link to={toHref} className='rounded-lg px-4 py-1 bg-palette-mid hover:bg-palette-mid-accent transition-all duration-200 text-palette-lightest text-md'>
      {text}
    </Link>
  )
}

export default PrimaryLink