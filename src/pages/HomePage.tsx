import React, { useState, useEffect } from "react";
import TransactionList from "../components/Home/TransactionList";
import { useTransactions } from "../hooks/useTransactions";
import { getCategory } from "../utils/getCategory";
import type { Transaction } from "../types";
import SpendingBreakdown from "../components/Home/SpendingBreakdown";

const HomePage: React.FC = () => {
  const { data, isLoading, error } = useTransactions();
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    data,
  );

  useEffect(() => {
    if (data) {
      const extendedTransactions = data.map((transaction) => ({
        ...transaction,
        category: getCategory(transaction.name),
      }));
      setTransactions(extendedTransactions);
    }
  }, [data]);

  const balance = calculateBalance(transactions);

  if (error) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-red-800">
          Failed to fetch data
        </h2>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={`h-[600px] ${isLoading && "animate-pulse bg-black"}`}>
      <div className="mt-4 p-4 text-center">
        <h2
          className={`mb-1 text-4xl font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          ${balance.toFixed(2)}
        </h2>
        <h3 className="font-semibold">Current Balance</h3>
      </div>
      <SpendingBreakdown transactions={transactions} />{" "}
      <h2 className="my-4 text-center text-lg font-semibold">
        Spending Breakdown for July 2024 by Category
      </h2>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default HomePage;

const calculateBalance = (transactions: Transaction[] | undefined) => {
  if (!transactions) return 0;
  return transactions.reduce((total, transaction) => {
    return transaction.direction === "withdrawal"
      ? total - transaction.amount
      : total + transaction.amount;
  }, 0);
};
