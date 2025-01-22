import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import ParticipantList from './pages/ParticipantList';
import LoginPage from './components/Home/LoginPage';

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/participants' element={<ParticipantList />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
