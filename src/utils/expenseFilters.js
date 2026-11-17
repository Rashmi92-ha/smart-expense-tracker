export const initialFilters = {
  category: "All",
  startDate: "",
  endDate: "",
};

export const hasActiveFilters = (filters) =>
  Object.keys(initialFilters).some(
    (key) => filters[key] !== initialFilters[key],
  );

export const hasInvalidDateRange = ({ startDate, endDate }) =>
  Boolean(startDate && endDate && startDate > endDate);

export function filterExpenses(expenses, filters) {
  if (hasInvalidDateRange(filters)) return [];

  const { category, startDate, endDate } = filters;

  return expenses.filter(
    (expense) =>
      (category === "All" || expense.category === category) &&
      (!startDate || expense.date >= startDate) &&
      (!endDate || expense.date <= endDate),
  );
}
