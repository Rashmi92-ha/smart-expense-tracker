function ExpenseSummary({ summaryCards }) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card) => (
        <div key={card.title} className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">{card.title}</p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            ₹{card.amount.toLocaleString("en-IN")}
          </h2>
        </div>
      ))}
    </section>
  );
}

export default ExpenseSummary;
