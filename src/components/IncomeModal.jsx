import { useState } from 'react';
import "../style/ExpenseModal.css";

export default function IncomeModal({ onClose, addTransaction }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Income');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      setError('Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Math.abs(Number(amount)), // Always positive for income
      category: category || 'Income',
      type: 'income'
    };

    addTransaction(newTransaction);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Income</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Income Source (e.g., Salary, Freelance)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />

          <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="submit" className="income-btn">Add Income</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}