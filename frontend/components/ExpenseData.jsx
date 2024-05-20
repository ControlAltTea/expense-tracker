import React from "react";

export default function ExpenseData({ expenses }) {
  return (
    <div className="expenses">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Expenses
      </h5>
      <ol>
        {expenses.map((expense, i) => (
          <li key={i}>
            {expense.description}: ${expense.amount}
          </li>
        ))}
      </ol>
    </div>
  );
}
