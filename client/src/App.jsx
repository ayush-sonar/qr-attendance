import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import ParticipantList from './pages/ParticipantList';
import LoginPage from './components/Home/LoginPage';
 import Protected from "./Protected";
function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<LoginPage />} />
        <Route path='/home' 
        element={
          <Protected allowedRoles={['admin']}>
          <Home />
          </Protected>} />
        <Route path='/participants'

         element={<Protected allowedRoles={['admin']}>
          <ParticipantList /> 
          </Protected>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
