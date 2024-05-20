import React from "react";
import { dummyIncome } from "../../dummyData/dummyData";

//component responsible for rendering income data
//uses dummyIncome from dummyData.js
function RenderIncome() {
  return (
    <>
      <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <div>
          
          {/* use map() to dynamically render dummyIncome as a list */}
          <ul>
            {dummyIncome.map((income) => (
              <div
                key={income.description}
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
                    <div className="text-sm font-small">{income.date}</div>
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RenderIncome;
