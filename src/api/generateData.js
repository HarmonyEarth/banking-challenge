import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";
import path from "path";
import { TRANSACTION_DIRECTION } from "../constants";

const __filename = fileURLToPath(import.meta.url);

// Helper function to get the first and third Tuesdays of July 2024
const getSpecificDates = () => {
  const dates = [];
  const year = 2024;
  const month = 6; // July (0-based index)

  // Function to find the nth occurrence of a weekday in a month
  const getNthWeekday = (n, weekday, month, year) => {
    const date = new Date(year, month, 1);
    date.setDate(
      date.getDate() + ((weekday - date.getDay() + 7) % 7) + (n - 1) * 7,
    );
    return date;
  };

  // Find the first and third Tuesdays of July 2024
  dates.push(getNthWeekday(1, 2, month, year)); // 2 represents Tuesday
  dates.push(getNthWeekday(3, 2, month, year));

  return dates.map((date) => date.toISOString());
};

// Generate a fake transaction
const generateTransaction = (
  effectiveDate,
  name,
  amount,
  type,
  direction,
  memo,
) => ({
  effectiveDate,
  name,
  amount: amount.toFixed(2),
  type,
  direction,
  memo,
});

if (isMainThread) {
  const numWorkers = 4;
  const totalTransactions = 33; // Total number of transactions
  const transactionsPerWorker = Math.floor(totalTransactions / numWorkers); // Number of transactions per worker
  const remainingTransactions = totalTransactions % numWorkers; // Adjust for the last worker
  let remainingWorkers = numWorkers;
  let transactions = [];
  const specificDates = getSpecificDates();

  // Amounts for deposit transactions
  const depositAmounts = [
    parseFloat(faker.finance.amount({ min: 2300, max: 3000, dec: 2 })),
    parseFloat(faker.finance.amount({ min: 2300, max: 3000, dec: 2 })),
  ];

  let totalDeposits = depositAmounts.reduce((acc, amount) => acc + amount, 0);

  // Create transactions for the first and third Tuesdays with specified deposit amounts
  const predefinedTransactions = specificDates.flatMap((date, index) => [
    generateTransaction(
      date,
      "ACME LLC",
      depositAmounts[index],
      "credit",
      TRANSACTION_DIRECTION.DEPOSIT,
      "Deposit for the first Tuesday",
    ),
  ]);

  // Generate transactions for each worker
  for (let i = 0; i < numWorkers; i++) {
    const isLastWorker = i === numWorkers - 1;
    const numWorkerTransactions = isLastWorker
      ? transactionsPerWorker + remainingTransactions
      : transactionsPerWorker;

    const worker = new Worker(__filename, {
      workerData: {
        numWorkerTransactions,
        predefinedTransactions,
        totalDeposits,
      },
    });

    worker.on("message", (data) => {
      transactions = transactions.concat(data.transactions);
      remainingWorkers--;

      if (remainingWorkers === 0) {
        // Limit total transactions to 33
        transactions = transactions.slice(0, totalTransactions);

        const outputPath = path.resolve(
          "public",
          "api",
          "transactions_new.json",
        );

        writeFileSync(
          outputPath,
          JSON.stringify(
            { data: [...predefinedTransactions, ...transactions] },
            null,
            2,
          ),
        );
        console.log(
          "Fake data generated and saved to public/api/transactions.json",
        );
      }
    });

    worker.on("error", (error) => {
      console.error("Worker encountered an error:", error);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  }
} else {
  const { numWorkerTransactions, predefinedTransactions, totalDeposits } =
    workerData;

  // Generate transactions
  const generateTransactions = (numTransactions) => {
    let transactions = [];
    let remainingBalance = totalDeposits;

    for (let i = 0; i < numTransactions; i++) {
      let effectiveDate = faker.date
        .between("2024-07-01", "2024-07-31")
        .toISOString();
      let name = faker.company.name();
      let amount = parseFloat(faker.finance.amount(5, 1000, 2));
      let type = faker.helpers.arrayElement(["debit", "credit"]);
      let direction = faker.helpers.arrayElement([
        TRANSACTION_DIRECTION.DEPOSIT,
        TRANSACTION_DIRECTION.WITHDRAWAL,
      ]);
      let memo = faker.finance.transactionDescription();

      if (
        direction === TRANSACTION_DIRECTION.WITHDRAWAL &&
        amount > remainingBalance
      ) {
        continue; // Skip this transaction to avoid negative balance
      }

      if (direction === TRANSACTION_DIRECTION.WITHDRAWAL) {
        remainingBalance -= amount;
      }

      transactions.push(
        generateTransaction(effectiveDate, name, amount, type, direction, memo),
      );
    }

    return transactions;
  };

  const transactions = [
    ...predefinedTransactions,
    ...generateTransactions(numWorkerTransactions),
  ];
  parentPort.postMessage({ transactions });
}
