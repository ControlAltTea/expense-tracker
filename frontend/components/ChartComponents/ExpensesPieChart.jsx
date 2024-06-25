import { React } from "react";
//import Chart from react-google-charts
import { Chart } from "react-google-charts";

//expenseData is passed from parent component
function ExpensesPieChart({ expenseData }) {
  //declare options for customizability of pie chart
  const options = {
    title: 'Expenses',
    backgroundColor: "transparent", 
    is3D: true,
    width: 400,
    height: 400,
    legend: "none",
  };

  //conditionally render a statement if expenseData array has less than 2 objects
  //conditionally render the pie chart if expenseData array has more than 1 object??
  //??not sure why, but it works like this
  return (
    <div className="flex-column">

      {expenseData.length < 2 && (
        <div className="p-6">Add Expenses To Visualize Your Finances.</div>
      )}

      {expenseData.length > 1 && (
          <Chart chartType="PieChart" data={expenseData} options={options} />
      )}
    </div>
  );
}

export default ExpensesPieChart;
