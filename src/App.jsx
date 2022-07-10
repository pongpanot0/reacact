import "./App.css";
import React, { Component }  from 'react';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UpdateForm from "./components/UpdateForm";
import Sidebar from "./components/sidebar";

function App() {
  return (
    
    <div >
      <div style={{backgroundColor:'rgb(255, 253, 208)'}}>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
      </div>
   
     
       <div >
      
 
<div >
<Routes>        
        <Route exact path="/home" element={<Navbar />} />
        <Route exact path="/edit/:id" element={<UpdateForm />} />
        {/*   <Category/> */}
      </Routes>
</div>

  </div>
     
   </div>
  );
}

export default App;
