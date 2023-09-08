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
import { auth } from "../firebase-config.js";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("");
    
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    function logOut() {
        return signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }


    // function verifyEmail(email) {
    //     return sendEmailVerification(auth,email); // Send email verification
    // }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn}}>{children}</userAuthContext.Provider>;
   // return <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn, verifyEmail}}>{children}</userAuthContext.Provider>;
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
