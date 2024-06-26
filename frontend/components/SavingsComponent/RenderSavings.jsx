import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";

//same logic as income components

export default function RenderSavings({ postChange }) {
  const token = sessionStorage.getItem("jwt-token");

  const [savingsData, setSavingsData] = useState([]);
  const [deleteChange, setDeleteChange] = useState("");

  async function deleteSavings(id) {
    const deleteSavingsUrl = `/api/expense/deleteSaving/${id}`;

    try {
      const deleteResponse = await fetch(deleteSavingsUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error(`${deleteResponse.status}`);
      }

      setDeleteChange(await deleteResponse.json());
      console.log("User Saving Deleted");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getData() {
      let dashboardUrl = "/api/dashboard";

      try {
        const getResponse = await fetch(dashboardUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!getResponse.ok) {
          throw new Error(`${getResponse.status}`);
        }

        const data = await getResponse.json();

        console.log("User Savings Retrieved");

        setSavingsData(data.data.Saving.reverse());
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [deleteChange, postChange]);

  return (
    <>
      <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900">Savings</h5>
      </div>

      <div className="w-full h-fit max-w-sm bg-green-200 border border-gray-200 rounded-lg shadow">
        {savingsData.slice(0, 3).map(function (savings, key) {
          return (
            <div
              key={key}
              className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 m-4 relative"
            >
              <ul>
                <li className="flex">
                  <div className="text-sm font-medium mr-2">Description:</div>
                  <div className="text-sm font-small">
                    {savings.description}
                  </div>
                </li>

                <li className="flex">
                  <div className="text-sm font-medium mr-2">Amount:</div>
                  <div className="text-sm font-small">
                    {"$" + savings.amount}{" "}
                  </div>
                </li>

                <li className="flex">
                  <div className="text-sm font-medium mr-2">Date:</div>
                  <div className="text-sm font-small">{savings.targetDate}</div>
                </li>
              </ul>

              <button
                onClick={() => deleteSavings(savings.id)}
                type="button"
                className="transition duration-300 h-7 w-7 text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center absolute right-3 bottom-3"
              >
                X
              </button>
            </div>
          );
        })}
              <Link to="/overview">
            <button className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-4 text-center">
              View All
            </button>
          </Link>
      </div>

    </>
  );
}
