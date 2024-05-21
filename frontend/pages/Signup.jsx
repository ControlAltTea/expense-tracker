import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  //method for redirecting page to login after signing up
  const navigate = useNavigate();

  //declare state for input fields, will hold input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //functions to handle changes within input fields
  //update state values as user types
  //event as parameter
  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  //async function to handle signup
  //called when user clicks sign up
  //event as parameter
  async function handleSignUp(e) {
    //prevent default behavior of refreshing page when button is clicked
    e.preventDefault();

    //store backend register url in variable
    const loginUrl = "http://localhost:3001/api/register";
    //store data as an object in order to post data to database
    const data = { firstName, lastName, email, password };

    //conditional statement to ensure that all fields are filled out before signing up
    if (!firstName || !lastName || !email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    //try catch statement
    //inside try use react's native fetch method to post data to database
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      //reset input fields back to empty
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      //redirect to login page so user can log in with newly created account
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="signup-container">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center">
            <form onSubmit={handleSignUp}>
              <div class="w-60 text-xl font-medium text-gray-900 dark:text-white my-8">
                <h5 class="flex justify-center">Sign up for an account</h5>
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  id=""
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  id=""
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex justify-center flex-col">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  id=""
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password 
                </label> 
                <input
                  type="text"
                  value={password}
                  onChange={handlePasswordChange}
                  id=""
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />


                <div className="flex justify-center px-4 py-6">
                  <button
                    type="submit"
                    class="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="flex items-center flex-col py-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    Already Have an Account
                  </div>
                  <Link
                    to="/login"
                    class="text-sm font-medium text-green-500 hover:text-green-600"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
