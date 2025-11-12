import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Pages/Login';
import Signuppage from './pages/Signuppage';
import Giftsstorepage from "./Pages/Giftsstorepage";
import Contactpage from "./pages/Contact_Page";
import AboutUs from './Pages/AboutUs'; 
import './App.css'; 


const App = () => {



  return (
    <div>
    <BrowserRouter  >
        <Routes>
          <Route path='/' element={<Login />}></Route>
          {/* <Route path='/signuppage' element={<Signuppage />}></Route> */}
          <Route path='/giftsstorepage' element={<Giftsstorepage />}></Route>
          <Route path='/Contact_Page' element={<Contactpage />}></Route>
          <Route path='/AboutUs' element={<AboutUs />}></Route>
         
         
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App