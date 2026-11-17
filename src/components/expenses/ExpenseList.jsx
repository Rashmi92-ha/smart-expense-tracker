import { formatCurrency } from "../../utils/format";
import { formatDate } from "../../utils/date";

function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="flex items-center gap-4 py-4">
      <div className="min-w-0 flex-1">
        <h3
          className="truncate font-medium text-gray-800"
          title={expense.title}
        >
          {expense.title}
        </h3>
        <p className="text-sm text-gray-500">
          {expense.category} ·{" "}
          <time dateTime={expense.date}>{formatDate(expense.date)}</time>
        </p>
      </div>

      <p className="shrink-0 font-semibold text-gray-800">
        {formatCurrency(expense.amount)}
      </p>

      <button
        type="button"
        onClick={() => onDelete(expense.id)}
        aria-label={`Delete ${expense.title}`}
        className="shrink-0 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
      >
        Delete
      </button>
    </li>
  );
}

function ExpenseList({ expenses, onDeleteExpense, isFiltered = false }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-800">
        Expenses{" "}
        <span className="text-sm font-normal text-gray-500">
          ({expenses.length})
        </span>
      </h2>

      {expenses.length === 0 ? (
        <p className="py-6 text-center text-gray-500">
          {isFiltered
            ? "No expenses match your filters."
            : "No expenses yet. Add your first expense above."}
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDeleteExpense}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ExpenseList;
