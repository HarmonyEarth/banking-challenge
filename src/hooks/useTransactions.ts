// src/hooks/useTransactions.ts
import { useQuery } from "@tanstack/react-query";
import { transactionsSchema } from "../schema";
import type { Transaction } from "../types";

// Function to fetch and parse transactions
const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch("api/transactions.json"); // Adjust the path if needed
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return transactionsSchema.parse(data.data);
};

// Hook to use transactions
export const useTransactions = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
};
