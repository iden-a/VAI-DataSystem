import '../styles/global.css';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function Navbar() {
    const {isAuthenticated, setIsAuthenticated, setSurveyData, setUser} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // remove the stored token
        setUser({});
        setIsAuthenticated(false);
        setSurveyData([]);
        navigate("/");
      };

    if(isAuthenticated) {
        return(
            <div className="navbar-container">
            <Logo />
            <div className="login-sign-up">
                <h2 className='dashboard' onClick={() => navigate('/dashboard')}>Dashboard</h2>
                <h2 className='login' onClick={handleLogout}>Logout</h2>
            </div>
        </div>
        )
    }

    return (
        <>
            <div className="navbar-container">
                <Logo />
                <div className="login-sign-up">
                    <h2 className='login' onClick={() => navigate('/login')}>Login</h2>
                    <h2 className='sign-up' onClick={() => navigate('/sign-up')}>Sign&nbsp;Up</h2>
                </div>
            </div>
        </>
    );
}
