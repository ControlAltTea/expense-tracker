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

function App() {

//Declare state that will be accessible from other components
const [loggedIn, setLoggedIn] = useState(false);

//Wrap App with provider and set values to state declared earlier
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
