import { React, useEffect, useState } from "react";

//pass incomeData from parent component to render dynamically here
function RenderIncome({ postChange }) {
  //grab token from browser to authenticate user by using token in get & delete request headers
  const token = sessionStorage.getItem("jwt-token");

  //state to store user's income data
  const [incomeData, setIncomeData] = useState([]);

  //state to detect when delete request is made, state used in useEffect to trigger get request to render data
  //backend's delete response is stored here
  const [deleteChange, setDeleteChange] = useState('');


  //function to delete income
  //send delete request to backend api
  //takes id as parameter to delete specific income, id is used at the end of backend's url
  async function deleteIncome(id) {
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

<<<<<<< HEAD
      console.log(await deleteResponse.json()); 
      console.log("Data Deleted Successfully")

=======
      //store response in deleteChange state
      setDeleteChange(await deleteResponse.json());
      console.log("User Income Deleted");
>>>>>>> 23fea0f02d470ca547d2d4f281bff84d11aa01fe
    } catch (error) {
      console.error(error);
    }
  }

  //useEffect(()=> {},[]) so when component mounts, code inside is ran
  //get data from backend api, include token authorization
  useEffect(() => {
    async function getData() {
      //await for fetch to make a GET request
      let dashboardUrl = "http://localhost:3001/api/dashboard";

      try {
        const getResponse = await fetch(dashboardUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set request content type to JSON
            Authorization: `Bearer ${token}`,
          },
        });

        //if response is not succesful then throw error status
        if (!getResponse.ok) {
          throw new Error(`${getResponse.status}`);
        }

        //parse json and produce javascript object
        //store in data variable
        const data = await getResponse.json();

        console.log("User Income Retrieved");

        //store income data in incomeData state variable
        setIncomeData(data.data.Income);
      } catch (error) {
        //catch block for handling errors
        console.error(error);
      }
    }
    //call the getData() function when component mounts
    getData();
  }, [deleteChange, postChange]);


  return (
    <>
      <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Income
        </h5>
      </div>
      
      <div className="w-full h-fit max-w-sm bg-green-200 border border-gray-200 rounded-lg shadow">
        <div className="">
          {/* use map() to dynamically render updatedData */}
          <ul>
            {incomeData.map((income, key) => (
              <div
                key={key}
                className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 m-4 relative"
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
                  className="transition duration-300 h-7 w-7 text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center absolute right-3 bottom-3"
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
