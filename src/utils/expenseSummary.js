export function getSummaryCards(expenses) {
  const totals = { Food: 0, Travel: 0, Bills: 0, Others: 0 };
  let total = 0;

  for (const { category, amount } of expenses) {
    totals[category] = (totals[category] ?? 0) + amount;
    total += amount;
  }

  return [
    { title: "Total Expenses", amount: total },
    { title: "Food", amount: totals.Food },
    { title: "Travel", amount: totals.Travel },
    { title: "Bills & Others", amount: totals.Bills + totals.Others },
  ];
}
