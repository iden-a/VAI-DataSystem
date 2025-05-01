import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Installation from './pages/Installation';
import Survey from './pages/Survey';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import './styles/global.css';
import API from './utils/apiClient';
import { AuthContext } from './utils/AuthContext';

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // whenever a user logs into the application, we want to authenticate then and store all the necessaey info (survey data, token, user info)
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      API.get("/get-survey-responses")
        .then(res => {
          setSurveyData(res.data);
          setIsAuthenticated(true);
          const storedUser = JSON.parse(localStorage.getItem("user"));
          if (storedUser) setUser(storedUser);
        })
        .catch(err => {
          console.error("Session check failed:", err);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  // using AuthContext so we can carry the state across multiple componenets
  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      surveyData,
      setSurveyData
    }}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/installation-selection' element={<Installation />} />
          <Route path='/survey' element={<Survey />} />
          <Route path='/survey-complete' element={<ThankYou />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;


