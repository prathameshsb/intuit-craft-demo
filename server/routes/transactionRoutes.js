import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;

// add a transaction
router.post("/", async (req, res) => {
  const tran = new Transaction(req.body);
  try {
    const transaction = await tran.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
