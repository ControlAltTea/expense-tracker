import "./App.css";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Overview from "../pages/Overview";
import Footer from "../components/Footer";;

import { Navigate, Route, Routes } from "react-router-dom";

import { createContext, useState, useEffect } from "react";
import Team from "../pages/Team";

//Create context
export const AuthContext = createContext();
export const IncomeContext = createContext();
export const ExpenseContext = createContext();

function App() {
  //Declare state that will be accessible from other components
  const [loggedIn, setLoggedIn] = useState(false);
  const [incomeResponse, setIncomeResponse] = useState();
  const [expenseResponse, setExpenseResponse] = useState();

  const token = sessionStorage.getItem("jwt-token");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn, incomeResponse, expenseResponse]);

  //Wrap App with provider and set values to state declared earlier
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <IncomeContext.Provider value={{ incomeResponse, setIncomeResponse }}>
        <ExpenseContext.Provider
          value={{ expenseResponse, setExpenseResponse }}
        >
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={loggedIn ? <Dashboard /> : <Login />}
            />
            <Route
              path="/login"
              element={!loggedIn ? <Login /> : <Navigate to={"/dashboard"} />}
            />
            <Route
              path="/signup"
              element={!loggedIn ? <Signup /> : <Navigate to={"/dashboard"} />}
            />
            <Route
              path="/overview"
              element={!loggedIn ? <Signup /> : <Overview />}
            />

            <Route
              path="/team"
              element={loggedIn ? <Team /> : <Signup />}
            />
          </Routes>

          <Footer />
        </ExpenseContext.Provider>
      </IncomeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
