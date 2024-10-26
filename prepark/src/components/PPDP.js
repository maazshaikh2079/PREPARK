import { useState, useEffect } from 'react';
import { dbPP } from "../configurations/firebase-config-PP.js";
import "./PPDP.css"

import { 
    collection, 
    getDocs,   // R
    addDoc,    // C
    updateDoc, // U
    doc,       // U
    deleteDoc  // D
  } from "firebase/firestore";

  function PPDP() {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(dbPP, "Parking_Users");
  
  
    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(users);
      };
      getUsers();
    },[]);
  
    return (
        <div>
        <h1>Public Parking Users</h1>
        <br/>
        
        {
          users.map((pUser) => {
            return (
            <div>
              <div className='card'>
                <br/>
                <b>Name    : {pUser.Name}</b>
                <b>Email   : {pUser.Email}</b>
                <b>Phone   : {pUser.Phone}</b>
                <b>Vehicle : {pUser.Vehicle}</b>
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
  
  export default PPDP;
  