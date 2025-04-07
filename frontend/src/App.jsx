import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Installation from './pages/Installation';
import Survey from './pages/Survey';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import './styles/global.css'

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [surveyData, setSurveyData] = useState({});

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/installation-selection' element={<Installation/>}></Route>
        <Route path='/survey' element={<Survey/>}></Route>
        <Route path='/survey-complete' element={<ThankYou/>}></Route>
        <Route path="/login" element={
          <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path='/sign-up' element={<Signup/>}></Route>
        <Route path="/dashboard" element={
          <Dashboard user={user} isAuthenticated={isAuthenticated} />
        } />
      </Routes>
    </Router>
    </>
  )
}

export default App
