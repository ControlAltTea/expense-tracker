import ExpenseGoals from "../components/ExpensesPage";
import ChatBar from "../components/ChatBar";
import IncomeForm from "../components/IncomeComponent/IncomeForm";

function Home() {
  return (
    <div>
      <div>
        <ExpenseGoals />
        <ChatBar />
      </div>
    </div>
  );
}

export default Home;
