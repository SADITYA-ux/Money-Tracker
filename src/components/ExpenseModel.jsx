import { useState, useEffect, useRef } from 'react';
import "../style/ExpenseModal.css";
import { CATEGORIES } from "../constants/categories";

export default function ExpenseModal({ onClose, addTransaction }) {

  /* ================================
     State Management
  ================================ */

  // Expense title / name
  const [text, setText] = useState('');

  // Amount entered by the user
  const [amount, setAmount] = useState('');

  // Selected expense category
  const [category, setCategory] = useState('food');

  // Default date = today (YYYY-MM-DD)
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Validation / error message
  const [error, setError] = useState('');

  // Reference to modal box (used for outside-click detection)
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
    if (!text || !amount || !category) {
      setError('Please fill in all fields');
      return;
    }

    // Expense amount is stored as NEGATIVE
    const newTransaction = {
      id: Date.now(),
      text,
      amount: -Math.abs(Number(amount)), // force negative value
      category,
      date,
      type: "expense"
    };

    addTransaction(newTransaction);
    onClose();
  };


  /* ================================
     Render
  ================================ */

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content expense-modal" ref={modalRef}>
        <h2>Add Expense</h2>

        {/* Error message */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          {/* Expense Name */}
          <input
            type="text"
            placeholder="Expense Name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
            required
          >
            <option value="" disabled>Select a Category</option>
            {CATEGORIES.EXPENSE.map((cat) => (
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
            <button type="submit">Add Expense</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
}
