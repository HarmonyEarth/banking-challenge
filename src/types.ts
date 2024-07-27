import { TRANSACTION_DIRECTION, TRANSACTION_TYPE } from "./constants";

export type Transaction = {
  effectiveDate: string;
  name: string;
  amount: number;
  type: TRANSACTION_TYPE;
  direction: TRANSACTION_DIRECTION;
  memo: string;
  category?: string;
};
