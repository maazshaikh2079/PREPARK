import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    sendEmailVerification // Add this import
} from "firebase/auth";
import {  authSAP } from "../configurations/firebase-config-SAP.js";

const userAuthContextSAP = createContext();

export function UserAuthContextProviderSAP({ children }) {
    const [user, setUser] = useState("");
    
    function signUp(email, password) {
        return createUserWithEmailAndPassword(authSAP, email, password);
    }
    
    function logIn(email, password) {
        return signInWithEmailAndPassword(authSAP, email, password);
    }
    
    function logOut() {
        return signOut(authSAP);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(authSAP, googleAuthProvider);
    }


    // function verifyEmail(email) {
    //     return sendEmailVerification(auth,email); // Send email verification
    // }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authSAP, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <userAuthContextSAP.Provider value={{user, signUp, logIn, logOut, googleSignIn}}>{children}</userAuthContextSAP.Provider>;
   // return <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn, verifyEmail}}>{children}</userAuthContext.Provider>;
}

export function useUserAuth() {
    return useContext(userAuthContextSAP);
}
