import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <nav className="bg-[#fefefe] text-[rgb(89,102,120)] px-10 py-4 flex justify-between items-center border border-b-gray-300">
        <h1 className="text-3xl font-bold">FoundIt ✨</h1>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6">
          <li>
            <NavLink
              to="/HomePage"
              className={({ isActive }) =>
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Myitems"
              className={({ isActive }) =>
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }
            >
              My Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reportlost"
              className={({ isActive }) =>
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }
            >
              Report Lost
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Reportfound"
              className={({ isActive }) =>
                isActive ? "text-[#75bae6] font-semibold" : "hover:text-[#75bae6]"
              }
            >
              Report Found
            </NavLink>
          </li>
          <li>
            <NavLink to="/Logout" className="hover:text-red-600 ml-10">
              Logout
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="sm:hidden flex flex-col bg-[#fefefe] px-10 py-4 border-t border-gray-300">
          <li className="py-2">
            <NavLink to="/HomePage" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink to="/Myitems" onClick={() => setIsOpen(false)}>
              My Items
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink to="/reportlost" onClick={() => setIsOpen(false)}>
              Report Lost
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink to="/Reportfound" onClick={() => setIsOpen(false)}>
              Report Found
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink to="/Logout" className="text-red-600" onClick={() => setIsOpen(false)}>
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Navbar
