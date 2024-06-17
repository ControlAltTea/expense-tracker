import { React, useState, useEffect, useContext } from "react";

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
      <div className="text-4xl text-center pt-8 pb-8">Hi, {userName}!</div>

      <div className="flex flex-col justify-items-center">
        <div className="flex flex-col justify-evenly m-8 lg:flex-row">
          <SavingsForm />

          <IncomeForm />

          <ExpensesForm />
        </div>
      </div>
    </>
  );
}

export default ExpenseGoals;
