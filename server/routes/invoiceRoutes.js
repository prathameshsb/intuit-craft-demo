import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Add a new invoice
router.post("/", async (req, res) => {
  const invoice = new Invoice(req.body);

  try {
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export default router;
