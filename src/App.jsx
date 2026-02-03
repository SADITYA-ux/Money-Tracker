import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Add date to existing transactions if missing
      return parsed.map(transaction => ({
        ...transaction,
        date: transaction.date || new Date().toISOString().split('T')[0]
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  // ADD THIS FUNCTION FOR EDITING
  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage 
              transactions={transactions} 
              addTransaction={addTransaction} 
              deleteTransaction={deleteTransaction}
              updateTransaction={updateTransaction} // PASS THIS
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}