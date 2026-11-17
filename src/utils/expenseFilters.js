export const initialFilters = {
  category: "All",
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
  search: "",
};

export const hasInvalidDateRange = ({ startDate, endDate }) =>
  Boolean(startDate && endDate && startDate > endDate);

export const hasInvalidAmountRange = ({ minAmount, maxAmount }) =>
  minAmount !== "" && maxAmount !== "" && Number(minAmount) > Number(maxAmount);

export const hasActiveFilters = (filters) =>
  Object.keys(initialFilters).some(
    (key) => filters[key] !== initialFilters[key],
  );

export function filterExpenses(expenses, filters) {
  if (hasInvalidDateRange(filters) || hasInvalidAmountRange(filters)) return [];

  const { category, startDate, endDate, minAmount, maxAmount, search } = filters;

  const min = minAmount === "" ? -Infinity : Number(minAmount);
  const max = maxAmount === "" ? Infinity : Number(maxAmount);
  const query = search.trim().toLowerCase();

  return expenses.filter((expense) => {
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
}
