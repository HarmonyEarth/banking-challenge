import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url"; // Import fileURLToPath from url module
import { faker } from "@faker-js/faker";
import path from "path"; // Import path module to handle file paths

const __filename = fileURLToPath(import.meta.url);

// Generate a fake transaction
const generateTransaction = () => {
  return {
    effectiveDate: faker.date.recent().toISOString(),
    name: faker.company.name(),
    amount: faker.finance.amount({
      min: 0,
      max: 1000,
      dec: 2,
    }),
    type: faker.finance.transactionType(),
    direction: faker.helpers.arrayElement(["withdrawal", "deposit"]),
    memo: faker.finance.transactionDescription(),
  };
};

// Main thread logic
if (isMainThread) {
  const numWorkers = 4; // Number of workers to create
  const transactionsPerWorker = 25; // Total number of transactions per worker
  let remainingWorkers = numWorkers;
  let transactions = [];

  for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker(__filename, {
      workerData: { transactionsPerWorker },
    });

    worker.on("message", (data) => {
      transactions = transactions.concat(data.transactions);
      remainingWorkers--;

      if (remainingWorkers === 0) {
        // Construct the path for the output file
        const outputPath = path.resolve(
          path.dirname(__filename),
          "transactions.json",
        );

        // Write the data to a file in the src/api directory
        writeFileSync(
          outputPath,
          JSON.stringify({ data: transactions }, null, 2),
        );
        console.log(
          "Fake data generated and saved to src/api/transactions.json",
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
  // Worker thread logic: Generate data
  const transactions = Array.from(
    { length: workerData.transactionsPerWorker },
    generateTransaction,
  );
  parentPort.postMessage({ transactions });
}
