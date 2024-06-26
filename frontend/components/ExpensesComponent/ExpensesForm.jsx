import { useState, React, useContext } from "react";
import RenderExpenses from "./RenderExpenses";

import { ExpenseContext } from "../../src/App";

//same logic as income components

export default function ExpensesForm() {
  const token = sessionStorage.getItem("jwt-token");

  const emptyForm = {
    amount: "",
    category: "",
    description: "",
    frequency: "",
    targetDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const [postChange, setPostChange] = useState("");

  const { setExpenseResponse } = useContext(ExpenseContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function (prevState) {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let addExpenseUrl = "/api/expense/addExpense";

    try {
      const postResponse = await fetch(addExpenseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!postResponse.ok) {
        throw new Error(`${postResponse.status}`);
      }

      setPostChange(await postResponse.json());
      setExpenseResponse(postResponse);
      console.log("User Expense Posted");

      setFormData(emptyForm);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="flex flex-col min-w-96 md:flex-row lg:flex-col">
        <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900">Enter Expense</h5>

            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="$"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Date
                </label>
                <input
                  aria-label="Date"
                  type="date"
                  name="targetDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.targetDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
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

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Recurrence
                </label>

                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                >
                  <option id="0"> </option>
                  <option id="1">No Recurrence</option>
                  <option id="2">Daily</option>
                  <option id="3">Weekly</option>
                  <option id="4">Bi-weekly</option>
                  <option id="5">Monthly</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
            >
              Add Expense
            </button>
          </form>
        </div>

        {/* Render Expenses Data */}
        <div className="w-full h-fit max-w-sm">
          <RenderExpenses postChange={postChange} />
        </div>
      </div>
    </div>
  );
}
