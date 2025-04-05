import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {

    const navigate = useNavigate();

    return (
        <>
        <Logo/>
        <div className="thank-you-container">
            <h1>Thank You for Your Submission!</h1>
            <p>We appreciate you taking the time to complete this survey.</p>
            <button onClick={() => navigate('/')} className="thank-you-button"> Home </button>
        </div>
        </>

    );
}
