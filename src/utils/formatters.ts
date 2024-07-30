import dayjs from "dayjs";
import { TRANSACTION_DIRECTION } from "../constants";

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM D, YYYY h:mm:ss A");
};

export const formatAmount = (amount: number, direction: string): string => {
  const formattedAmount = amount.toFixed(2);
  return direction === TRANSACTION_DIRECTION.WITHDRAWAL
    ? `-$${formattedAmount}`
    : `+$${formattedAmount}`;
};
