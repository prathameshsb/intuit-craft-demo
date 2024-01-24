import React from "react";

const SummaryCard = ({ totalAmount, invoicesLast30Days }) => {
  const getColor = (amount) => {
    if (amount < 0) return "text-red-400";
    if (amount < 1000) return "text-yellow-400"; // Assuming 1000 as the threshold
    return "text-green-400";
  };

  return (
    <div className="bg-gray-800 text-gray-300 p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">Summary</h3>
      <p className={getColor(totalAmount)}>Total Amount: {totalAmount}</p>
      <p>Number of Invoices in the Last 30 Days: {invoicesLast30Days}</p>
    </div>
  );
};

export default SummaryCard;
