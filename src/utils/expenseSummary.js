import { CATEGORIES } from "./constants";

export function getSummaryCards(expenses) {
  const totals = Object.fromEntries(CATEGORIES.map((name) => [name, 0]));
  let total = 0;

  for (const { category, amount } of expenses) {
    totals[category] = (totals[category] ?? 0) + amount;
    total += amount;
  }

  return [
    { title: "Total Expenses", amount: total },
    ...CATEGORIES.map((name) => ({ title: name, amount: totals[name] })),
  ];
}

export function getCategoryTotals(expenses) {
  return CATEGORIES.map((name) => ({
    name,
    value: expenses
      .filter((expense) => expense.category === name)
      .reduce((sum, expense) => sum + expense.amount, 0),
  })).filter((item) => item.value > 0);
}