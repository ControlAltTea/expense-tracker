import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Import context from App.jsx
import { AuthContext } from "../src/App";

function Navbar() {
  //Destructure loggedIn state and setLoggedIn function from context
  //So that this is accessible from App.jsx
  const {loggedIn, setLoggedIn} = useContext(AuthContext);

  //useNavigate hook to redirect to a different route
  const navigate = useNavigate();

  //function to handle logout
  //remove token from browser storage
  //set loggedIn to false and navigate to homepage
  function handleLogout() {
    sessionStorage.removeItem("jwt-token");
    setLoggedIn(false);
    console.log(`User Signed Out`);
    navigate("/");
  }

  return (

// conditionally render links in navbar depending on loggedIn state

    <nav className="bg-green-300 flex justify-between items-center p-5">
      <Link className="text-3xl" to="/">
        Expense Tracker
      </Link>

      <ul className="flex p-0 m-0 gap-5">
        <li>
          {loggedIn && <Link to="/dashboard">Dashboard</Link>}
        </li>
        <li>
          {!loggedIn && <Link to="/login">Log In</Link>}
        </li>
        <li>
          {!loggedIn && <Link to="/signup">Sign Up</Link>}
        </li>

        {loggedIn && <li>
         <button onClick={handleLogout}>Log Out</button>
        </li>}
      </ul>
    </nav>
  );
}

export default Navbar;
