import '../styles/global.css';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

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
