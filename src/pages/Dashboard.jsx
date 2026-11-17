import { useMemo, useState } from "react";
import expensesData from "../data/expenses";
import useLocalStorage from "../hooks/useLocalStorage";
import ExpenseSummary from "../components/dashboard/ExpenseSummary";
import ExpenseFilters from "../components/dashboard/ExpenseFilters";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { filterExpenses, initialFilters } from "../utils/expenseFilters";
import { getSummaryCards } from "../utils/expenseSummary";

function Dashboard() {
  const [expenses, setExpenses] = useLocalStorage("expenses", expensesData);
  const [filters, setFilters] = useState(initialFilters);

  const summaryCards = useMemo(() => getSummaryCards(expenses), [expenses]);
  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, filters),
    [expenses, filters],
  );

  const handleAddExpense = (newExpense) =>
    setExpenses((prev) => [newExpense, ...prev]);

  const handleDeleteExpense = (id) =>
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

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

      <main className="space-y-8">
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseSummary summaryCards={summaryCards} />
        <ExpenseFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(initialFilters)}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  );
}

export default Dashboard;
