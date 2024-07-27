import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import type { Transaction } from "../../types";
import TransactionAccordion from "./TransactionAccordion";

interface Props {
  transactions?: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(
    null,
  );

  const groupedTransactions = useMemo(
    () => groupTransactionsByDate(transactions),
    [transactions],
  );
  const sortedDates = useMemo(
    () => sortDates(Array.from(groupedTransactions.keys())),
    [groupedTransactions],
  );
  const balanceMap = useMemo(
    () => calculateRunningBalance(transactions),
    [transactions],
  );

  const handleToggle = (effectiveDate: string) => {
    setExpandedTransaction(
      expandedTransaction === effectiveDate ? null : effectiveDate,
    );
  };

  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date} className="my-4">
          <h2 className="text-xl font-semibold">
            {dayjs(date).format("MMMM D, YYYY")}
          </h2>
          <ul className="space-y-2">
            {groupedTransactions
              .get(date)
              ?.map((transaction: Transaction) => (
                <TransactionAccordion
                  key={transaction.effectiveDate}
                  transaction={transaction}
                  balance={balanceMap.get(transaction.effectiveDate) || 0}
                  isExpanded={expandedTransaction === transaction.effectiveDate}
                  onToggle={() => handleToggle(transaction.effectiveDate)}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;

//MARK: - Utility functions

const groupTransactionsByDate = (transactions: Transaction[] | undefined) => {
  if (!transactions) return new Map<string, Transaction[]>();

  return transactions.reduce((groups, transaction) => {
    const date = dayjs(transaction.effectiveDate).format("YYYY-MM-DD");
    if (!groups.has(date)) {
      groups.set(date, []);
    }
    groups.get(date)?.push(transaction);
    return groups;
  }, new Map<string, Transaction[]>());
};

const sortDates = (dates: string[]) => {
  return dates.sort((a, b) => dayjs(b).unix() - dayjs(a).unix());
};

const calculateRunningBalance = (
  transactions: Transaction[] | undefined,
): Map<string, number> => {
  const balanceMap = new Map<string, number>();
  let runningBalance = 0;

  if (transactions) {
    [...transactions]
      .sort(
        (a, b) =>
          dayjs(a.effectiveDate).valueOf() - dayjs(b.effectiveDate).valueOf(),
      )
      .forEach((transaction) => {
        runningBalance +=
          transaction.direction === "withdrawal"
            ? -transaction.amount
            : transaction.amount;
        balanceMap.set(transaction.effectiveDate, runningBalance);
      });
  }

  return balanceMap;
};
