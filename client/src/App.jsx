import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "./actions/transactionActions";
import { fetchInvoices } from "./actions/invoiceActions";
import { Routes, Route, Link } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import InvoicesPage from "./pages/InvoicesPage";
import DashboardPages from "./pages/DashboardPages"; // Ensure this is named correctly

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <div className="App">
      <nav className="bg-gray-800 p-3 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/invoices">Invoices</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPages />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
      </Routes>
    </div>
  );
};

export default App;
