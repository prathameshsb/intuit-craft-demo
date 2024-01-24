import Transaction from "../models/Transaction.js";

const transactions = [
  {
    date: new Date(),
    description: "Initial Transaction 1",
    referenceNumber: "I0001",
    amount: 1000.0,
  },
  {
    date: new Date(),
    description: "Initial Transaction 2",
    referenceNumber: "I0002",
    amount: 1500.0,
  },
  {
    date: new Date(),
    description: "Initial Transaction 3",
    referenceNumber: "I0003",
    amount: 3500.0,
  },
];

export const seedTransactions = async () => {
  const transactionCount = await Transaction.countDocuments();

  if (transactionCount === 0) {
    try {
      await Transaction.insertMany(transactions);
      console.log("Transaction data has been inserted!");
    } catch (error) {
      console.error("Error seeding transaction data:", error);
    }
  }
};
