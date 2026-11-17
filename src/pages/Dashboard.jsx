import { useMemo, useState } from "react";
import sampleExpenses from "../data/expenses";
import useLocalStorage from "../hooks/useLocalStorage";
import ExpenseSummary from "../components/dashboard/ExpenseSummary";
import ExpenseFilters from "../components/dashboard/ExpenseFilters";
import ExpenseList from "../components/expenses/ExpenseList";
import ExpenseForm from "../components/expenses/ExpenseForm";
import CategoryChart from "../components/dashboard/CategoryChart";
import {
  filterExpenses,
  initialFilters,
  hasActiveFilters,
} from "../utils/expenseFilters";
import { getSummaryCards, getCategoryTotals } from "../utils/expenseSummary";

function Dashboard() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [filters, setFilters] = useState(initialFilters);

  const summaryCards = useMemo(() => getSummaryCards(expenses), [expenses]);
  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, filters),
    [expenses, filters],
  );
  const categoryTotals = useMemo(
    () => getCategoryTotals(filteredExpenses),
    [filteredExpenses],
  );

  const handleAddExpense = (newExpense) =>
    setExpenses((prev) => [newExpense, ...prev]);

  const handleDeleteExpense = (id) =>
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

  const handleLoadSample = () => setExpenses(sampleExpenses);

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
        {expenses.length === 0 && (
          <div className="rounded-xl border border-dashed border-purple-300 bg-white p-6 text-center">
            <p className="mb-3 text-gray-600">
              No expenses yet. Add one below, or try some sample data.
            </p>
            <button
              type="button"
              onClick={handleLoadSample}
              className="rounded-lg border border-purple-600 px-4 py-2 text-purple-600 hover:bg-purple-50"
            >
              Load sample data
            </button>
          </div>
        )}

        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseSummary summaryCards={summaryCards} />
        <ExpenseFilters
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(initialFilters)}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            isFiltered={hasActiveFilters(filters)}
          />
          <div className="order-first lg:order-none">
            <CategoryChart data={categoryTotals} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
