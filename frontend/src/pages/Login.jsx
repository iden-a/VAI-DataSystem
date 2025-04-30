import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/auth.css';
import API from '../utils/apiClient';

export default function Login( { setUser, setIsAuthenticated, setSurveyData}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/login', {email, password})

            const { jwt_token, user } = res.data;
            localStorage.setItem('jwtToken', jwt_token);

            setUser(user);
            setIsAuthenticated(true);

            // fetch survey data after logging in 
            const surveyRes = await API.get('/get-survey-responses')
            setSurveyData(surveyRes.data)
            console.log("Survey Data: ", surveyRes.data)

            navigate('/dashboard'); 
            
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please enter a valid email/password.');
            console.error('Login error:', err);
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
