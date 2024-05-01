import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const loginUrl = "http://localhost:3001/api/login";
    const data = { email, password };

    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

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

      setEmail("");
      setPassword("");

      navigate("/"); 

    } catch (error) {
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
