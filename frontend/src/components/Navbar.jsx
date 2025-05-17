import React, { useState } from 'react'
import { Link } from 'react-router';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');
  return (
    <nav className="bg-blue-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="text-xl font-bold text-black">
            <Link to="/">Agents</Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-black hover:border-black transition duration-300">Home</Link>
            <Link to="/agents" className="text-gray-700 hover:text-black hover:border-black transition duration-300">Agents</Link>
            <Link to="/upload" className="text-gray-700 hover:text-black hover:border-black transition duration-300">Upload </Link>
            <Link to="/addAgent" className="text-gray-700 hover:text-black hover:border-black transition duration-300">Add Agent </Link>
            {token ? (
          <Link className="btn btn-login-register" to="/Logout">Log Out</Link>
        ) : (
          <>
            <Link className="btn btn-login-register" to="/Login">Login</Link>
            <Link className="btn btn-login-register" to="/Register">Register</Link>
          </>
        )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/agents" className="block text-gray-700 hover:text-blue-600">Agents</Link>
          <Link to="/upload" className="block text-gray-700 hover:text-blue-600">Upload</Link>
          <Link to="/addAgent" className="block text-gray-700 hover:text-blue-600">Add Agents</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar