import React from 'react';
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

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/installation-selection' element={<Installation/>}></Route>
        <Route path='/survey' element={<Survey/>}></Route>
        <Route path='/survey-complete' element={<ThankYou/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/sign-up' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route> 
      </Routes>
    </Router>
    </>
  )
}

export default App
