import { useContext } from "react";
import { AuthGoogleContext } from '../../Contexts/authGoogle'
import './Logged-Style.css';

export default () => {
    const { user , signOut , signed } = useContext(AuthGoogleContext);
    
    let userLogado;
    try {
        userLogado = JSON.parse(user);
    }catch {
        userLogado = user;
    }

    const data = userLogado.providerData[0];

    function logOut() {
        signOut();
    }

    return(
        <div className="logged">
            <header>
                <div className="logo">
                    <h2>M_Mannager</h2>
                </div>
                <div className="user">
                    <p><span>User : </span>{data.displayName === null ? data.email.split("@")[0].toUpperCase() : data.displayName}</p>
                </div>
            </header>
            
            <main>
                <div className="show">
                    <div className="showA">
                        <p>saldo : <span className="saldo"></span></p>
                        <div className="relacion">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    
                    <div className="showB">
                        <button className="dividas">ver Dívidas</button>
                        <button className="lucros">ver Renda</button>
                    </div>
                </div>

                <div className="add">
                    <button className="addDividas">Add Dívidas</button>
                    <button className="addLucros">Add Renda</button>
                </div>

                <div className="history">
                    history
                </div>

                <div className="savings">
                    <button className="modifyGoal">Goal</button>
                    <p>Goal : 100</p>
                    <div className="conclued">
                        <p className="conc">50%</p>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="savButts">
                    <button className="saveAdd">Add Savings</button>
                    <button className="saveRemove">Del Savings</button>
                    </div>
                </div>
            </main>

            <footer>
                <button className="logout" onClick={logOut}>logOut</button>
                <p>Made with React and Firebase</p>
            </footer>
        </div>
        
    )
}