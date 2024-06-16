import { React, useState, useEffect, useContext } from "react";

// Import expense-tracker components
import SavingsForm from "./SavingsComponent/SavingsForm";
import IncomeForm from "./IncomeComponent/IncomeForm";
import ExpensesForm from "./ExpensesComponent/ExpensesForm";

//import context for name
import DataVisualization from "./ChartComponents/DataVisualization";

function ExpenseGoals() {


  return (
    <>

      <div className="flex flex-col justify-items-center">
        <div className="flex m-8 ml-32 mr-32">
          <DataVisualization />
        </div>
      </div>

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
