import "./App.css";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

//Create context
export const AuthContext = createContext();
export const NameContext = createContext();

function App() {

//Declare state that will be accessible from other components
const [loggedIn, setLoggedIn] = useState(false);
const [userName, setUserName] = useState('')

//Wrap App with provider and set values to state declared earlier
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      <NameContext.Provider value={{userName, setUserName}}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </NameContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
