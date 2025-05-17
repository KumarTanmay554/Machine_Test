import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function FrontPage() {
  const navigate = useNavigate();
  // const token = localStorage.getItem('token');

  return (<>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-black mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card
          title="Manage Agents"
          description="Create and manage your task agents."
          onClick={() => navigate('/agents')}
        />
        <Card
          title="Upload & Distribute"
          description="Upload a list and auto-distribute tasks to agents."
          onClick={() => navigate('/upload')}
        />
      </div>
    </div>
    </>
  );
}

function Card({ title, description, onClick }) {
  return (
    <div
      className="p-6 border rounded-lg shadow hover:shadow-xl transition bg-white cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
