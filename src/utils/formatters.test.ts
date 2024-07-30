import { describe, it, expect } from "vitest";
import { formatAmount } from "./formatters";
import { TRANSACTION_DIRECTION } from "../constants";

describe("formatAmount", () => {
  it("formats withdrawal amount correctly", () => {
    expect(formatAmount(25, TRANSACTION_DIRECTION.WITHDRAWAL)).toBe("-$25.00");
  });

  it("formats deposit amount correctly", () => {
    expect(formatAmount(25, TRANSACTION_DIRECTION.DEPOSIT)).toBe("+$25.00");
  });
});
