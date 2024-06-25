import { React } from "react";
import ChatBar from "../components/ChatBar";
import ExpenseGoals from "../components/Dashboard";

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
