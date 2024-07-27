import React from "react";
import type { Transaction } from "../../types";
import { CategoryIcons } from "../CategoryIcons/CategoryIcons";
import { getCategory } from "../../utils/getCategory";
import { formatAmount, formatDate } from "../../utils/formatters";

interface TransactionAccordionProps {
  transaction: Transaction;
  balance: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const TransactionAccordion: React.FC<TransactionAccordionProps> = ({
  transaction,
  balance,
  isExpanded,
  onToggle,
}) => {
  const category = getCategory(transaction.name);
  const IconComponent =
    CategoryIcons[category as keyof typeof CategoryIcons] || null;

  return (
    <li className="rounded-lg border border-gray-300">
      <div
        onClick={onToggle}
        role="button"
        className="row-auto flex w-full items-center justify-between bg-gray-100 p-4 text-left hover:bg-gray-200 focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          {IconComponent && <div className="mr-2">{IconComponent}</div>}
          <p className="font-serif text-lg font-semibold tracking-wider">
            {transaction.name}
          </p>
        </div>
        <div className="text-right">
          <p
            className={`font-semibold ${
              transaction.direction === "deposit" && "text-green-700"
            }`}
          >
            {formatAmount(transaction.amount, transaction.direction)}
          </p>
          <p className="text-gray-600">${balance.toFixed(2)}</p>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-300 bg-gray-50 p-4 capitalize">
          <p>
            <strong>Date:</strong> {formatDate(transaction.effectiveDate)}
          </p>
          <p>
            <strong>Type:</strong> {transaction.type}
          </p>
          <p>
            <strong>Direction:</strong> {transaction.direction}
          </p>
          <p>
            <strong>Category:</strong> {transaction.category}
          </p>
          <p>
            <strong>Memo:</strong> {transaction.memo}
          </p>
        </div>
      )}
    </li>
  );
};

export default TransactionAccordion;
