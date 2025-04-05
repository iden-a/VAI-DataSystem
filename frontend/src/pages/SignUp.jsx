import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/auth.css';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        console.log("Sign Up Info:", { firstName, lastName, email, password });

        // Placeholder for backend sign-up logic
        navigate('/dashboard'); // Redirect after successful signup
    };

    return (
        <>
        <Logo/>
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <p>
                Already have an account? <a href="/login">Log in</a>
            </p>

        </div>
        <footer className="login-signup-footer">Only Van Alen Instititute’s Staff Can Create An Account</footer>
        </>

    );
}

