import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './LogOut.css';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate('/Login'); // Redirect to the Login page after logout
    window.location.reload(); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4f4f9] font-sans">
      <div className="bg-white rounded-lg px-8 py-6 shadow-md text-center w-full max-w-md">
        <h2 className='mb-5 text-[#333] text-2xl font-semibold'>Do you really want to LogOut?</h2>
        <div className="flex justify-between mt-4">
          <button className='bg-gray-400 text-white px-5 py-2 rounded transition-colors hover:bg-gray-500' onClick={() => navigate('/')}>Cancel</button>
          <button className='bg-red-500 text-white px-5 py-2 rounded transition-colors hover:bg-red-700' onClick={handleLogout}>LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
