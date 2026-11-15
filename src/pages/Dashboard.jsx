import expensesData from "../data/expenses";
import ExpenseSummary from "../components/dashboard/ExpenseSummary";
import ExpensesList from "../components/expenses/ExpenseList";
import ExpenseForm from "../components/expenses/ExpenseForm";
import useLocalStorage from "../hooks/useLocalStorage";

function Dashboard() {
  const [expenses, setExpenses] = useLocalStorage("expenses", expensesData);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const getCategoryTotal = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const summaryCards = [
    { title: "Total Expenses", amount: totalExpenses },
    { title: "Food", amount: getCategoryTotal("Food") },
    { title: "Travel", amount: getCategoryTotal("Travel") },
    {
      title: "Bills & Others",
      amount: getCategoryTotal("Bills") + getCategoryTotal("Others"),
    },
  ];

  const handleAddExpense = (newExpense) => {
    setExpenses((previousExpenses) => [newExpense, ...previousExpenses]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Smart Expense Tracker
        </h1>

        <p className="mt-1 text-gray-500">
          Manage and track your daily expenses
        </p>
      </header>

      <div className="space-y-8">
        <ExpenseForm onAddExpense={handleAddExpense} />

        <ExpenseSummary summaryCards={summaryCards} />

        <ExpensesList expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;
