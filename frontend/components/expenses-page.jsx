import { useState, React } from "react";
import DatePicker from "react-date-picker";

function ExpenseGoals() {
  //states to hold drop down menu selections
  const [expenseRecurrence, setExpenseRecurrence] = useState("");
  const [incomeRecurrence, setIncomeRecurrence] = useState("");
  const [category, setCategory] = useState("");

  //handle drop down menu selection changes
  function handleIncomeRecurrenceChange(incomeRecurrence) {
    setIncomeRecurrence(incomeRecurrence);
    console.log(incomeRecurrence);
  }

  function handleExpenseRecurrenceChange(expenseRecurrence) {
    setExpenseRecurrence(expenseRecurrence);
    console.log(expenseRecurrence);
  }

  function handleCategoryChange(category) {
    setCategory(category);
    console.log(category);
  }

  return (
    <div className="income-container">
      {/* ----------------------------------------- savings component --------------------------------------------------------*/}
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            New Saving Goal
          </h5>

          <div class="mb-5">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="base-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="$"
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date
              </label>
              <input
                aria-label="Date"
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Goal
          </button>
        </form>
      </div>

      {/* ------------------------------------------- income component -----------------------------------------------*/}

      <div class="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Add Income
          </h5>

          <div class="mb-5">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="base-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="$"
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">
                Date
              </label>
              <input
                aria-label="Date"
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>


          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900">Reccurrence</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="incomeRecurrence"
              value={incomeRecurrence}
              onChange={(e) => handleIncomeRecurrenceChange(e.target.value)}
            >
              <option id="0"> </option>
              <option id="1">Single Expense</option>
              <option id="2">Daily</option>
              <option id="3">Weekly</option>
              <option id="4">Bi-weekly</option>
              <option id="5">Monthly</option>
            </select>
          </div>


          <button
            type="submit"
            class="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Income
          </button>
        </form>
      </div>

      {/* ---------------------------------------------------- expense component --------------------------------------------------------*/}

      <div class="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900">Enter Expense</h5>

          {/* description */}
          <div class="mb-5">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              id="base-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* amount */}
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="$"
                required
              />
            </div>

            {/* date */}
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date
              </label>
              <input
                aria-label="Date"
                type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Recurrence
              </label>

              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="expenseRecurrence"
                value={expenseRecurrence}
                onChange={(e) => handleExpenseRecurrenceChange(e.target.value)}
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

          {/* submit button */}
          <button
            type="submit"
            class="w-full my-4 text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Enter Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseGoals;
