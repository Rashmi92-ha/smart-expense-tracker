import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!amount || Number(amount) <= 0 || !category || !date) {
      alert("Please enter a valid amount, category and date.");
    }
    const newExpense = {
      id: Date.now(),
      title: note.trim() || category,
      amount: Number(amount),
      category,
      date,
      note,
    };
    onAddExpense(newExpense);

    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">
        Add New Expense
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter Amount"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-500 "
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-500"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Note</label>
          <input
            type="text"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Enter expense note"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700 sm:col-span-2"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
export default ExpenseForm;
