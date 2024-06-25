import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Import context from App.jsx
import { AuthContext } from "../src/App";

// Import expense tracker logo
import piggyBank from "/img/piggy-bank.svg";

function Navbar() {
  //Destructure loggedIn state and setLoggedIn function from context
  //So that this is accessible from App.jsx
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  //useNavigate hook to redirect to a different route
  const navigate = useNavigate();

  //function to handle logout
  //remove token from browser storage
  //set loggedIn to false and navigate to homepage
  function handleLogout() {
    sessionStorage.clear();
    setLoggedIn(false);
    console.log(`User Signed Out`);
    navigate("/");
  }

  return (
    // conditionally render links in navbar depending on loggedIn state

    <nav className="bg-exTraGreen flex justify-between p-5 font-bold">
      <Link to="/" className="flex flex-row items-end align-bottom justify-end">
        <div className="flex flex-column items-end align-bottom justify-end place-content-end">
          <img src={piggyBank} className="flex w-10 h-10"></img>
          <div className="flex font-semibold text-3xl">ExTra</div>
        </div>
      </Link>

      <ul className="flex">
        <li className="">
          {loggedIn && <Link to="/dashboard">Dashboard</Link>}
        </li>
        <li className="ml-2 mr-2">
          {!loggedIn && <Link to="/login">Log In</Link>}
        </li>
        <li className="ml-2 mr-2">
          {!loggedIn && <Link to="/signup">Sign Up</Link>}
        </li>

        {loggedIn && (
          <li className="mr-2">
            <button onClick={handleLogout} className="">
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
