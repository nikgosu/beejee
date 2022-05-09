import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/beejee' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
