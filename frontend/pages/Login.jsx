import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  //Hook to redirect to a different route
  const navigate = useNavigate();

  // State variable for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Event handler for email input change
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  // Event handler for password input change
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // Event handler for login form submission
  async function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission behavior

    //Backend URLfor login
    const loginUrl = "http://localhost:3001/api/login";
    const data = { email, password };

    //Checks if email or password is missing
    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    //Try block makes the API request
    try {
      // Await for fetch API to make a POST request
      const response = await fetch(loginUrl, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",   // Set request content type to JSON
        },
        body: JSON.stringify(data),
      });

      // If response is not okay, an error is thrown with the status code
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      // Reset input fields back to empty
      setEmail("");
      setPassword("");

      // Redirect to dashboard after successful login
      navigate("/"); 

    } catch (error) {   // Catch block for handling errors
      console.error(error);
    }
  }

  return (
    <>
      <div className="login-container">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center">
            <form onSubmit={handleLogin}>
              <div class="w-60 text-xl font-medium text-gray-900 dark:text-white my-8">
                <h5 class="flex justify-center">Login to your account</h5>
              </div>

              <div>
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
                  type="password" 
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
                    Login
                  </button>
                </div>

                <div className="flex items-center flex-col py-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    Don't have an account yet?
                  </div>
                  <Link
                    to="/signup"
                    class="text-sm font-medium text-green-500 hover:text-green-600"
                  >
                    Sign Up
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

export default Login;
