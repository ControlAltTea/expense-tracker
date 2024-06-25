import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-300 h-20 mt-24 flex items-center">
      <div className="flex ml-8">
        <Link to={"/team"} className="flex items-center">
          <div>
            <img className="mr-2 h-8" src="/Icons/team.png" alt="Team Icon" />
          </div>
          <div>Meet The Team</div>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
