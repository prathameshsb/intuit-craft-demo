import React from "react";
import { useSelector } from "react-redux";

const DashboardPages = () => {
  const transactions = useSelector((state) => state.transaction.transactions);
  const invoices = useSelector((state) => state.invoice.invoices);

  const totalAmount = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const invoicesLast30Days = invoices.filter((invoice) => {
    const thirtyDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    return new Date(invoice.creationDate) >= thirtyDaysAgo;
  }).length;

  const getColor = (amount) => {
    if (amount < 0) return "red";
    if (amount < 1000) return "yellow"; // Assuming 1000 as the threshold
    return "green";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Summary</h2>
        <p style={{ color: getColor(totalAmount) }}>
          Total Amount: {totalAmount}
        </p>
        <p>Number of Invoices in the Last 30 Days: {invoicesLast30Days}</p>
      </div>
    </div>
  );
};

export default DashboardPages;
