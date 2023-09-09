import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfigSAP = {
    apiKey: "AIzaSyAl_UnxnxhlKqJUvBtZBSIUj1Fxc6uMYt8",
    authDomain: "prepark-sap.firebaseapp.com",
    projectId: "prepark-sap",
    storageBucket: "prepark-sap.appspot.com",
    messagingSenderId: "960592229642",
    appId: "1:960592229642:web:d9fc0b73af618e8bd076f3",
    measurementId: "G-GKWZNPWKHG"
  };

const appSAP = initializeApp(firebaseConfigSAP, "sapApp");
export const dbSAP = getFirestore(appSAP);
export const authSAP = getAuth(appSAP);
export default appSAP;