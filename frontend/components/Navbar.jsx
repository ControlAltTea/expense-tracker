import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <nav class="bg-green-300 flex justify-between items-center p-5">
      <Link class="text-3xl" to="/">
        Expense Tracker
      </Link>

      <ul class="flex p-0 m-0 gap-5">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
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
