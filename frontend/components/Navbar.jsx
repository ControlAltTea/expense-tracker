import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-green-300 flex justify-between items-center p-5">
        
      <Link className="text-3xl" to="/">
        Expense Tracker
      </Link>

      <ul className="flex p-0 m-0 gap-5">
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
