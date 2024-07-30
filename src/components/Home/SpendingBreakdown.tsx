import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Transaction } from "../../types";
import { getCategory } from "../../utils/getCategory";
import { COLORS, TRANSACTION_DIRECTION } from "../../constants";

interface Props {
  transactions?: Transaction[];
}

const SpendingBreakdown: React.FC<Props> = ({ transactions }) => {
  const pieData = getSpendingByCategory(transactions);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
          label={(entry) => `${entry.name}: $${entry.value.toFixed(2)}`}
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpendingBreakdown;

const getSpendingByCategory = (transactions: Transaction[] | undefined) => {
  if (!transactions) return [];

  const spendingTransactions = transactions.filter(
    (transaction) => transaction.direction === TRANSACTION_DIRECTION.WITHDRAWAL,
  );

  const spendingByCategory = spendingTransactions.reduce(
    (acc, transaction) => {
      const category = getCategory(transaction.name);
      if (category) {
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += transaction.amount;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.keys(spendingByCategory).map((category) => ({
    name: category,
    value: spendingByCategory[category],
  }));
};
