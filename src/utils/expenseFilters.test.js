import { describe, expect, it } from "vitest";
import {
  filterExpenses,
  hasActiveFilters,
  hasInvalidAmountRange,
  hasInvalidDateRange,
  initialFilters,
} from "./expenseFilters";

const expenses = [
  {
    id: 1,
    title: "Lunch",
    note: "with friends",
    amount: 200,
    category: "Food",
    date: "2026-11-10",
  },
  {
    id: 2,
    title: "Bus",
    note: "",
    amount: 50,
    category: "Travel",
    date: "2026-11-12",
  },
  {
    id: 3,
    title: "Electricity",
    note: "",
    amount: 1200,
    category: "Bills",
    date: "2026-11-09",
  },
  {
    id: 4,
    title: "Movie",
    note: "",
    amount: 400,
    category: "Others",
    date: "2026-11-15",
  },
];

const run = (overrides = {}) =>
  filterExpenses(expenses, { ...initialFilters, ...overrides }).map(
    (e) => e.id,
  );

describe("filterExpenses", () => {
  it("returns everything, most recent first, with default filters", () => {
    expect(run()).toEqual([4, 2, 1, 3]);
  });

  it("filters by category", () => {
    expect(run({ category: "Bills" })).toEqual([3]);
  });

  it("includes both ends of a date range", () => {
    expect(run({ startDate: "2026-11-10", endDate: "2026-11-12" })).toEqual([
      2, 1,
    ]);
  });

  it("supports a start date or an end date alone", () => {
    expect(run({ startDate: "2026-11-12" })).toEqual([4, 2]);
    expect(run({ endDate: "2026-11-10" })).toEqual([1, 3]);
  });

  it("includes both ends of an amount range", () => {
    expect(run({ minAmount: "200", maxAmount: "400" })).toEqual([4, 1]);
  });

  it("treats an empty amount input as no limit", () => {
    expect(run({ minAmount: "400" })).toEqual([4, 3]);
    expect(run({ maxAmount: "50" })).toEqual([2]);
  });

  it("returns nothing for an invalid date range", () => {
    expect(run({ startDate: "2026-11-15", endDate: "2026-11-01" })).toEqual([]);
  });

  it("returns nothing when min is greater than max", () => {
    expect(run({ minAmount: "500", maxAmount: "100" })).toEqual([]);
  });

  it("searches note, title, and category, ignoring case and spaces", () => {
    expect(run({ search: "FRIENDS" })).toEqual([1]);
    expect(run({ search: "  bus  " })).toEqual([2]);
    expect(run({ search: "bills" })).toEqual([3]);
  });

  it("does not crash on older entries without a note", () => {
    const legacy = [
      { id: 9, title: "Old", amount: 10, category: "Food", date: "2026-11-01" },
    ];
    expect(
      filterExpenses(legacy, { ...initialFilters, search: "old" }),
    ).toHaveLength(1);
    expect(
      filterExpenses(legacy, { ...initialFilters, search: "zzz" }),
    ).toHaveLength(0);
  });

  it("sorts by highest amount", () => {
    expect(run({ sortBy: "highest" })).toEqual([3, 4, 1, 2]);
  });

  it("applies all filters together", () => {
    expect(
      run({
        category: "Food",
        search: "lunch",
        minAmount: "100",
        startDate: "2026-11-01",
      }),
    ).toEqual([1]);
  });

  it("does not mutate the original array", () => {
    const copy = [...expenses];
    filterExpenses(expenses, { ...initialFilters, sortBy: "highest" });
    expect(expenses).toEqual(copy);
  });
});

describe("range validators", () => {
  it("detects an invalid date range", () => {
    expect(
      hasInvalidDateRange({ startDate: "2026-11-10", endDate: "2026-11-01" }),
    ).toBe(true);
    expect(
      hasInvalidDateRange({ startDate: "2026-11-01", endDate: "2026-11-10" }),
    ).toBe(false);
    expect(hasInvalidDateRange({ startDate: "", endDate: "2026-11-10" })).toBe(
      false,
    );
  });

  it("detects an invalid amount range", () => {
    expect(hasInvalidAmountRange({ minAmount: "500", maxAmount: "100" })).toBe(
      true,
    );
    expect(hasInvalidAmountRange({ minAmount: "100", maxAmount: "500" })).toBe(
      false,
    );
    expect(hasInvalidAmountRange({ minAmount: "", maxAmount: "100" })).toBe(
      false,
    );
  });
});

describe("hasActiveFilters", () => {
  it("is false for the initial filters", () => {
    expect(hasActiveFilters(initialFilters)).toBe(false);
  });

  it("ignores sorting", () => {
    expect(hasActiveFilters({ ...initialFilters, sortBy: "highest" })).toBe(
      false,
    );
  });

  it("is true when any filter is set", () => {
    expect(hasActiveFilters({ ...initialFilters, search: "a" })).toBe(true);
    expect(hasActiveFilters({ ...initialFilters, category: "Food" })).toBe(
      true,
    );
    expect(hasActiveFilters({ ...initialFilters, maxAmount: "10" })).toBe(true);
  });
});
