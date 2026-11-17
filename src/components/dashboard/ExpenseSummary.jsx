import { formatCurrency } from "../../utils/format";

function ExpenseSummary({ summaryCards }) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {summaryCards.map((card, index) => (
        <div
          key={card.title}
          className={`rounded-xl bg-white p-5 shadow-sm ${
            index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
          }`}
        >
          <p className="text-sm text-gray-500">{card.title}</p>

          <h2 className="mt-2 break-words text-xl font-bold text-gray-800 xl:text-2xl">
            {formatCurrency(card.amount)}
          </h2>
        </div>
      ))}
    </section>
  );
}

export default ExpenseSummary;
