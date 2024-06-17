import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Import ToastContainer, this is where notification is rendered
//Import toast to utilize notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import context from App.jsx
import { AuthContext } from "../src/App";


function Login() {
  //Hook to redirect to a different route
  const navigate = useNavigate();


  // State variable for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Destructure setLoggedIn from context
  //Accessible from App.jsx
  const {setLoggedIn} = useContext(AuthContext);

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
    const loginUrl = "/api/login";
    const data = { email, password };

    //Checks if email or password is missing
    //Use toast to display error message
    if (!email || !password) {
      toast.error("Input fields cannot be empty.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    //Try block makes the API request
    try {
      // Await for fetch API to make a POST request
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set request content type to JSON
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //get response data
        //store token in brower's session storage
        const responseData = await response.json();

        const token = responseData.token;
        sessionStorage.setItem("jwt-token", token);

        // Reset input fields back to empty
        setEmail("");
        setPassword("");

        //Set loggedIn state to true
        setLoggedIn(true);
        //Set username's value to name

        // Redirect to dashboard after successful login
        navigate("/dashboard");
        //If unsuccesful response, use toast to alert error message
      } else {
        toast.error("Invalid Username or Password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      // Catch block for handling errors
      console.error(error);
    }
  }




  return (
    <>
      <div className="login-container">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center">
            <form onSubmit={handleLogin}>
              <div className="w-60 text-xl font-medium text-gray-900 dark:text-white my-8">
                <h5 className="flex justify-center">Login to your account</h5>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <div className="flex justify-center px-4 py-6">
                  <button
                    type="submit"
                    className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </div>

                <div className="flex items-center flex-col py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Don't have an account yet?
                  </div>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-green-500 hover:text-green-600"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
