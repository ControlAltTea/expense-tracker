import React from "react";

function Team() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:flex-col md:flex-row lg:flex-row mt-24">
      <div className="m-6 lg:w-3/12">
        <div className="bg-green-100 rounded-lg shadow text-l font-medium h-fit  text-center p-4 mt-24 ">
          Vinson Han
        </div>

        <div className="flex-col flex items-center rounded-lg shadow bg-white p-14">
          <a
            target="_blank"
            href="https://github.com/vinson-han"
            className="flex items-center mb-10"
          >
            <img className="mr-4" src="/Icons/github.png" />
            <div>GitHub</div>
          </a>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/vinson-han/"
            className="flex items-center"
          >
            <img className="mr-3" src="/Icons/linkedin.png" />
            <div>LinkedIn</div>
          </a>
        </div>
      </div>

      <div className="m-6 lg:w-3/12">
        {" "}
        <div className="bg-green-100 rounded-lg shadow text-l font-medium h-fit  text-center p-4 mt-24">
          Jose Santiago
        </div>
        <div className="flex-col flex items-center rounded-lg shadow bg-white p-14">
          <a
            target="_blank"
            href="https://github.com/santi-jose"
            className="flex items-center mb-10"
          >
            <img className="mr-4" src="/Icons/github.png" />
            <div>GitHub</div>
          </a>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/j-santi/"
            className="flex items-center"
          >
            <img className="mr-3" src="/Icons/linkedin.png" />
            <div>LinkedIn</div>
          </a>
        </div>
      </div>

      <div className="m-6 lg:w-3/12">
        {" "}
        <div className="bg-green-100 rounded-lg shadow text-l font-medium h-fit  text-center p-4 mt-24">
          Kevinn Gonzales
        </div>
        <div className="flex-col flex items-center rounded-lg shadow bg-white p-14">
          <a
            target="_blank"
            href="https://github.com/kevinngonzales"
            className="flex items-center mb-10"
          >
            <img className="mr-4" src="/Icons/github.png" />
            <div>GitHub</div>
          </a>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/kevinngonzales/"
            className="flex items-center"
          >
            <img className="mr-3" src="/Icons/linkedin.png" />
            <div>LinkedIn</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Team;
