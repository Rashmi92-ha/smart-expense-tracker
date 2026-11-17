import { formatDate } from "../../utils/date";
import { formatCurrency } from "../../utils/format";

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
    <section className="relative rounded-xl bg-white shadow-sm lg:min-h-[28rem]">
      <div className="flex flex-col p-6 lg:absolute lg:inset-0">
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
          <div
            role="region"
            aria-label="Expenses list"
            tabIndex={0}
            className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2"
          >
            <ul className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={onDeleteExpense}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpenseList;
