import React from "react";

export default function RenderExpenses({ expenses }) {
  return (
    <>
      <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Expenses
        </h5>
      </div>
      <div className="w-full h-fit max-w-sm bg-green-200 border border-gray-200 rounded-lg shadow">
        <div className="mt-28">
          <ol>
            {expenses.map((expense, i) => (
              <li key={i}>
                {expense.description}: ${expense.amount}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
