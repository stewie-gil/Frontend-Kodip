import React, { useState } from 'react';
import './ListProperty.css'
import { Link } from "react-router-dom";

export default function ListProperty(){
const [listPropertyModal, setlistPropertyModal] = useState(false)
    
const handleModalOpen = ()=>{

if (listPropertyModal == false){
  setlistPropertyModal(true)
} else{
  setlistPropertyModal(false)
}
}


return (
  <>
    <div>
      <button onClick={handleModalOpen} className="listPropertybtn">List Property</button>
    </div>

    {listPropertyModal && (
      <div className="listPropertymodal">
        <div className="listPropertymodal-content">
          <span className="close" onClick={handleModalOpen}>&times;</span>
          <h4>Posting your property is easy. Just 3 steps:</h4>
          <ol>
            <li>Search on the map for your Property.</li>
            <li>Click on the property and fill out your details of your property on the popup.</li>
            <li>Click submit!</li>
            
          </ol>
          <>* Click here to learn more!</>
        </div>

        <div>
      <button className="listPropertybtn"> <Link to="/manage"> Manage Property </Link></button>
      
    </div>
      </div>

      
    )}
  </>
);

    
}