import { useState } from "react";
import { CATEGORIES } from "../../utils/constants";
import { getToday } from "../../utils/date";

const createEmptyForm = () => ({
  amount: "",
  category: "",
  date: getToday(),
  note: "",
});

const inputClass =
  "w-full rounded-lg border p-3 outline-none focus:border-purple-500";

function validate({ amount, category, date }) {
  const errors = {};
  const value = Number(amount);

  if (amount === "" || !Number.isFinite(value) || value <= 0) {
    errors.amount = "Enter an amount greater than 0.";
  }
  if (!category) errors.category = "Select a category.";
  if (!date) errors.date = "Pick a date.";

  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ExpenseForm({ onAddExpense }) {
  const [form, setForm] = useState(createEmptyForm);
  const [errors, setErrors] = useState({});

  const update = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined })); // clear this field's error as the user fixes it
  };

  const borderClass = (key) =>
    errors[key] ? "border-red-500" : "border-gray-300";

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const note = form.note.trim();

    onAddExpense({
      id: crypto.randomUUID(),
      title: note || form.category,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note,
    });

    setForm(createEmptyForm());
    setErrors({});
  };

  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">
        Add New Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <Field id="amount" label="Amount (₹)" error={errors.amount}>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={update("amount")}
            placeholder="Enter amount"
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={`${inputClass} ${borderClass("amount")}`}
          />
        </Field>

        <Field id="category" label="Category" error={errors.category}>
          <select
            id="category"
            value={form.category}
            onChange={update("category")}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
            className={`${inputClass} ${borderClass("category")}`}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field id="date" label="Date" error={errors.date}>
          <input
            id="date"
            type="date"
            max={getToday()}
            value={form.date}
            onChange={update("date")}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={`${inputClass} ${borderClass("date")}`}
          />
        </Field>

        <Field id="note" label="Note (optional)">
          <input
            id="note"
            type="text"
            maxLength={80}
            value={form.note}
            onChange={update("note")}
            placeholder="Enter expense note"
            className={`${inputClass} border-gray-300`}
          />
        </Field>

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
