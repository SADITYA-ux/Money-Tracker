import { useState } from 'react';
import "../style/ExpenseModal.css";
import {CATEGORIES} from"../constants/categories";

export default function ExpenseModel({ onClose, addTransaction }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount || !category) {
      setError('Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: -Math.abs(Number(amount)),
      category
    };

    addTransaction(newTransaction);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Expense</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Expense Name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select 
            value = {category}
            onChange = {(e) => setCategory(e.target.value)}
            className = "category-select"
            required
          >
            <option value = "" disabled>Select a Category</option>
            {CATEGORIES.EXPENSE.map((cart) => (
              <option key = {cart.value} value = {cart.value}>{cart.label}</option>
            ))}
            </select>

          <div className="modal-buttons">
            <button type="submit">Add Expense</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
