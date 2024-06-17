import { React, useEffect, useState, useContext } from "react";
import IncomePieChart from "./IncomePieChart";
import ExpensesPieChart from "./ExpensesPieChart";
import BarChart from "./BarChart";

//import context created from app.jsx
import { IncomeContext } from "../../src/App";
import { ExpenseContext } from "../../src/App";

//monthly data visualization
//multiply daily by 30.436
//multiply weekly by 4.345
//mulitply bi-weekly by 2.172

//pie chart data needs to be formatted like this
//    const data = [
//      ["Income", "Dollar Amount"],
//      ["Income From Work", 2500],
//      ["Birthday Gift", 200],
//      ["Freelance Income", 800],
//      ["Stock Dividends", 250],
//    ];

// bar chart data needs to be formatted like this
//    const data = [
//      ["Net Income", "Income", "Expenses"],
//      ["", 3000, 2400],
//    ];

function DataVisualization() {
  //states to store income and expense data
  //initialize as empty array
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  //state to store data for bar chart
  const [barData, setBarData] = useState([]);

  //state to store netIncome
  const [netIncome, setNetIncome] = useState();

  //grab token from browser and store in variable
  //used to authenticate GET request
  const token = sessionStorage.getItem("jwt-token");

  //grab income and expense states from context
  const { incomeResponse } = useContext(IncomeContext);
  const { expenseResponse } = useContext(ExpenseContext);

  //useEffect to dynamically render charts when incomeResponse or expenseResponse is changed/updated
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

        //variables to store income and expense amounts
        const incomeAmount = [];
        const expenseAmount = [];

        //loop through user's income and expense data
        for (let i = 0; i < income.length; i++) {
          //store current income in a variable in order to access properties
          let currentIncome = income[i];

          //if statements to check the frequency of that current income
          //depending on frequency multiply by average amount of days, weeks, etc. to get monthly average
          //create new variable containing only the description and amount properties
          //create another variable only containing amount, this will be used to calculate net income
          //use toFixed() to make sure that amount is only two decimal places and parseFloat to convert back to a number
          //then push to variables we created earlier

          //-----------------------------for loop: loop through income-----------------------------------//
          if (currentIncome.frequency == "Daily") {
            let newIncome = [
              currentIncome.description,
              parseFloat((currentIncome.amount * 30.436).toFixed(2)),
            ];

            let newAmount = currentIncome.amount * 30.436;

            formattedIncome.push(newIncome);
            incomeAmount.push(parseFloat(newAmount));
          }

          if (currentIncome.frequency == "Weekly") {
            let newIncome = [
              currentIncome.description,
              parseFloat((currentIncome.amount * 4.345).toFixed(2)),
            ];

            let newAmount = currentIncome.amount * 4.345;
            formattedIncome.push(newIncome);
            incomeAmount.push(parseFloat(newAmount));
          }

          if (currentIncome.frequency == "Bi-weekly") {
            let newIncome = [
              currentIncome.description,
              parseFloat((currentIncome.amount * 2.172).toFixed(2)),
            ];

            let newAmount = currentIncome.amount * 2.172;

            formattedIncome.push(newIncome);
            incomeAmount.push(parseFloat(newAmount));
          }

          if (currentIncome.frequency == "Monthly") {
            let newIncome = [
              currentIncome.description,
              parseFloat(currentIncome.amount.toFixed(2)),
            ];

            let newAmount = currentIncome.amount;

            formattedIncome.push(newIncome);
            incomeAmount.push(parseFloat(newAmount));
          }
        }

        //----------------------------- expense for loop: loop through expenses-----------------------------------//
        for (let i = 0; i < expense.length; i++) {
          let currentExpense = expense[i];

          if (currentExpense.frequency == "Daily") {
            let newExpense = [
              currentExpense.description,
              parseFloat((currentExpense.amount * 30.436).toFixed(2)),
            ];

            let newAmount = currentExpense.amount * 30.436;

            formattedExpense.push(newExpense);
            expenseAmount.push(parseFloat(newAmount));
          }

          if (currentExpense.frequency == "Weekly") {
            let newExpense = [
              currentExpense.description,
              parseFloat((currentExpense.amount * 4.345).toFixed(2)),
            ];
            let newAmount = currentExpense.amount * 4.345;

            formattedExpense.push(newExpense);
            expenseAmount.push(parseFloat(newAmount));
          }

          if (currentExpense.frequency == "Bi-weekly") {
            let newExpense = [
              currentExpense.description,
              parseFloat((currentExpense.amount * 2.172).toFixed(2)),
            ];
            let newAmount = currentExpense.amount * 2.172;

            formattedExpense.push(newExpense);
            expenseAmount.push(parseFloat(newAmount));
          }

          if (currentExpense.frequency == "Monthly") {
            let newExpense = [
              currentExpense.description,
              parseFloat(currentExpense.amount.toFixed(2)),
            ];
            let newAmount = currentExpense.amount;

            formattedExpense.push(newExpense);
            expenseAmount.push(parseFloat(newAmount));
          }
        }

        //variables to store the sum of income and expense
        //.reduce() to calculate the sum
        const totalIncome = incomeAmount.reduce((acc, curr) => acc + curr, 0);
        const totalExpense = expenseAmount.reduce((acc, curr) => acc + curr, 0);

        //variable with correct format so that react-google-charts can utilize it
        //contains totalIncome and totalExpense
        //toFixed to represent number in fixed notation, parseFloat to convert back to number
        const incomeAndExpense = [
          ["Net Income", "Income", "Expenses"],
          [
            "",
            parseFloat(totalIncome.toFixed(2)),
            parseFloat(totalExpense.toFixed(2)),
          ],
        ];

        //variable which stores and calculates net income
        const netIncome = "$" + (totalIncome - totalExpense).toFixed(2);

        //lastly update the incomeData, expenseData, barData, and netIncome state so that we can pass it to child components in order to implement it with
        //react-google-charts
        setIncomeData(formattedIncome);
        setExpenseData(formattedExpense);

        setBarData(incomeAndExpense);
        setNetIncome(netIncome);
      } catch (error) {
        //catch block for handling errors
        console.error(error);
      }
    }
    //call the getData() function when incomeResponse and expenseResponse updates/changes
    getData();
  }, [incomeResponse, expenseResponse]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-5/6 h-fit text-center p-6 bg-white border border-gray-200  mt-12 rounded-lg shadow text-xl font-medium text-gray-900">
          Projected Monthly Expenses
        </div>
        <div className="bg-white border w-5/6 border-gray-200 rounded-lg shadow mb-12">
          <div className="flex justify-evenly items-center">
            <IncomePieChart incomeData={incomeData} />
            <ExpensesPieChart expenseData={expenseData} />
          </div>
        </div>

        <div className="w-5/6 h-fit text-center p-6 bg-white border border-gray-200 rounded-lg shadow text-xl font-medium text-gray-900">
          Projected Monthly Net Income
        </div>
        <div className="h-fit w-5/6 bg-white border border-gray-200 rounded-lg shadow mb-12 pt-12">
          <BarChart barData={barData} netIncome={netIncome} />
        </div>
      </div>
    </>
  );
}

export default DataVisualization;
