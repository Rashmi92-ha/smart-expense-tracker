import { describe, expect, it } from "vitest";
import { getCategoryTotals, getSummaryCards } from "./expenseSummary";

const expenses = [
  { amount: 200, category: "Food" },
  { amount: 50, category: "Travel" },
  { amount: 1200, category: "Bills" },
  { amount: 400, category: "Others" },
];

describe("getSummaryCards", () => {
  it("totals overall and per category", () => {
    expect(getSummaryCards(expenses)).toEqual([
      { title: "Total Expenses", amount: 1850 },
      { title: "Food", amount: 200 },
      { title: "Travel", amount: 50 },
      { title: "Bills", amount: 1200 },
      { title: "Others", amount: 400 },
    ]);
  });

  it("returns zeros for an empty list", () => {
    expect(getSummaryCards([]).every((card) => card.amount === 0)).toBe(true);
  });
});

describe("getCategoryTotals", () => {
  it("sums each category in a fixed order", () => {
    const result = getCategoryTotals([
      ...expenses,
      { amount: 100, category: "Food" },
    ]);
    expect(result).toEqual([
      { name: "Food", value: 300 },
      { name: "Travel", value: 50 },
      { name: "Bills", value: 1200 },
      { name: "Others", value: 400 },
    ]);
  });

  it("leaves out categories with no spending", () => {
    expect(getCategoryTotals([{ amount: 80, category: "Food" }])).toEqual([
      { name: "Food", value: 80 },
    ]);
  });

  it("returns an empty array when there are no expenses", () => {
    expect(getCategoryTotals([])).toEqual([]);
  });
});
