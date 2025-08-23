import React from 'react'
import { Link } from "react-router-dom";

const Button = ({name, to}) => {
  return (
    <>
    <Link to={to}><button className='border rounded-2xl px-10 py-2 cursor-pointer w-40'><span>{name}</span></button></Link>
    </>
  )
}

export default Button

// #98d2f7