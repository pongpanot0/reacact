import "./App.css";
import React, { Component }  from 'react';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UpdateForm from "./components/UpdateForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Navbar />} />
        <Route exact path="/edit/:id" element={<UpdateForm />} />
        {/*   <Category/> */}
   
      </Routes>
    </div>
  );
}

export default App;
