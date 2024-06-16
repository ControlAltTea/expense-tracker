import { React, useEffect, useState, useContext } from "react";
import IncomePieChart from "./IncomePieChart";
import ExpensesPieChart from "./ExpensesPieChart";

//import context created from app.jsx
import { IncomeContext } from "../../src/App";
import { ExpenseContext } from "../../src/App";

//monthly data visualization
//multiply daily by 30.436
//multiply weekly by 4.345
//mulitply bi-weekly by 2.172

//data needs to be formatted like this
//    const data = [
//      ["Income", "Dollar Amount"],
//      ["Income From Work", 2500],
//      ["Birthday Gift", 200],
//      ["Freelance Income", 800],
//      ["Stock Dividends", 250],
//    ];

//example:
//daily income $5
//monthly = 152.18

function DataVisualization() {
  //states to store income and expense data
  //initialize as empty array
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  //grab token from browser and store in variable
  //used to authenticate GET request
  const token = sessionStorage.getItem("jwt-token");

  //grab income and expense states from context

  const { incomeResponse } = useContext(IncomeContext);
  const { expenseResponse } = useContext(ExpenseContext);

  //useEffect to dynamically render pie charts when incomeResponse or expenseResponse is changed/updated
  useEffect(() => {
    async function getData() {
      //await for fetch to make a GET request
      let dashboardUrl = "http://localhost:3001/api/dashboard";

      try {
        const getResponse = await fetch(dashboardUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //authentication using token
          },
        });

        //if response is not succesful then throw error status
        if (!getResponse.ok) {
          throw new Error(`${getResponse.status}`);
        }

        //parse json and produce javascript object
        //store in data variable
        const data = await getResponse.json();

        //store user's income and expense data from database in variable
        const income = data.data.Income;
        const expense = data.data.Expense;

        //initialize variable with formatted arrays to be used by react-google-charts
        const formattedIncome = [["Income", "Dollar Amount"]];
        const formattedExpense = [["Income", "Dollar Amount"]];

        //loop through user's income and expense data
        for (let i = 0; i < income.length; i++) {
          //store current income in a variable in order to access properties
          let currentIncome = income[i];

          //if statements to check the frequency of that current income
          //depending on frequency multiply by average amount of days, weeks, etc. to get monthly average
          //create new variable containing only the description and amount properties
          //use toFixed() to make sure that amount is only two decimal places and parseFloat to convert back to a number
          //then push to variable we created earlier containing the correct formatted titles
          if (currentIncome.frequency == "Daily") {
            let newIncome = [
              currentIncome.description,
              parseFloat((currentIncome.amount * 30.436).toFixed(2)),
            ];

            formattedIncome.push(newIncome);
          }

          if (currentIncome.frequency == "Weekly") {
            let newIncome = [
              currentIncome.description,
              parseFloat((currentIncome.amount * 4.345).toFixed(2)),
            ];

            formattedIncome.push(newIncome);
          }

          if (currentIncome.frequency == "Bi-weekly") {
            let newIncome = [
              currentIncome.description,
              parseFloat((currentIncome.amount * 2.172).toFixed(2)),
            ];

            formattedIncome.push(newIncome);
          }

          if (currentIncome.frequency == "Monthly") {
            let newIncome = [
              currentIncome.description,
              parseFloat(currentIncome.amount.toFixed(2)),
            ];

            formattedIncome.push(newIncome);
          }
        }

        for (let i = 0; i < expense.length; i++) {
          let currentExpense = expense[i];

          if (currentExpense.frequency == "Daily") {
            let newExpense = [
              currentExpense.description,
              parseFloat((currentExpense.amount * 30.436).toFixed(2)),
            ];
            formattedExpense.push(newExpense);
          }

          if (currentExpense.frequency == "Weekly") {
            let newExpense = [
              currentExpense.description,
              parseFloat((currentExpense.amount * 4.345).toFixed(2)),
            ];

            formattedExpense.push(newExpense);
          }

          if (currentExpense.frequency == "Bi-weekly") {
            let newExpense = [
              currentExpense.description,
              parseFloat((currentExpense.amount * 2.172).toFixed(2)),
            ];

            formattedExpense.push(newExpense);
          }

          if (currentExpense.frequency == "Monthly") {
            let newExpense = [
              currentExpense.description,
              parseFloat(currentExpense.amount.toFixed(2)),
            ];

            formattedExpense.push(newExpense);
          }
        }

        //lastly update the incomeData and expenseData state so that we can pass it to child components in order to implement it with 
        //react-google-charts 
        setIncomeData(formattedIncome);
        setExpenseData(formattedExpense);
      } catch (error) {
        //catch block for handling errors
        console.error(error);
      }
    }
    //call the getData() function when component mounts
    getData();
  }, [incomeResponse, expenseResponse]);

  return (
    <>
      <div className="h-fit w-full bg-white border border-gray-200 rounded-lg shadow pb-8">
        <div className="text-2xl font-medium text-gray-900 text-center m-8">
          Projected Monthly Finances
        </div>
        <div className="flex justify-evenly items-center ">
          <IncomePieChart incomeData={incomeData} />
          <ExpensesPieChart expenseData={expenseData} />
        </div>
      </div>
    </>
  );
}

export default DataVisualization;
