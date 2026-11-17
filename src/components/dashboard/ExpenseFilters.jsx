import { CATEGORIES } from "../../utils/constants";
import {
  hasInvalidDateRange,
  hasInvalidAmountRange,
} from "../../utils/expenseFilters";

const inputClass = "w-full rounded-lg border border-gray-300 p-3";

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function ExpenseFilters({ filters, onChange, onClear }) {
  const update = (key) => (event) =>
    onChange({ ...filters, [key]: event.target.value });

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 font-medium text-gray-700">Filters</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field id="search" label="Search">
          <input
            id="search"
            type="search"
            placeholder="Note or category"
            value={filters.search}
            onChange={update("search")}
            className={inputClass}
          />
        </Field>
        <Field id="category" label="Category">
          <select
            id="category"
            value={filters.category}
            onChange={update("category")}
            className={inputClass}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field id="startDate" label="Start Date">
          <input
            id="startDate"
            type="date"
            value={filters.startDate}
            onChange={update("startDate")}
            className={inputClass}
          />
        </Field>

        <Field id="endDate" label="End Date">
          <input
            id="endDate"
            type="date"
            value={filters.endDate}
            onChange={update("endDate")}
            className={inputClass}
          />
        </Field>

        <Field id="minAmount" label="Min Amount (₹)">
          <input
            id="minAmount"
            type="number"
            min="0"
            placeholder="0"
            value={filters.minAmount}
            onChange={update("minAmount")}
            className={inputClass}
          />
        </Field>

        <Field id="maxAmount" label="Max Amount (₹)">
          <input
            id="maxAmount"
            type="number"
            min="0"
            placeholder="No limit"
            value={filters.maxAmount}
            onChange={update("maxAmount")}
            className={inputClass}
          />
        </Field>
      </div>

      {hasInvalidDateRange(filters) && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          End date cannot be earlier than start date.
        </p>
      )}

      {hasInvalidAmountRange(filters) && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          Min amount cannot be greater than max amount.
        </p>
      )}

      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Clear Filters
      </button>
    </section>
  );
}

export default ExpenseFilters;
