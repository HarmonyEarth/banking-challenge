import { z } from "zod";
import { TRANSACTION_TYPE, TRANSACTION_DIRECTION } from "./constants";

// Schema for a single transaction
export const transactionSchema = z.object({
  effectiveDate: z.string(),
  name: z.string(),
  amount: z.number(),
  type: z.nativeEnum(TRANSACTION_TYPE),
  direction: z.nativeEnum(TRANSACTION_DIRECTION),
  memo: z.string(),
});

// Schema for an array of transactions
export const transactionsSchema = z.array(transactionSchema);
