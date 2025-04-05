import '../styles/global.css'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Home() {
    const navigate = useNavigate();
    
    return (
        <>
        <Navbar/>
        <div className="home-container">
            <h1>Public Art Data Application System</h1>
            <p className='home-text'>Empowering communities to measure and shape the impact of public art. <br/>
            Discover how our data collection platform helps drive informed, 
            community-focused urban design.</p>
            <button className='blue-button' onClick={()=> navigate('/installation-selection')}>Get Started</button>

            <footer className="home-footer">
                <a href="https://www.vanalen.org/" target="_blank" rel="noopener noreferrer">
                    Visit Van Alen Institute’s Site
                </a>
            </footer>

        </div>
    </>
    );
    

}