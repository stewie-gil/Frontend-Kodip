import { Routes, Route } from "react-router-dom";
import React,{useEffect} from 'react';
import LandingPage from "./pages/LandingPage";
import Nopage from "./pages/Nopage";
import Layout from "./components/LandingPage/layout/Layout";
import Map from "./pages/Map";
import Listings from "./pages/Listings";
import ListProperty from "./components/MapPage_Components/listproperty";
import Profile from "./pages/profileSettings";
import Manage from "./pages/PropertyManagement";
import Connect from "./components/ConnectPage/connect"
import PostListPage from "./components/ConnectPage/PostListPage";
import PostDetailsPage from "./components/ConnectPage/PostDetailsPage";

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

          <Route path= "connectpage" element={<PostListPage/>}/>
          <Route path= "posts/:postId" element={<PostDetailsPage/>} /> {/* Route for post details */}

          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
