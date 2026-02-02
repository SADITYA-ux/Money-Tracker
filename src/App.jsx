import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
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
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}