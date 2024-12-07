// import './App.css';
import { useState } from "react";
import Chat from "./Component/Chat";
import UserRegistration from "./Component/UserRegistration";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
const App = () => {
  
    return(
        <>
        <Router>
            <Routes>
                <Route path="/chat/react" element={<UserRegistration/>}></Route>
                <Route path="/chat/react/chat" element={<Chat/>}></Route>
            </Routes>
        </Router>
        </>
    )
};


export default App;
