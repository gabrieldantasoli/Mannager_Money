import { Link } from "react-router-dom";
import { useState } from "react";

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../Contexts/authGoogle";

import '../LoginEmail/Login-Style.css';

import Save from '../../images/save.png';


export default () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { createLogin , signed } = useContext(AuthGoogleContext);

    async function createloginemail() {
        await createLogin(email,senha);
    }

    return(
        <div className="login">
            <header>
                <div>
                    <img src={Save} alt="logo" />
                    <h2>Authentication</h2>
                </div>
                
                <p>Por favor , digite suas informações de login.</p>
            </header>

            <main>
                <div className='form'>
                    <label htmlFor='email'>E-mail</label>
                    <input type="text" name="email" id="email" value={email} placeholder="somebody@gmail.com" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor='senha'>Senha</label>
                    <input type="password" name='senha' id="senha" value={senha} placeholder="************" onChange={(e) => setSenha(e.target.value)} />


                    <button className="button" onClick={createloginemail}>Entrar</button>
                </div>
            </main> 

            <footer>
                <p>Você não tem uma conta ? <Link to="/register">Crie uma conta</Link></p>
            </footer>
        </div>
    )
}