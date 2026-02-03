import { useState, useEffect, useRef } from 'react';
import "../style/ExpenseModal.css";
import { CATEGORIES } from "../constants/categories";

export default function IncomeModal({ onClose, addTransaction }) {

  /* ================================
     State Management
  ================================ */

  // Income source (e.g., Salary, Freelance)
  const [text, setText] = useState('');

  // Amount entered by the user
  const [amount, setAmount] = useState('');

  // Selected income category
  const [category, setCategory] = useState('Income');

  // Default date = today (YYYY-MM-DD)
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Validation / error message
  const [error, setError] = useState('');

  // Reference to modal box (for outside click detection)
  const modalRef = useRef(null);


  /* ================================
     Side Effects
  ================================ */

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Cleanup listener when modal unmounts
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);


  /* ================================
     Event Handlers
  ================================ */

  // Close modal if user clicks outside modal-content
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!text || !amount) {
      setError('Please fill in all fields');
      return;
    }

    // Income amount is ALWAYS positive
    const newTransaction = {
      id: Date.now(),
      text,
      amount: Math.abs(Number(amount)),
      category: category || 'Income',
      date,
      type: 'income'
    };

    addTransaction(newTransaction);
    onClose();
  };


  /* ================================
     Render
  ================================ */

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content income-modal" ref={modalRef}>
        <h2>Add Income</h2>

        {/* Error message */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          {/* Income Source */}
          <input
            type="text"
            placeholder="Income Source (e.g., Salary, Freelance)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
            required
          >
            <option value="" disabled>Select a Category</option>
            {CATEGORIES.INCOME.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <div className="date-input-container">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-buttons">
            <button type="submit" className="income-btn">
              Add Income
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
