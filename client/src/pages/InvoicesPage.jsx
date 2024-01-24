import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addInvoice } from "../actions/invoiceActions";
import { addTransaction } from "../actions/transactionActions";

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const { invoices, loading, error } = useSelector((state) => state.invoice);
  const transactions = useSelector((state) => state.transaction.transactions); // Get transactions from the state
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    amount: "",
    creationDate: new Date(),
    referenceNumber: `INV-${new Date()} - ${Math.floor(Math.random() * 10000)}`,
  });
  const [errors, setErrors] = useState({}); // State to keep track of validation errors

  const clients = useMemo(() => {
    const names = invoices.map((invoice) => invoice.clientName);
    return Array.from(new Set(names));
  }, [invoices]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
    // If the user is typing in a field that had an error, clear that error
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  }

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!newInvoice.clientName) {
      formIsValid = false;
      errors["clientName"] = "Client name is required";
    }

    if (newInvoice.amount <= 0) {
      formIsValid = false;
      errors["amount"] = "Amount should be greater than 0";
    }

    setErrors(errors);
    return formIsValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      console.error("Validation Error");
      return; // Stop the form from submitting
    }
    try {
      // Dispatch an action to add the invoice
      dispatch(addInvoice(newInvoice, transactions));
      // Check if the invoice is marked as PAID, then add a corresponding transaction
      if (newInvoice.status === "PAID") {
        // Create a corresponding transaction for the new invoice
        const newTransaction = {
          date: new Date(), // Use the current date for the transaction
          description: `Payment for Invoice ${newInvoice.referenceNumber}`,
          referenceNumber: newInvoice.referenceNumber,
          amount: newInvoice.amount,
        };

        // Dispatch an action to add the transaction
        dispatch(addTransaction(newTransaction));
      }
      // Reset form fields and generate a new reference number for the next invoice
      setNewInvoice({
        clientName: "", // Reset client name to empty
        amount: 0,
        referenceNumber: `INV-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}`,
      });
      setErrors({}); // Clear any previous errors
    } catch (error) {
      console.error("Error submitting the invoice:", error);
      // Handle error
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Invoices</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <select
            name="clientName"
            value={newInvoice.clientName}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              Please select a client
            </option>
            {clients.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.clientName && (
            <div style={{ color: "red" }}>{errors.clientName}</div>
          )}
          <input
            type="number"
            onChange={handleChange}
            name="amount"
            placeholder="Amount"
            required
          />
          {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
          <button type="submit">Add Invoice</button>
        </form>
      </div>
      <div>
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="bg-gray-800 text-gray-300 p-4 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">Invoice Details</h3>
            <p>Client Name: {invoice.clientName}</p>
            <p>Creation Date: {invoice.creationDate}</p>
            <p>Reference Number: {invoice.referenceNumber}</p>
            <p>Amount: {invoice.amount}</p>
            <p>
              Status:{" "}
              <span
                className={`font-bold ${
                  invoice.status === "PAID" ? "text-green-400" : "text-red-400"
                }`}
              >
                {invoice.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoicesPage;
