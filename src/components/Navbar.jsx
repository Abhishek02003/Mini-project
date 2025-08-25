import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
      <nav className="bg-[#fefefe] text-[rgb(89 102 120)] px-10 py-4 flex justify-between items-center border border-b-gray-300">
        <h1 className="text-3xl font-bold">FoundIt ✨</h1>
        <ul className="flex gap-6">
          <li><NavLink to="/HomePage"  className={({ isActive }) => 
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }>Home</NavLink></li>
          <li><NavLink to="/Myitems" className={({ isActive }) => 
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }>My Items</NavLink></li>
          <li><NavLink to="/reportlost" className={({ isActive }) => 
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }>Report Lost</NavLink></li>
          <li><NavLink to="/Reportfound" className={({ isActive }) => 
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }>Report Found</NavLink></li>
          <li><NavLink to="/Logout" className="hover:text-red-600 ml-10">Logout</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
