import React from "react";
import "/src/App.css";

function Home() {
  return (
    <div className="h-full">
      {/* <div className="homepageVector1"> */}
      {/* <div className="homepageVector2"> */}
      {/* <div className="homepageVector3"> */}
      <div className="homepageBackground">
        <div className="flex flex-col items-center">
          <div className="text-6xl p-8 my-8">
            Need help keeping track of your finances?
          </div>
          <div className="text-4xl p-8">
            Income, expenses, and savings all in one
          </div>
          <div className="flex flex-col w-full h-full md:flex-row items-center content-around justify-evenly my-8">
            <div className="flex flex-col w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              <div className="text-2xl font-semibold">1. Record Income</div>
              <div className="text-xl">Track your income with built in features such as recurrence and category</div>
            </div>
            <div className="flex flex-col w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              <div className="text-2xl font-semibold">2. Track Savings</div>
              <div className="text-xl">Track your expenses with built in features such as recurrence and category</div>
            </div>
            <div className="flex flex-col w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              <div className="text-2xl font-semibold">3. Save Money</div>
              <div className="text-xl">Meet your savings goals by using the money leftover after paying dues</div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default Home;
