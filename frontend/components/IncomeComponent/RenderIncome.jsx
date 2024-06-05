import { React, useEffect, useState } from "react";

//pass incomeData from parent component to render dynamically here
function RenderIncome({ incomeData }) {
  //function to delete income
  //send delete request to backend api
  //takes id as parameter
  async function deleteIncome(id) {
    const token = sessionStorage.getItem("jwt-token");
    const deleteIncomeUrl = `http://localhost:3001/api/expense/deleteIncome/${id}`;

    //include token authentication in headers
    //await for fetch to make a DELETE request
    try {
      const deleteResponse = await fetch(deleteIncomeUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      //if response is not successful then throw error status
      if (!deleteResponse.ok) {
        throw new Error(`${deleteResponse.status}`);
      }

      console.log(await deleteResponse.json()); 
      console.log("Data Deleted Successfully")

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="w-full h-fit bg-green-200 border border-gray-200 rounded-lg shadow">
        <div className="mt-28">
          {/* use map() to dynamically render incomeData */}
          <ul>
            {incomeData.map((income, key) => (
              <div
                key={key}
                className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 m-4"
              >
                <ul>
                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Description:</div>
                    <div className="text-sm font-small">
                      {income.description}
                    </div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Category:</div>
                    <div className="text-sm font-small">{income.category}</div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Amount:</div>
                    <div className="text-sm font-small">
                      {"$" + income.amount}
                    </div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Recurrence:</div>
                    <div className="text-sm font-small">{income.frequency}</div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Date:</div>
                    <div className="text-sm font-small">
                      {income.targetDate}
                    </div>
                  </li>
                </ul>

                <button
                  //pass income.id through delete function to delete specific income
                  onClick={() => deleteIncome(income.id)}
                  type="button"
                  className="h-8 w-8 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center"
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RenderIncome;
