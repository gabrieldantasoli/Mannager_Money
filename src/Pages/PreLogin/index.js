import Save from '../../images/save.png';
import { Link } from 'react-router-dom';
import './PreLogin-Style.css'

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../Contexts/authGoogle";

export default () => {
    const { signInGoogle , signed } = useContext(AuthGoogleContext);

    async function loginGoogle() {
        await signInGoogle();
    }

    if (!signed) {
        return (
            <div className="logins">
                <header>
                    <div>
                        <img src={Save} alt="logo" />
                        <h2>Authentication With</h2>
                    </div>
                    
                    <p>Por favor , escolha uma maneira para se identificar.</p>
                </header>
                <div className='buttons'>
                    <button onClick={ loginGoogle } className='google'><span className='blue'>G</span><span className='red'>o</span><span className='yellow'>o</span><span className='blue'>g</span><span className='green'>l</span><span className='red'>e</span></button>
                    <Link to="/loginemail" className='email'>E-mail</Link>
                </div>
                
            </div>
        )
    } else {
        return <Navigate to="/logged" />;
    }

}