import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';

function AgentFrom() {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // response from backend
      const res = await axios.post("http://localhost:3000/addAgents",  formData);
      setFormData({
        name:"",
        email:"",
        mobile:"",
        password:"",
      })
      // console.log(res)

      //Navigate to agents page
      navigate("/agents");
      
    } catch (error) {
      // console.log(error)
      
    }
  }
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Agent Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="agent@gamil.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              required
              pattern="[0-9]{10}"
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234XXXXXX"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white border border-black cursor-pointer transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Agent"}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default AgentFrom