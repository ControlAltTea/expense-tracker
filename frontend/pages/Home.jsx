import React from "react";
import { Link } from "react-router-dom";
import "/src/App.css";

import ExpenseGoals from "../components/Dashboard";
import IncomeForm from "../components/IncomeComponent/IncomeForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="homepageBackground">
        <div className="flex flex-col items-center">
          <div className="text-6xl p-8 my-8">
            Need help keeping track of your finances?
          </div>
          <div className="text-4xl my-2">
            Consult with our Financial Assistant AI Chatbot!
          </div>
          <div className="text-2xl p-8">
            Income, expenses, and savings all in one
          </div>
          <div className="flex flex-col w-full h-full md:flex-row items-center content-around justify-evenly my-8">
            <div className="flex flex-col w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8">
              <div className="text-2xl font-semibold">1. Record Income</div>
              <div className="text-xl">
                Track your income with built in features such as recurrence and
                category
              </div>
            </div>
            <div className="flex flex-col w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8">
              <div className="text-2xl font-semibold">2. Track Savings</div>
              <div className="text-xl">
                Track your expenses with built in features such as recurrence
                and category
              </div>
            </div>
            <div className="flex flex-col w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8">
              <div className="text-2xl font-semibold">3. Save Money</div>
              <div className="text-xl">
                Meet your savings goals by using the money leftover after paying
                dues
              </div>
            </div>
          </div>
          <Link
            to="/signup"
            className="w-40 my-4 bg-white hover:bg-green-500 hover:text-white font-semibold rounded-lg text-2xl px-5 py-2.5 text-center shadow-xl"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
