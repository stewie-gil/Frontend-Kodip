import React, { useState } from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

import MessageApp from './Envelope';


const SideBar = () => {
const [openEnvelope, setOpenEnvelope] = useState(false);



    const handleClickEnvelope = () =>{
        
        if(openEnvelope === false){
            setOpenEnvelope(true);
            
        } else{
            setOpenEnvelope(false)
        }
        

    }


  return (
    <>
    <div className='sidebar'>
      
      <div class='allIcons'>

         <FontAwesomeIcon icon={faHouse} className= 'icons' />
         <FontAwesomeIcon icon={faEnvelope}  className= 'icons'  onClick={handleClickEnvelope}/>
         <FontAwesomeIcon icon={faBuilding} className='icons' />
         <FontAwesomeIcon icon={faNewspaper} className='icons' />
         <FontAwesomeIcon icon={faMapLocationDot} className='icons' />
        
         
      </div>     
    </div>
    { openEnvelope && <MessageApp/>}
    </>
  );
};

export default SideBar;
