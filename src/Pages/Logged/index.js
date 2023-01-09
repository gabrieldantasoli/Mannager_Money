import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from '../../Contexts/authGoogle'
import './Logged-Style.css';
import Save from '../../images/save.png';
import Out from '../../images/out.png';

// Cloud Firestore
import { doc, getFirestore, setDoc , collection, getDocs, addDoc, updateDoc } from "firebase/firestore"; 
import { app } from "../../Services/firebaseConfig";
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";




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

    // Cloud fireStores starts ----------------------
    const [info , setInfo] = useState("");
    const [history, setHistory] = useState("");

    // database 
    const database = getFirestore(app);

    async function initializeData() {
        await setDoc(doc(database , userLogado.uid , "info_values"), {
            valor: 0,
            debts: 0,
            goal: 0,
            goalSavings: 0,
        },{ capital: true }, { merge: true });
        await setDoc(doc(database , userLogado.uid , "history"), {
            
        },{ capital: true }, { merge: true });

        /*const data = collection(database , userLogado.uid)
        await setDoc(doc(data,"values"), {
            value: 123,
            a: 1,
            b:2
        })*/
        
    };
    
    useEffect(() => {
        async function getData() {
            const data = await getDocs(collection(database, userLogado.uid));
            if (data.docs.length === 0) {
                initializeData();
            } else {
                setInfo(data.docs[1].data());
                setHistory(data.docs[0].data());
            }
        }

        getData()
    },[]);

    async function setGoal(valor) {
        setInfo({
            debts: info['debts'],
            goal: valor,
            goalSavings: info['goal'],
            valor: info['valor']
        });


        console.log(userLogado.uid)
        const infoDoc = doc(database , userLogado.uid, "info_values");

        await updateDoc(infoDoc, {
            debts: info['debts'],
            goal: valor,
            goalSavings: info['goalSavings'],
            valor: info['valor']
        });
    }

    // Cloud fireStores ends ------------------------
    

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
                        <p>saldo : <span className="saldo">R${info['valor']}</span></p>
                        <div className="relacion">
                            <div className={info["debts"] === 0 ? "full" : ""} style={info['debts'] === 0 ? {"": ""} :  (info["valor"]  === 0 ? {"width": "0"} : {"width": `${(info['valor'] / (info['valor'] + info['debts']) ) * 100}%`,"backgroundColor": "#267365"})}></div>
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
                    <button className="setGoal" onClick={() => setGoal(5000)}>Set Goal</button>
                    <h2>My Savings</h2>
                    <div>
                        <p>Goal : <span className="goal">R${info['goal']}</span></p>

                    </div>
                    <div className="conclued">
                        <p className="conc">{info["goal"] === 0 ? "100" : (info[ 'goalSavings'] / info['goal'] * 100)}%</p>
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