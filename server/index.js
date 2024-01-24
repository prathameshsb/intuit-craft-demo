import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import transactionRoutes from "./routes/transactionRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import { seedInvoices } from "./seeders/seedInvoices.js";
import { seedTransactions } from "./seeders/seedTransactions.js";

const app = express();
app.use(cors());

/** Env Variables */
const PORT = 3000;
const mongoDBURL =
  "mongodb+srv://prathameshsbpb:DgJtg7QIvvuIysfO@intuit-craft-demo.ogykvta.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TEST TEST TEST");
});

// Use routes
app.use("/transactions", transactionRoutes);
app.use("/invoices", invoiceRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    seedTransactions(); // Seed transaction data
    seedInvoices(); // Seed invoice data
    app.listen(PORT, () =>
      console.log(`Example app listening at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("error connecting to MongoDB", err));
