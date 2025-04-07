import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/auth.css';
import API from '../utils/apiClient';

export default function Signup() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const navigate = useNavigate();

    // rather than doing this manually, we are creating a function that handles the input changes within our form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({...prev, [name]:value}))
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // we are defining this here because we are submitting this to the backend for processing
        const {email, firstName, lastName, password, confirmPassword} = userInfo;

        if (password != confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!passwordPattern.test(password)) {
            setError('Passwords must have a minimum of eight characters, one number and one special character.');
            return;
        }
        if (!emailPattern.test(email)) {
            setError('Invalid email, please make sure to use a proper email address!');
            return;
        }

        try {
            const res = await API.post('/register-user', {
                email,
                firstName,
                lastName,
                password,
            });
            console.log('Registered: ', res.data)
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
            console.error('Registration error:', err);
        }

    }

    return (
        <>
        <Logo/>
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={userInfo.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={userInfo.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleChange}
                    required
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={userInfo.password}
                        onChange={handleChange}
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

                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={userInfo.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                    >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
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

