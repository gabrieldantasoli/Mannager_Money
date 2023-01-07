import { useContext } from "react";
import { AuthGoogleContext } from '../../Contexts/authGoogle'

export default () => {
    const { user , signOut , signed } = useContext(AuthGoogleContext);
    
    let userLogado;
    try {
        userLogado = JSON.parse(user);
    }catch {
        userLogado = user;
    }

    function logOut() {
        signOut();
    }

    return(
        <div>
            <h1>{userLogado.displayName}, you are logged in this website.</h1>
            <p>It´s only this because I only want to learn about firebase authentication.</p>
            <button onClick={logOut}>LogOut</button>
        </div>
        
    )
}