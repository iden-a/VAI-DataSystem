import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/auth.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Info:", { email, password });

        // Placeholder for auth logic (Firebase)
        navigate('/dashboard'); // Redirect after login
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
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="auth-button">Log In</button>
            </form>
            <p>
                Don't have an account? <a href="/sign-up">Sign up</a>
            </p>
        </div>
        <footer className="login-signup-footer">Only Van Alen Instititute’s Staff Can Create An Account</footer>

        </>

    );
}
