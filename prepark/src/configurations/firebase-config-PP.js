import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigPP = {
  apiKey: "AIzaSyCIheP9reHJ3SdDiyIrIhLpxvOKmHqfg74",
  authDomain: "prepark-pp.firebaseapp.com",
  projectId: "prepark-pp",
  storageBucket: "prepark-pp.appspot.com",
  messagingSenderId: "408591279880",
  appId: "1:408591279880:web:187e7d447309e739cdaebd",
  measurementId: "G-7VQ3L76TMG"
}

const appPP = initializeApp(firebaseConfigPP, "ppApp");
export const dbPP = getFirestore(appPP);
export const authPP = getAuth(appPP);
export default appPP;