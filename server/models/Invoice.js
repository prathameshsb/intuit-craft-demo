import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
  clientName: String,
  creationDate: Date,
  referenceNumber: { type: String, unique: true },
  amount: Number,
  status: { type: String, enum: ["PAID", "NOT PAID"], default: "NOT PAID" },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
