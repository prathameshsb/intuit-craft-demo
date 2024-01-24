import Invoice from "../models/Invoice.js";

const invoices = [
  {
    clientName: "Client 1",
    creationDate: new Date(),
    referenceNumber: "I0001",
    amount: 2000.0,
    status: "NOT PAID",
  },
  {
    clientName: "Client 2",
    creationDate: new Date(),
    referenceNumber: "I0002",
    amount: 1500.0,
    status: "PAID",
  },
];

export const seedInvoices = async () => {
  const invoiceCount = await Invoice.countDocuments();

  if (invoiceCount === 0) {
    try {
      await Invoice.insertMany(invoices);
      console.log("Invoice data has been inserted!");
    } catch (error) {
      console.error("Error seeding invoice data:", error);
    }
  }
};
