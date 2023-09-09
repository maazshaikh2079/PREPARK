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
import { authPP } from "../configurations/firebase-config-PP.js";

const userAuthContextPP = createContext();

export function UserAuthContextProviderPP({ children }) {
    const [user, setUser] = useState("");
    
    function signUp(email, password) {
        return createUserWithEmailAndPassword(authPP, email, password);
    }
    
    function logIn(email, password) {
        return signInWithEmailAndPassword(authPP, email, password);
    }
    
    function logOut() {
        return signOut(authPP);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(authPP, googleAuthProvider);
    }


    // function verifyEmail(email) {
    //     return sendEmailVerification(auth,email); // Send email verification
    // }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authPP, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <userAuthContextPP.Provider value={{user, signUp, logIn, logOut, googleSignIn}}>{children}</userAuthContextPP.Provider>;
   // return <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn, verifyEmail}}>{children}</userAuthContext.Provider>;
}

export function useUserAuth() {
    return useContext(userAuthContextPP);
}
