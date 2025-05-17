import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FrontPage from './components/FrontPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentFrom from './components/AgentFrom';
import Agents from './components/Agents';
import LogOut from "./components/Logout";
import Upload from "./components/Upload";

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={token ? <FrontPage/> : <Navigate to={'/login'}/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/addAgent' element={<AgentFrom/>}/>
        <Route path='/agents' element={<Agents/>}/>
        <Route
              path="/Logout"
              element={token ? <LogOut /> : <Navigate to="/Login" />}
            />
            <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
