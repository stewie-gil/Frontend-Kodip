import React, { useState } from 'react';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import MessageApp from '../message/Envelope.js';
import { useSocketContext } from '../../../hooks/useSocketContext.js';

const SideBar = () => {
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const { onlineUsers, send, setMessages, messages, readnotification } = useSocketContext();

  console.log('sidebar render');

  const handleClickEnvelope = (event) => {
    event.preventDefault();
    setOpenEnvelope(!openEnvelope);
  }

  const handleClickBuilding = (event) => {
    event.preventDefault();
    setMessages(messages === 'now' ? '' : 'now');
  }

  return (
    <>
      <div className='sidebar'>
        <div className='allIcons'>
          <Link to="/"> 
            <FontAwesomeIcon icon={faHouse} className='icons' />
          </Link>
          <Link to="/map"> 
            <FontAwesomeIcon icon={faMapLocationDot} className='icons' />
          </Link>
          <FontAwesomeIcon 
            icon={faEnvelope} 
            className={`icons ${openEnvelope ? 'active' : ''}`} 
            onClick={handleClickEnvelope}
          />
          <Link to="/listings"> 
            <FontAwesomeIcon 
              icon={faBuilding} 
              className={`icons ${messages === 'now' ? 'active' : ''}`} 
              onClick={handleClickBuilding}
            />
          </Link>
          <FontAwesomeIcon icon={faNewspaper} className='icons' />
        </div>     
      </div>
      {openEnvelope && <MessageApp/>}
    </>
  );
};

export default SideBar;
