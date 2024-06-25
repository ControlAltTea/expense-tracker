import { useEffect, React, useState } from "react";
import Popup from "reactjs-popup";
import ChatBar from "../components/ChatBar";

function Overview() {
  const token = sessionStorage.getItem("jwt-token");

  const [savings, setSavings] = useState([]);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  const [deleteChange, setDeleteChange] = useState();
  const [putChange, setPutChange] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const emptyForm = {
    amount: "",
    category: "",
    description: "",
    frequency: "",
    targetDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function (prevState) {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function sortAmount(a, b) {
    if (a.amount < b.amount) {
      return 1;
    }

    if (a.amount > b.amount) {
      return -1;
    }

    return 0;
  }

  function sortCategory(a, b) {
    if (a.category < b.category) {
      return -1;
    }

    if (a.category > b.category) {
      return 1;
    }

    return 0;
  }

  function sortRecurrence(a, b) {
    if (a.frequency < b.frequency) {
      return -1;
    }

    if (a.frequency > b.frequency) {
      return 1;
    }
    return 0;
  }

  function sortDate(a, b) {
    const formattedDateA = new Date(a.targetDate);
    const formattedDateB = new Date(b.targetDate);

    if (formattedDateA < formattedDateB) {
      return -1;
    }

    if (formattedDateA < formattedDateB) {
      return 1;
    }
  }

  function handleSortCategory() {
    setSavings([...savings].sort(sortCategory));
    setExpense([...expense].sort(sortCategory));
    setIncome([...income].sort(sortCategory));
  }

  function handleSortRecurrence() {
    setSavings([...savings].sort(sortRecurrence));
    setExpense([...expense].sort(sortRecurrence));
    setIncome([...income].sort(sortRecurrence));
  }

  function handleSortDate() {
    setSavings([...savings].sort(sortDate));
    setExpense([...expense].sort(sortDate));
    setIncome([...income].sort(sortDate));
  }

  function handleSortAmount() {
    setSavings([...savings].sort(sortAmount));
    setExpense([...expense].sort(sortAmount));
    setIncome([...income].sort(sortAmount));
  }

  ////////////////////////////////////////////////////////UPDATE SAVINGS////////////////////////////////////////////////////////////////////

  async function updateSavings(id, saving) {
    const updateSavingsUrl = `/api/expense/updateSaving/${id}`;

    try {
      const putResponse = await fetch(updateSavingsUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(saving),
      });

      setPutChange(putResponse);

      if (!putResponse.ok) {
        throw new Error(`${putResponse.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSavingsSubmit(e, id) {
    e.preventDefault();
    updateSavings(id, formData);
    setIsOpen(false);
    setFormData(emptyForm);
  }

  ///////////////////////////////////////////////////////UPDATE EXPENSES///////////////////////////////////////////////////////////////////

  async function updateExpenses(id, expense) {
    const updateExpenseUrl = `/api/expense/updateExpense/${id}`;

    try {
      const putResponse = await fetch(updateExpenseUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      setPutChange(putResponse);

      if (!putResponse.ok) {
        throw new Error(`${putResponse.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleExpenseSubmit(e, id) {
    e.preventDefault();
    updateExpenses(id, formData);
    setIsOpen(false);
    setFormData(emptyForm);
  }

  ///////////////////////////////////////////////////////UPDATE INCOME///////////////////////////////////////////////////////////////////

  async function updateIncome(id, income) {
    const updateIncomeUrl = `/api/expense/updateIncome/${id}`;

    try {
      const putResponse = await fetch(updateIncomeUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(income),
      });

      setPutChange(putResponse);

      if (!putResponse.ok) {
        throw new Error(`${putResponse.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleIncomeSubmit(e, id) {
    e.preventDefault();
    updateIncome(id, formData);
    setIsOpen(false);
    setFormData(emptyForm);
  }

///////////////////////////////////////////////DELETE REQUESTS FUNCTIONS//////////////////////////////////////////////////////////////////

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
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteIncome(id) {
    const deleteIncomeUrl = `/api/expense/deleteIncome/${id}`;
    try {
      const deleteResponse = await fetch(deleteIncomeUrl, {
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
      console.log("User Income Deleted");
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteExpense(id) {
    const deleteExpenseUrl = `/api/expense/deleteExpense/${id}`;
    try {
      const deleteResponse = await fetch(deleteExpenseUrl, {
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
    } catch (error) {
      console.error(error);
    }
  }

/////////////////////////////////////////////////////////////GET REQUEST TO RENDER USER'S DATA//////////////////////////////////////////////////

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

        setSavings(data.data.Saving);
        setExpense(data.data.Expense);
        setIncome(data.data.Income);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [deleteChange, putChange]);

  return (
    <>
      <div className="bg-[#f0f8ff] flex flex-col items-center">
        <div className="bg-[#def7ec] text-xl font-medium w-[330px] lg:w-[1110px] sm:flex-col sm:w-[330px] md:flex-col md:w-[330px] lg:flex-row rounded-2xl shadow text-gray-900 text-center p-6 mt-6">
          Finance Overview
        </div>

        {/* //////////////////////////////////////////////SORTING BUTTONS///////////////////////////////////////////////////////// */}

        <div className="bg-white border-gray-200 shadow rounded-2xl flex flex-col w-[330px] lg:w-[1110px] sm:flex-col sm:w-[330px] md:flex-col md:w-[330px] lg:flex-row justify-evenly items-center">
          <button
            onClick={handleSortAmount}
            className="text-white bg-green-400 hover:bg-green-500 font-medium shadow rounded-lg min-w-40 p-3 m-6"
          >
            Sort Descending Amount
          </button>

          <button
            onClick={handleSortDate}
            className="text-white bg-green-400 hover:bg-green-500 font-medium shadow rounded-lg min-w-40 p-3 m-6"
          >
            Sort Date Alphabetically
          </button>

          <button
            onClick={handleSortRecurrence}
            className="text-white bg-green-400 hover:bg-green-500 font-medium shadow rounded-lg min-w-40 p-3 m-6"
          >
            Sort Recurrence Alphabetically
          </button>

          <button
            onClick={handleSortCategory}
            className="text-white bg-green-400 hover:bg-green-500 font-medium shadow rounded-lg min-w-40 p-3 m-6"
          >
            Sort Category Alphabetically
          </button>
        </div>

        {/* /////////////////////////////////////////////////RENDERED SAVINGS/////////////////////////////////////////////// */}

        <div className="flex flex-col justify-evenly bg-[#f0f8ff] sm:flex-col md:flex-col lg:flex-row">
          <div className="min-w-80 rounded-lg shadow bg-[#def7ec] m-6 min-h-screen">
            <div
              id="savingsSection"
              className="p-4 text-l font-medium bg-white border border-gray-200 rounded-lg text-center"
            >
              Savings
            </div>

            <div>
              {savings.length < 1 && (
                <div className="p-4 text-center">
                  Add a Savings Goal to view
                </div>
              )}
              {savings.map(function (savings, key) {
                return (
                  <div
                    key={key}
                    className="bg-white border border-gray-200 rounded-lg shadow p-8 m-4 relative"
                  >
                    <ul>
                      <li className="flex">
                        <div className="text-sm font-medium mr-2">
                          Description:
                        </div>
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
                        <div className="text-sm font-small">
                          {savings.targetDate}
                        </div>
                      </li>
                    </ul>

                    <button
                      onClick={() => deleteSavings(savings.id)}
                      type="button"
                      className="transition duration-300 h-7 w-7 text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center absolute right-3 bottom-3"
                    >
                      X
                    </button>

                    <div>
                      <Popup
                        trigger={
                          <button
                            type="button"
                            className="transition duration-300 h-7 w-16 text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center absolute right-11 bottom-3"
                            onClick={() => setIsOpen(true)}
                          >
                            Edit
                          </button>
                        }
                        position="center"
                        open={isOpen}
                        onClose={() => setIsOpen(false)} 
                      >
                        <div className="w-[320px] h-fit p-4 bg-white border border-gray-200 rounded-lg shadow">
                          <form
                            className="space-y-6"
                            onSubmit={(e) => handleSavingsSubmit(e, savings.id)}
                          >
                            <h5 className="text-xl font-medium text-gray-900">
                              Update Savings
                            </h5>

                            <div className="mb-5">
                              <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Description
                              </label>
                              <input
                                type="text"
                                name="description"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder={savings.description}
                                value={formData.description}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="amount"
                                  className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                  Amount
                                </label>
                                <input
                                  type="number"
                                  name="amount"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder={"$" + savings.amount}
                                  value={formData.amount}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                  Date
                                </label>
                                <input
                                  aria-label="Date"
                                  type="date"
                                  name="targetDate"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder={expense.targetDate}
                                  value={formData.targetDate}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                            >
                              Update
                            </button>
                          </form>
                        </div>
                      </Popup>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* /////////////////////////////////////////////////RENDERED INCOME/////////////////////////////////////////////// */}

          <div className="min-w-80 rounded-lg shadow bg-[#def7ec] m-6">
            <div className="p-4 text-l font-medium bg-white border border-gray-200 rounded-lg text-center">
              Income
            </div>

            {income.length < 1 && (
              <div className="p-4 text-center"> Add an Income to view </div>
            )}
            {income.map(function (income, key) {
              return (
                <div
                  key={key}
                  className="bg-white border border-gray-200 rounded-lg shadow p-8 m-4 relative"
                >
                  <ul>
                    <li className="flex">
                      <div className="text-sm font-medium mr-2">
                        Description:
                      </div>
                      <div className="text-sm font-small">
                        {income.description}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">Category:</div>
                      <div className="text-sm font-small">
                        {income.category}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">Amount:</div>
                      <div className="text-sm font-small">
                        {"$" + income.amount}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">
                        Recurrence:
                      </div>
                      <div className="text-sm font-small">
                        {income.frequency}
                      </div>
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

                  <Popup
                    trigger={
                      <button
                        type="button"
                        className="transition duration-300 h-7 w-16 text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center absolute right-11 bottom-3"
                      >
                        Edit
                      </button>
                    }
                    position="center"
                  >
                    <div className="w-[320px] h-fit p-4 bg-white border border-gray-200 rounded-lg shadow">
                      <form
                        className="space-y-6"
                        onSubmit={(e) => handleIncomeSubmit(e, income.id)}
                      >
                        <h5 className="text-xl font-medium text-gray-900">
                          Update Income
                        </h5>

                        <div className="mb-5">
                          <label
                            htmlFor="base-input"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={income.description}
                            value={formData.description}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="amount"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Amount
                            </label>
                            <input
                              type="number"
                              name="amount"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={"$" + income.amount}
                              value={formData.amount}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                              Date
                            </label>
                            <input
                              aria-label="Date"
                              type="date"
                              name="targetDate"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={income.targetDate}
                              value={formData.targetDate}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                              Category
                            </label>
                            <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              required
                            >
                              <option id="0"> </option>
                              <option id="1">One-time Payment</option>
                              <option id="2">Employment Income</option>
                              <option id="3">Freelance Income</option>
                              <option id="4">Investment Income</option>
                              <option id="5">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                              Recurrence
                            </label>

                            <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              name="frequency"
                              value={formData.frequency}
                              onChange={handleChange}
                              required
                            >
                              <option id="0"> </option>
                              <option id="1">No Recurrence</option>
                              <option id="2">Daily</option>
                              <option id="3">Weekly</option>
                              <option id="4">Bi-weekly</option>
                              <option id="5">Monthly</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </Popup>
                </div>
              );
            })}
          </div>

          {/* /////////////////////////////////////////////////RENDERED EXPENSES/////////////////////////////////////////////// */}

          <div className="min-w-80 rounded-lg shadow bg-[#def7ec] m-6">
            <div className="p-4 text-l font-medium bg-white border border-gray-200 rounded-lg text-center">
              Expenses
            </div>

            {expense.length < 1 && (
              <div className="p-4 text-center">
                {" "}
                Add an Expense Goal to view{" "}
              </div>
            )}

            {expense.map(function (expense, key) {
              return (
                <div
                  key={key}
                  className="bg-white border border-gray-200 rounded-lg shadow p-8 pb-12 m-4 relative"
                >
                  <ul>
                    <li className="flex">
                      <div className="text-sm font-medium mr-2">
                        Description:
                      </div>
                      <div className="text-sm font-small">
                        {expense.description}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">Category:</div>
                      <div className="text-sm font-small">
                        {expense.category}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">Amount:</div>
                      <div className="text-sm font-small">
                        {"$" + expense.amount}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">
                        Recurrence:
                      </div>
                      <div className="text-sm font-small">
                        {expense.frequency}
                      </div>
                    </li>

                    <li className="flex">
                      <div className="text-sm font-medium mr-2">Date:</div>
                      <div className="text-sm font-small">
                        {expense.targetDate}
                      </div>
                    </li>
                  </ul>

                  <button
                    onClick={() => deleteExpense(expense.id)}
                    type="button"
                    className="transition duration-300 h-7 w-7 text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center absolute right-3 bottom-3"
                  >
                    X
                  </button>

                  <div>
                    <Popup
                      trigger={
                        <button
                          type="button"
                          className="transition duration-300 h-7 w-16 text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center absolute right-11 bottom-3"
                        >
                          Edit
                        </button>
                      }
                      position="center"
                    >
                      <div className="w-[320px] h-fit p-4 bg-white border border-gray-200 rounded-lg shadow">
                        <form
                          className="space-y-6"
                          onSubmit={(e) => handleExpenseSubmit(e, expense.id)}
                        >
                          <h5 className="text-xl font-medium text-gray-900">
                            Update Expense
                          </h5>

                          <div className="mb-5">
                            <label
                              htmlFor="base-input"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              name="description"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder={expense.description}
                              value={formData.description}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                              <label
                                htmlFor="amount"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Amount
                              </label>
                              <input
                                type="number"
                                name="amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder={"$" + expense.amount}
                                value={formData.amount}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900">
                                Date
                              </label>
                              <input
                                aria-label="Date"
                                type="date"
                                name="targetDate"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder={expense.targetDate}
                                value={formData.targetDate}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900">
                                Category
                              </label>
                              <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                              >
                                <option id="0"> </option>
                                <option id="1">Housing</option>
                                <option id="2">Transportation</option>
                                <option id="3">Food</option>
                                <option id="4">Entertainment</option>
                                <option id="5">Debt Payments</option>
                                <option id="6">Personal Care</option>
                                <option id="7">Entertainment</option>
                                <option id="8">Other</option>
                              </select>
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900">
                                Recurrence
                              </label>

                              <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                                required
                              >
                                <option id="0"> </option>
                                <option id="1">No Recurrence</option>
                                <option id="2">Daily</option>
                                <option id="3">Weekly</option>
                                <option id="4">Bi-weekly</option>
                                <option id="5">Monthly</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                          >
                            Update
                          </button>
                        </form>
                      </div>
                    </Popup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ChatBar />

      </div>
    </>
  );
}

export default Overview;
