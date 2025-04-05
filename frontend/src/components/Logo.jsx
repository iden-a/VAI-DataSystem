import '../styles/global.css'
import { useNavigate } from "react-router-dom";


export default function Logo() {
    const navigate = useNavigate();
    const navigateHome = (e) => {
        e.preventDefault();
        navigate('/')
    }
    return(
        <>
            <div className="logo" onClick={navigateHome}>
                <img src="/VAN-logo.png" alt="Van Alen Institute Logo - VAN" className='logo-img-1'/>
                <img src="/ALEN-logo.png" alt="Van Alen Institute Logo - ALEN" className='logo-img-2'/>
                <img src="/INSTITUTE-logo.png" alt="Van Alen Institute Logo - INSTITUTE" className='logo-img-3'/>
            </div>
        </>
    )
}