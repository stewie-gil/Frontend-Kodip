import { Routes, Route } from "react-router-dom";
import React,{useEffect} from 'react';
import LandingPage from "./pages/LandingPage";
import Nopage from "./pages/Nopage";
import Layout from "./components/layout/Layout";
import Map from "./pages/Map";
import Listings from "./pages/Listings";
import ListProperty from "./pages/listproperty";
import Profile from "./pages/profileSettings";
import Manage from "./pages/management";
import Connect from "./pages/connect"

function App(){


  // Ensure that the socket is disconnected when the component unmounts
  
  return (
    <div className="App">
    
      <Routes>
        <Route element={<Layout />}>

          <Route index element={<LandingPage />} />
          <Route path="map" element={<Map/>}/>
          <Route path="listings" element={<Listings/>}/>

          
          <Route path= "listhouse" element={<ListProperty/>}/>
          <Route path= "profile" element={<Profile/>}/>
          <Route path= "manage" element={<Manage/>}/>
          <Route path= "connect" element={<Connect/>}/>

          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
