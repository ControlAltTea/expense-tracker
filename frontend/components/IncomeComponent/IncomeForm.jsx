import { React, useState } from "react";
import RenderIncome from "./RenderIncome";

//component responsible for rendering form, posting data, and getting data
function IncomeForm() {

  //grab token from browser to authenticate user by using token in post request headers
  const token = sessionStorage.getItem("jwt-token");

  //an object that holds respective income properties and is set to empty strings
  const emptyForm = {
    amount: "",
    category: "",
    description: "",
    frequency: "",
    targetDate: "",
  };


  //state to hold all the data being inputted into form, initialize it to emptyForm
  const [formData, setFormData] = useState(emptyForm);

  //state to detect when post request is made, state used in useEffect to trigger get request to render data
  //backend's post response is stored here
  //passed as prop to RenderIncome component
  const [postChange, setPostChange] = useState('');


  //function that handles changes in our form
  //takes in the event parameter
  //extracts the name and value properties from the event,
  //update the formData state whenever change is detected
  //retains previous state by using spread operator and sets the value according to input
  function handleChange(e) {
    const { name, value } = e.target;
    //for example: for description field -> name=description, value=what is inputted
    setFormData(function (prevState) {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  //function that handles form submission
  //e.preventDefault() to prevent default behavior of button refreshing page when clicked
  async function handleSubmit(e) {
    e.preventDefault();

    let addIncomeUrl = "/api/expense/addIncome";

    try {
      //await for fetch to make a POST request
      //included authorization in headers
      //token taken from browser's session storage when user logged in
      const postResponse = await fetch(addIncomeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set request content type to JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      //if response is not succesful then throw error status
      if (!postResponse.ok) {
        throw new Error(`${postResponse.status}`);
      }

      setPostChange(await postResponse.json())
      console.log("User Data Posted");

      //reset the inputs by setting formData back to emptyForm
      setFormData(emptyForm);
    } catch (error) {
      //catch block for handling errors
      console.error(error);
    }
  }



  return (
    <>
      <div className="flex flex-col min-w-96 md:flex-row lg:flex-col">
        <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900">
              Add Income
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
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="$"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date
                </label>

                <input
                  aria-label="Date"
                  type="date"
                  name="targetDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                  Reccurrence
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
                  <option id="5">Yearly</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
            >
              Add Income
            </button>
          </form>
        </div>

        {/* pass incomeData as a prop to render in RenderIncome component */}
        <div className="w-full h-fit max-w-sm">
          <RenderIncome postChange={postChange} />
        </div>
      </div>
    </>
  );
}

export default IncomeForm;
