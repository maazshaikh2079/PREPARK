import { useState, useEffect } from 'react';
import { dbSAP } from "../configurations/firebase-config-SAP.js";
import "./SAPDP.css"

import { 
    collection, 
    getDocs,   // R
    addDoc,    // C
    updateDoc, // U
    doc,       // U
    deleteDoc  // D
  } from "firebase/firestore";

  function SAPDP() {
    const [residents, setResident] = useState([]);
    const usersCollectionRef = collection(dbSAP, "Residents");
  
  
    useEffect(() => {
      const getResidents = async () => {
        const data = await getDocs(usersCollectionRef);
        setResident(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(residents);
      };
      getResidents();
    },[]);
  
    return (
        <div>
        <h1>Residents</h1>
        <br/>
        
        {
          residents.map((resident) => {
            return (
            <div>
              <div className='card'>
                <br/>
                <b>Name    : {resident.Name}</b>
                <b>Room    : {resident.Room}</b>
                <b>Phone   : {resident.Phone}</b>
                <b>Email   : {resident.Email}</b>
                <b>Vehicle : {resident.Vehicle}</b>
                <br/>
              </div>
              <br/>
            </div>
            )
          })
        }
      </div>
    );
  }
  
  export default SAPDP;
  