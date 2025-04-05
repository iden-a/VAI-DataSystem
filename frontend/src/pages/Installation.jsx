import Logo from '../components/Logo';
import '../styles/global.css'
import { useNavigate } from 'react-router-dom';

export default function Installation() {
    const navigate = useNavigate();

    return (
         
        <>
        <Logo />
            <h2 className='installation-h2'>Which Installation Did You View?</h2>
            <div className="installation-container">
                
                <div className='installation-1'>
                    <img src='/placeholder-img.jpg' alt="Installation 1" className='installation-img'/>
                    <p>Installation 1</p>
                    <button className='blue-button' onClick={()=> navigate('/survey')}>Select</button>
                </div>

                <div className='installation-2'>
                    <img src='/placeholder-img.jpg' alt="Installation 2" className='installation-img'/>
                    <p>Installation 2</p>
                    <button className='blue-button' onClick={()=> navigate('/survey')}>Select</button>
                </div>
            </div>
        </>
    );
}