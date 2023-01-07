import { createContext ,useEffect,useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, EmailAuthProvider , signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../Services/firebaseConfig';
import { Navigate } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';

const provider = new GoogleAuthProvider();
const providerEmail = new EmailAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionToken && sessionUser) {
                setUser(sessionUser);
            }
        };

        loadStoreAuth();
    }, []);

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setUser(user);
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    function emailLogin(email , password) {
        signInWithEmailAndPassword(getAuth(app) ,email, password)
        .then((result) => {
            const user = result.user;
            setUser(user);
            const token =  user.getIdToken();
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }).catch((error) => {
            alert(error)
        });
    }

    function createLogin(email , password) {
        createUserWithEmailAndPassword(getAuth(app),email, password)
        .then(function(user) {
            console.log('User created successfully', user);
        })  
        .catch(function(error) {
            console.error('Error creating user', error);
        });
    }
    

    function signOut() {
        sessionStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    }

    return(
        <AuthGoogleContext.Provider value={{ signInGoogle , createLogin , emailLogin , signed: !!user, user , signOut }}>
            {children}
        </AuthGoogleContext.Provider>
    )
}