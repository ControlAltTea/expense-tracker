<<<<<<< HEAD:frontend/components/ExpensesPage.jsx
import { useState, React } from "react";
import DatePicker from "react-date-picker";
import ExpenseData from "./ExpenseData";
import IncomeForm from "./IncomeComponent/IncomeForm";
import ChatBar from "./ChatBar";

function ExpenseGoals() {
  // New Saving Goal
  const [goals, setGoals] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getDate(new Date()));

  //states to hold drop down menu selections
  const [expenseRecurrence, setExpenseRecurrence] = useState("");
  const [category, setCategory] = useState("");

  function handleExpenseRecurrenceChange(expenseRecurrence) {
    setExpenseRecurrence(expenseRecurrence);
    console.log(expenseRecurrence);
  }

  function handleCategoryChange(category) {
    setCategory(category);
    console.log(category);
  }

  function getDate(date) {
    let currentMonth = date.getMonth() + 1; // Adding 1 to make it 1-indexed
    let currentYear = date.getFullYear();
    let currentDay = date.getDate();
    currentMonth < 10 ? (currentMonth = "0" + currentMonth.toString()) : "";
    currentDay < 10 ? (currentDay = "0" + currentDay.toString()) : "";
    return `${currentYear}-${currentMonth}-${currentDay}`;
  }

  const handleCreateGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      description: description,
      amount: amount,
      date: date,
    };
    console.log(newGoal);
=======
import { React, useState, useEffect, useContext } from "react";
>>>>>>> 23fea0f02d470ca547d2d4f281bff84d11aa01fe:frontend/components/expenses-page.jsx

// Import expense-tracker components
import SavingsForm from "./SavingsComponent/SavingsForm";
import IncomeForm from "./IncomeComponent/IncomeForm";
import ExpensesForm from "./ExpensesComponent/ExpensesForm";

//import context for name
import { NameContext } from "../src/App";

function ExpenseGoals() {
  //use userName object from context to render user's name
  const { userName } = useContext(NameContext);

  return (
    <>
<<<<<<< HEAD:frontend/components/ExpensesPage.jsx
      <div className="tracker-container">
        <div className="forms-container">
          {/* --------------------------------------------savings component---------------------------------------- */}

          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#" onSubmit={handleCreateGoal}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                New Saving Goal
              </h5>

              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="base-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="$"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                  </label>

                  <input
                    aria-label="Date"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Goal
              </button>
            </form>
          </div>

          <IncomeForm />

          {/* --------------------------------------------expense component---------------------------------------- */}

          <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#" onSubmit={handleAddExpense}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Enter Expense
              </h5>

              <div className="mb-5">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="base-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="$"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                  </label>
                  <input
                    aria-label="Date"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={expenseDate.toISOString().split("T")[0]}
                    onChange={(e) => setExpenseDate(new Date(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="category"
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option id="0"> </option>
                    <option id="1">Housing</option>
                    <option id="2">Transportation</option>
                    <option id="3">Food</option>
                    <option id="4">Entertainment</option>
                    <option id="5">Debt Payments</option>
                    <option id="6">Personal Care</option>
                    <option id="7">Entertainment</option>
                    <option id="8">Other</option>
                  </select>
                </div>

                {/* date */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Recurrence
                  </label>

                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="expenseRecurrence"
                    value={expenseRecurrence}
                    onChange={(e) =>
                      handleExpenseRecurrenceChange(e.target.value)
                    }
                  >
                    <option id="0"> </option>
                    <option id="1">Single Expense</option>
                    <option id="2">Daily</option>
                    <option id="3">Weekly</option>
                    <option id="4">Bi-weekly</option>
                    <option id="5">Monthly</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Enter Expense
              </button>
            </form>
          </div>
        </div>
=======
      <div className="text-4xl text-center pt-8 pb-8">Hi, {userName}!</div>
>>>>>>> 23fea0f02d470ca547d2d4f281bff84d11aa01fe:frontend/components/expenses-page.jsx

      <div className="flex flex-col justify-items-center">
        <div className="flex flex-col justify-evenly m-8 lg:flex-row">
          <SavingsForm />

          <IncomeForm />

<<<<<<< HEAD:frontend/components/ExpensesPage.jsx
          <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <ExpenseData expenses={expenses} />
          </div>
=======
          <ExpensesForm />
>>>>>>> 23fea0f02d470ca547d2d4f281bff84d11aa01fe:frontend/components/expenses-page.jsx
        </div>
      </div>
    </>
  );
}

export default ExpenseGoals;
