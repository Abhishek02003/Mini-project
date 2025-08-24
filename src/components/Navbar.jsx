import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
      <nav className="bg-[#2E3C4E] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">FoundIt</h1>
        <ul className="flex gap-6">
          <li><Link to="/HomePage" className="hover:text-[#75bae6]">Home</Link></li>
          <li><Link to="/Myitems" className="hover:text-[#75bae6]">My Items</Link></li>
          <li><Link to="/reportlost" className="hover:text-[#75bae6]">Report Lost</Link></li>
          <li><Link to="/Reportfound" className="hover:text-[#75bae6]">Report Found</Link></li>
          <li><Link to="/Logout" className="hover:text-[#75bae6]">Logout</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
