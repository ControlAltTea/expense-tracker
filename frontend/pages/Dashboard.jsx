import { React } from "react";
import ChatBar from "../components/ChatBar";
import ExpenseGoals from "../components/ExpensesPage";

function Dashboard() {
  return (
    <div>
      <div>
        <ExpenseGoals />
        <ChatBar />
      </div>
    </div>
  );
}

export default Dashboard;
