//array that holds objects as dummy data for income component
export const dummyIncome =
    [
        {
            amount: 2439.00,
            category: "Salary",
            description: "Income for May",
            frequency: "Monthly",
            date: "2024-05-25"
        },

        {
            amount: 64.00,
            category: "Investment Income",
            description: "Dividend payout",
            frequency: "Monthly",
            date: "2024-05-26"
        },

        {
            amount: 248.00,
            category: "One-time Payment",
            description: "Birthday Present",
            frequency: "No Recurrence",
            date: "2024-05-27"
        }
    ]


//exported function to add our formData from IncomeForm.jsx to the array we declared above
//so that we can render it in RenderIncome.jsx
export function addIncome(newIncome) {
    dummyIncome.push(newIncome)
}

