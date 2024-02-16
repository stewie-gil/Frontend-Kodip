import React, { useState } from 'react';
import './ListProperty.css'

export default function ListProperty(){
const [connectModal, setConnectModal] = useState(false)
    
const handleModalOpen = ()=>{

if (connectModal == false){
    setConnectModal(true)
} else{
    setConnectModal(false)
}
}


const handleSubmitConnect = ()=>{ }
    






    return (
        <> 
        <div> 
        <button onClick={handleModalOpen} className="connect">List Property</button>
        </div>
     
     {connectModal &&
        <form onSubmit={handleSubmitConnect} className="form">
        <p style = {{fontWeight: 'bold'}}> Welcome back! Login with your details below 😊! </p>
          <input
            type="email"
            placeholder="Email"
            
            
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
           
            
            className="input"
          />
          <button type="submit" className="button" >Log in</button>
          <button  className="button">Sign Up</button>
        
        </form>
        
     } 
     
     
     </>

)}