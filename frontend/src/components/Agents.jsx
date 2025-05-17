// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';

// function Agents() {
//   const [agents, setAgents] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/getAgents');
//         console.log(res.data.agents)
//         setAgents(res.data.agents);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Error fetching agents');
//       }
//     };

//     fetchAgents();
//   }, []);

//   useEffect(() => {
//     const fetchAgentLists = async () => {
//       try {
//         // Make sure this URL matches your backend endpoint that serves the AgentList documents
//         const res = await axios.get("http://localhost:3000/getAgentLists");
//         console.log(res.data.lists);
//         setAgentLists(res.data.lists);
//       } catch (err) {
//         setError(err.response?.data?.message || "Error fetching agent lists");
//       }
//     };

//     fetchAgentLists();
//   }, []);

//   const handleDelete = async (id)=>{
//     try {
//       const res = await axios.delete(`http://localhost:3000/deleteAgent/${id}`);
//       console.log(res.data)
//       setAgents((prev) => prev.filter((agent) => agent._id !== id));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error deleting agent');
//     }
//   }
//   return (
//     <div>
//       <Navbar/>
//       {/* <h2>Agents</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {agents.length ? (
//         <ul>
//           {agents.map((agent) => (
//             <li key={agent._id}>
//               {agent.name} - {agent.email} - {agent.mobile} - {agent.task}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No agents available.</p>
//       )} */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//       {agents.map((agent) => (
//         <div key={agent.agentId} className="border p-4 rounded shadow">
//           <h2 className="text-xl font-bold mb-2 capitalize">Agent {agent.name}</h2>
//           <ul className="space-y-2">
//             {agent.tasks.map((task, idx) => (
//               <li key={idx} className="border p-2 rounded">
//                 <p><strong>Name:</strong> {task.FirstName}</p>
//                 <p><strong>Phone:</strong> {task.Phone}</p>
//                 <p><strong>Notes:</strong> {task.Notes}</p>
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={() => handleDelete(agent._id)}
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete Agent
//           </button>
//         </div>
//       ))}
//     </div>
//     {error && <p className="text-red-600 p-4">{error}</p>}
//     </div>
//   );
// }

// export default Agents;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Agents() {
  const [agentLists, setAgentLists] = useState([]);
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgentLists = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getAgentLists");
        // console.log(res.data.lists);
        setAgentLists(res.data.lists);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching agent lists");
      }
    };

    fetchAgentLists();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getAgents");
        // console.log(res.data.agents);
        setAgents(res.data.agents);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching agents");
        setAgents([]);
      }
    };

    fetchAgents();
  }, []);

  console.log(agents);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteAgent/${id}`);
      setAgents((prev) => prev.filter((list) => list._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting agent");
      // console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {agentLists.length ? (
          agentLists.map((list) => (
            <div key={list._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Agent {list.agentId}</h2>
              <ul className="space-y-2">
                {list.tasks.map((task, idx) => (
                  <li key={idx} className="border p-2 rounded">
                    <p>
                      <strong>Name:</strong> {task.FirstName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {task.Phone}
                    </p>
                    <p>
                      <strong>Notes:</strong> {task.Notes}
                    </p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDelete(list._id)}
                className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white border border-black cursor-pointer"
              >
                Delete Agent
              </button>
            </div>
          ))
        ) : (
          <p className="p-4">No agent lists available.</p>
        )}
      </div>
      {error && <p className="text-red-600 p-4">{error}</p>} */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {agents.map((agent) => (
          <div key={agent._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2 capitalize">
              Agent {agent.name}
            </h2>
            <ul className="space-y-2">
              {agent.tasks && agent.tasks.length > 0 ? (
                <ul className="space-y-2">
                  {agent.tasks.map((task, idx) => (
                    <li key={idx} className="border p-2 rounded">
                      <p>
                        <strong>Name:</strong> {task.FirstName}
                      </p>
                      <p>
                        <strong>Phone:</strong> {task.Phone}
                      </p>
                      <p>
                        <strong>Notes:</strong> {task.Notes}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks assigned</p>
              )}
            </ul>
            <button
              onClick={() => handleDelete(agent._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Agent
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-600 p-4">{error}</p>}
    </div>
  );
}

export default Agents;
