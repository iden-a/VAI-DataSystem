import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/auth.css';
import API from '../utils/apiClient';
import { useAuth } from '../utils/AuthContext'; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../utils/firebaseConfig"; 
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default function Login( ) {
    const { setIsAuthenticated, setUser, setSurveyData } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          const idToken = await userCred.user.getIdToken();

          // additional security step to verify that the correct user is being logged in
          const res = await API.post("/verify-token", { idToken });
            console.log("Verified backend UID:", res.data.uid);
    
          // save token and user to localStorage
          localStorage.setItem("jwtToken", idToken);
          localStorage.setItem("user", JSON.stringify({
            email: userCred.user.email,
            uid: userCred.user.uid,
          }));
    
          setUser({ email: userCred.user.email, uid: userCred.user.uid });
          setIsAuthenticated(true);
    
          // fetch survey data after login
          const surveyRes = await API.get('/get-survey-responses');
          setSurveyData(surveyRes.data);
          localStorage.setItem("surveyData", JSON.stringify(surveyRes.data));
    
          navigate("/dashboard");
        } catch (err) {
          console.error("Token verification failed", err);
          console.error("Login error:", err);
          setError("Invalid email or password.");
        }

        setEmail('')
        setPassword('')
      };
        
    return (
        <>
        <Logo/>
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                
                <button type="submit" className="auth-button">Log In</button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <p>
                Don't have an account? <a href="/sign-up">Sign up</a>
            </p>
        </div>
        <footer className="login-signup-footer">Only Van Alen Instititute’s Staff Can Log Into An Account</footer>

        </>

    );
}
