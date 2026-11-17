export const initialFilters = {
  category: "All",
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
  search: "",
  sortBy: "recent",
};

export const hasInvalidDateRange = ({ startDate, endDate }) =>
  Boolean(startDate && endDate && startDate > endDate);

export const hasInvalidAmountRange = ({ minAmount, maxAmount }) =>
  minAmount !== "" && maxAmount !== "" && Number(minAmount) > Number(maxAmount);

// Sorting changes order, not which expenses match, so it doesn't count as a filter.
export const hasActiveFilters = (filters) =>
  Object.keys(initialFilters).some(
    (key) => key !== "sortBy" && filters[key] !== initialFilters[key],
  );

export function filterExpenses(expenses, filters) {
  if (hasInvalidDateRange(filters) || hasInvalidAmountRange(filters)) return [];

  const { category, startDate, endDate, minAmount, maxAmount, search, sortBy } =
    filters;

  const min = minAmount === "" ? -Infinity : Number(minAmount);
  const max = maxAmount === "" ? Infinity : Number(maxAmount);
  const query = search.trim().toLowerCase();

  const matches = expenses.filter((expense) => {
    const matchesSearch =
      !query ||
      [expense.title, expense.note, expense.category].some((text) =>
        text?.toLowerCase().includes(query),
      );

    return (
      matchesSearch &&
      (category === "All" || expense.category === category) &&
      (!startDate || expense.date >= startDate) &&
      (!endDate || expense.date <= endDate) &&
      expense.amount >= min &&
      expense.amount <= max
    );
  });

  // filter() returns a new array, so sorting here never mutates state.
  // Array.sort is stable, so ties keep their order (newest-added first).
  return matches.sort((a, b) =>
    sortBy === "highest" ? b.amount - a.amount : b.date.localeCompare(a.date),
  );
}
