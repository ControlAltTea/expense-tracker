import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Import ToastContainer, this is where notification is rendered
//Import toast to utilize notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  //method for redirecting page to login after signing up
  const navigate = useNavigate();

  //declare state for input fields, will hold input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to check if password has an uppercase letter
  //compare password to a lower cased version of password
  //if does not equal then there is an uppercase and return true
  function hasUpperCase(password) {
    return password !== password.toLowerCase();
  }

  //declare regex that excludes uppercase and lowercase letters a-z, and any numbers
  //function to check for special characters using .test() to return true if pattern exists in password
  const specialRegex = /[^A-Z a-z0-9]/;
  function hasSpecialChr(password) {
    return specialRegex.test(password);
  }

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
    const loginUrl = "/api/register";
    //store data as an object in order to post data to database
    const data = { firstName, lastName, email, password };

    //conditional statement to ensure that all fields are filled out before signing up
    //use toast to alert if input fields are left empty
    if (!firstName || !lastName || !email || !password) {
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

      const signUpResponse = await response.json();

      //if backend message responds with "Email already exist" alert user approriately
      if (signUpResponse.message === "Email already exist") {
        toast.error("User With Email Already Exists.", {
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

      //if backend message responds with "Password Critera Not Met" alert user approriately
      if (password.length <= 3) {
        toast.error("Password Must Be Longer Than 3 Characters.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      //check for uppercase letter
      if (hasUpperCase(password) === false) {
        toast.error("Password Must Contain an Uppercase Letter.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      //check for special character
      if (hasSpecialChr(password) === false) {
        toast.error("Password Must Contain a Special Character.", {
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

      if (response.ok) {
        //reset input fields back to empty
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");


        toast.success("Redirecting to Log In Page, Please Log In With Newly Created Account.", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });


        //redirect to login page so user can log in with newly created account
        //setTimeout to delay redirect
        setTimeout(() => {
          navigate("/login");
        }, 3600);
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="signup-container mb-20">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex justify-center">
            <form onSubmit={handleSignUp}>
              <div className="w-60 text-xl font-medium mb-12 mt-12 text-gray-900">
                <h5 className="flex justify-center">Sign up for an account</h5>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3 dark:bg-gray-700"
                />

                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
                />
              </div>

              <div className="flex justify-center flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <ul className="text-sm font-light text-gray-900 mb-2">
                  <li>- Must be longer than 3 characters </li>
                  <li>- Must contain an uppercase letter </li>
                  <li>- Must contain a special character </li>
                </ul>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="flex justify-center px-4 py-6">
                  <button
                    type="submit"
                    className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="flex items-center flex-col py-4">
                  <div className="text-sm font-medium text-gray-900">
                    Already Have an Account
                  </div>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-green-500 hover:text-green-600"
                  >
                    Log In
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

export default Signup;
