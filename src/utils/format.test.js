import { describe, expect, it } from "vitest";
import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("shows rupees with two decimals", () => {
    expect(formatCurrency(99.5)).toBe("₹99.50");
    expect(formatCurrency(1200)).toBe("₹1,200.00");
  });

  it("uses Indian digit grouping", () => {
    expect(formatCurrency(123456)).toBe("₹1,23,456.00");
  });

  it("falls back to zero for invalid input", () => {
    expect(formatCurrency(undefined)).toBe("₹0.00");
    expect(formatCurrency("abc")).toBe("₹0.00");
  });
});
