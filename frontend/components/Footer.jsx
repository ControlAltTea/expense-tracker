import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-300 h-20 mt-24 flex items-center">
      <div className="flex ml-8">
        <Link to={"/team"}>
          <div className="flex items-center">
            <div>
              <img className="mr-2 h-[35px]" src="/public/Icons/team.png" />
            </div>

            <div className="">Meet The Team</div>
          </div>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
