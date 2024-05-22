import { useState, React } from "react";
import DatePicker from "react-date-picker";

// Import expense-tracker components
import SavingsForm from "./SavingsComponent/SavingsForm";
import IncomeForm from "./IncomeComponent/IncomeForm";
import ExpensesForm from "./ExpensesComponent/ExpensesForm";

function ExpenseGoals() {

  return (
    <>
      <div className="tracker-container">
        <div className="forms-container">
          <SavingsForm />

          <IncomeForm />

          <ExpensesForm />
        </div>
      </div>
    </>
  );
}

export default ExpenseGoals;
