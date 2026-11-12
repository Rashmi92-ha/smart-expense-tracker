function ExpenseList({ expenses }) {
  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-800">
        Recent Expenses
      </h2>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between border-b border-gray-100 pb-4"
          >
            <div>
              <h3 className="font-medium text-gray-800">{expense.title}</h3>

              <p className="text-sm text-gray-500">
                {expense.category} · {expense.date}
              </p>
            </div>

            <p className="font-semibold text-gray-800">
              ₹{expense.amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExpenseList;
