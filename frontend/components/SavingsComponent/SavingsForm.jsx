import { useState, React } from "react";
import RenderSavings from "./RenderSavings";

//same logic as income components

export default function SavingsForm() {
  const token = sessionStorage.getItem("jwt-token");

  const emptyForm = {
    description: "",
    amount: "",
    targetDate: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [postChange, setPostChange] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function (prevState) {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let addSavingsUrl = "/api/expense/addSaving";

    try {
      const postResponse = await fetch(addSavingsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!postResponse.ok) {
        throw new Error(`${postResponse.status}`);
      }

      setPostChange(await postResponse.json());
      console.log("User Savings Posted");

      setFormData(emptyForm);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col min-w-96 md:flex-row lg:flex-col">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              New Saving Goal
            </h5>

            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium "
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
            </div>

            <button
              type="submit"
              className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
            >
              Create Goal
            </button>
          </form>
        </div>

        <div className="w-full h-fit min-w-sm">
          <RenderSavings postChange={postChange} />
        </div>
      </div>
    </>
  );
}
