import { describe, it, expect } from "vitest";
import { formatAmount } from "./formatters";

describe("formatAmount", () => {
  it("formats withdrawal amount correctly", () => {
    expect(formatAmount(25, "withdrawal")).toBe("-$25.00");
  });

  it("formats deposit amount correctly", () => {
    expect(formatAmount(25, "deposit")).toBe("+$25.00");
  });
});
