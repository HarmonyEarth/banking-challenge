import dayjs from "dayjs";

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM D, YYYY h:mm:ss A");
};

export const formatAmount = (amount: number, direction: string): string => {
  const formattedAmount = amount.toFixed(2);
  return direction === "withdrawal"
    ? `-$${formattedAmount}`
    : `+$${formattedAmount}`;
};
