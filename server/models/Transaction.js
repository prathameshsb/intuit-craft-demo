import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  date: Date,
  description: String,
  referenceNumber: { type: String, unique: true },
  amount: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
