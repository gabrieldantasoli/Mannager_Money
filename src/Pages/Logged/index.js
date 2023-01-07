import { useContext } from "react";
import { AuthGoogleContext } from '../../Contexts/authGoogle'
import './Logged-Style.css';
import Save from '../../images/save.png';
import Out from '../../images/out.png';

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
                    <img src={Save} alt="logo" /> 
                    <h2>M_Mannager</h2>
                </div>
                <div className="user">
                    <p><span>User : </span>{data.displayName === null ? data.email.split("@")[0].toUpperCase() : data.displayName}</p>
                </div>
            </header>
            
            <main>
                <div className="show">
                    <div className="showA">
                        <p>saldo : <span className="saldo">R$500</span></p>
                        <div className="relacion">
                            <div className="full"></div>
                        </div>
                    </div>
                    
                    <div className="showB">
                        <button className="dividas">show debts</button>
                        <button className="lucros">show income</button>
                    </div>
                </div>

                <div className="add">
                    <button className="addDebts">Add debts</button>
                    <button className="addIncomes">Add income</button>
                    <button className="pay">pay debt</button>
                </div>

                <div className="history">
                    <h2>History</h2>
                    <div className="history-children">

                    </div>
                </div>

                <div className="savings"> 
                    <button className="setGoal">Set Goal</button>
                    <h2>My Savings</h2>
                    <div>
                        <p>Goal : <span className="goal">R${12}</span></p>

                    </div>
                    <div className="conclued">
                        <p className="conc">{50}%</p>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="savingButts">
                        <button className="removeSave">Del Savings</button>
                        <button className="addSave">Add Savings</button>
                    </div>
                </div>
            </main>

            <footer>
                <img src={Out} alt="out img" className="out" onClick={logOut}/>
                <p>Made with React and Firebase</p>
            </footer>
        </div>
        
    )
}